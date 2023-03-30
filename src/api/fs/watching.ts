import { ChangeSet, ChangeSpec, Text } from "@codemirror/state";
import { extensionPort, proxy } from "src/util/comlink";
import { TextChange, WatchTextFileListeners } from "src/types";

/**
 * A helper to change a ChangeSet into a simpler serializable & human readable format
 */
function changeSetToSimpleTextChange(changes: ChangeSet): Array<TextChange> {
  const simpleChanges: Array<TextChange> = [];

  changes.iterChanges((fromA, toA, _fromB, _toB, text) => {
    const change: TextChange = { from: fromA };

    if (toA > fromA) {
      change.to = toA;
    }

    if (text.length) {
      change.insert = text.sliceString(0);
    }

    simpleChanges.push(change);
  });

  return simpleChanges;
}

/**
 * watches a file via comlink, notifies listeners about changes.
 * it handles synchronization between local and remote text states.
 * properly disposes resources when no longer needed.
 */
class TextFileWatcher {
  /*
   * TODO: what do we do with out of order messages, postMessage has no guarantees of order
   * TODO: we need versioning to guarantee correctness. Related to above, using async/await doesn't guarantee that our change got applied before the next incoming change and vice versa
   */
  private state: {
    localText: Text;
    remoteText: Text;
    unconfirmedChanges: Set<{ changes: ChangeSet }>;
    requestWriteChange: (changes: ChangeSpec) => Promise<void>;
  } | null;
  private isDisposed: boolean;
  public dispose: () => void;

  constructor(
    private path: string,
    private listeners: {
      onReady: () => void;
      onChange: NonNullable<WatchTextFileListeners["onChange"]>;
      onMoveOrDelete: NonNullable<WatchTextFileListeners["onMoveOrDelete"]>;
      onError: NonNullable<WatchTextFileListeners["onError"]>;
    }
  ) {
    this.state = null;
    this.isDisposed = false;
    this.dispose = () => {
      this.isDisposed = true;
    };

    if (!extensionPort) {
      throw new Error("Expected extensionPort");
    }

    extensionPort
      .watchTextFile(
        this.path,
        proxy({
          onReady: this.handleReady.bind(this) as any, // wrongly typed at extensionPort
          onChange: this.handleChange.bind(this),
          onMoveOrDelete: (event) => {
            listeners.onMoveOrDelete(event);
          },
          onError: (error) => {
            listeners.onError(error);
          },
        })
      )
      .then((portDispose) => {
        if (this.isDisposed) {
          portDispose();

          return;
        }

        this.dispose = () => {
          this.isDisposed = true;
          portDispose();
        };
      });
  }

  public writeChange(changes: ChangeSpec) {
    if (this.isDisposed) {
      throw new Error("Wrote change on a disposed TextFileWatcher");
    }

    if (!this.state) {
      throw new Error("Tried to write changes before ready");
    }

    const changeSet = ChangeSet.of(changes, this.state.localText.length);
    this.state.localText = changeSet.apply(this.state.localText);

    this.enqueueChangeSet(changeSet);
  }

  public getLatestContent() {
    if (this.isDisposed) {
      throw new Error("Cannot get content of a disposed TextFileWatcher");
    }

    if (!this.state) {
      throw new Error("Called getLatestContent on an unready TextFileWatcher");
    }

    return this.state.localText.sliceString(0);
  }

  public getIsReady() {
    if (this.isDisposed) {
      throw new Error("Cannot get isReady of a disposed TextFileWatcher");
    }

    return Boolean(this.state);
  }

  private async handleReady({
    writeChange,
    initialContent,
  }: {
    writeChange: (changes: ChangeSpec) => Promise<void>;
    initialContent: Promise<string>;
  }) {
    if (this.isDisposed) {
      return;
    }

    const content = Text.of((await initialContent).split("\n"));
    this.state = {
      requestWriteChange: writeChange,
      localText: content,
      remoteText: content,
      unconfirmedChanges: new Set(),
    };

    this.listeners.onReady();
  }

  private handleChange({ changes: changeSpec }: { changes: ChangeSpec }) {
    if (this.isDisposed) {
      return;
    }

    if (!this.state) {
      throw new Error("unexpected handleOnChange called before handleOnReady");
    }

    let changes = ChangeSet.of(changeSpec, this.state.remoteText.length);
    this.state.remoteText = changes.apply(this.state.remoteText);

    for (const unconfirmed of this.state.unconfirmedChanges) {
      const unconfirmedUpdated = unconfirmed.changes.map(changes);
      changes = changes.map(unconfirmed.changes, true);
      unconfirmed.changes = unconfirmedUpdated;
    }

    this.state.localText = changes.apply(this.state.localText);

    this.listeners.onChange({
      changes: changeSetToSimpleTextChange(changes),
      latestContent: this.getLatestContent(),
    });
  }

  private async enqueueChangeSet(changes: ChangeSet) {
    if (this.isDisposed) {
      throw new Error("Wrote change on a disposed TextFileWatcher");
    }

    if (!this.state) {
      throw new Error("Tried to write changes before ready");
    }

    // Store in a ref since the ChangeSet is immutable, and it will change when fastfowarded
    const ref = { changes };
    this.state.unconfirmedChanges.add(ref);
    await this.state.requestWriteChange(
      changeSetToSimpleTextChange(ref.changes)
    );

    this.state.unconfirmedChanges.delete(ref);
    this.state.remoteText = ref.changes.apply(this.state.remoteText);
  }
}

/**
 * A class that manages multiple `TextFileWatcher` instances
 * ensuring that there's only one watcher per file to make sure
 * we are handling synchronization properly, having multiple watchers
 * will cause issues with the `TextFileWatcher` implementation.
 * Notifies listeners when a file is ready or when there are changes.
 * Automatically disposes watchers when there are no more listeners.
 * This should be a singleton, but it's not enforced for testability.
 */
class FileWatcherManager {
  private files: Map<
    string,
    {
      listeners: Set<WatchTextFileListeners>;
      watcher: TextFileWatcher;
    }
  >;

  constructor() {
    this.files = new Map();
  }

  public watch(path: string, listeners: WatchTextFileListeners) {
    if (this.files.has(path)) {
      this.watchExisting(path, listeners);
    } else {
      this.watchNew(path, listeners);
    }

    return () => {
      const file = this.files.get(path);

      if (!file) {
        return;
      }

      file.listeners.delete(listeners);
      if (file.listeners.size === 0) {
        this.dispose(path);
      }
    };
  }

  private dispose(path: string) {
    const file = this.files.get(path);

    if (!file) {
      return;
    }

    file.watcher.dispose();
    this.files.delete(path);
  }

  private watchNew(path: string, listeners: WatchTextFileListeners) {
    const watcher = new TextFileWatcher(path, {
      onReady: () => {
        this.handleReady(path);
      },
      onChange: (changeEvent) => {
        this.handleChange(path, changeEvent);
      },
      onMoveOrDelete: (event) => {
        this.handleMoveOrDelete(path, event);
      },
      onError: (error) => {
        this.handleError(path, error);
      },
    });

    this.files.set(path, {
      listeners: new Set([listeners]),
      watcher,
    });
  }

  private watchExisting(path: string, listeners: WatchTextFileListeners) {
    const file = this.files.get(path);

    if (!file) {
      throw new Error("file is not watched");
    }

    file.listeners.add(listeners);
  }

  private handleChange(
    path: string,
    changeEvent: Parameters<NonNullable<WatchTextFileListeners["onChange"]>>[0]
  ) {
    const file = this.files.get(path);

    if (!file) {
      throw new Error("Unexpected change on a non-watched file");
    }

    if (!file.watcher.getIsReady()) {
      throw new Error("Unexpected change on a non-ready file");
    }

    for (const { onChange } of file.listeners) {
      if (!onChange) {
        continue;
      }

      onChange(changeEvent);
    }
  }

  private handleReady(path: string) {
    const file = this.files.get(path);

    if (!file) {
      throw new Error("Unexpected change on a non-watched file");
    }

    if (!file.watcher.getIsReady()) {
      throw new Error("Got ready on a non-ready file :/");
    }

    const initialContent = file.watcher.getLatestContent();
    for (const { onReady, onChange } of file.listeners) {
      onReady({
        initialContent,
        writeChange: (changes: TextChange | Array<TextChange>) => {
          file.watcher.writeChange(changes);

          for (const { onChange: otherOnChange } of file.listeners) {
            if (onChange === otherOnChange) {
              // we don't want to notify the originator, they already know about the change
              continue;
            }

            if (!otherOnChange) {
              continue;
            }

            otherOnChange({
              changes: Array.isArray(changes) ? changes : [changes],
              latestContent: file.watcher.getLatestContent(),
            });
          }
        },
      });
    }
  }

  private handleError(path: string, error: string) {
    const file = this.files.get(path);

    if (!file) {
      throw new Error("Unexpected error on a non-watched file");
    }

    for (const { onError } of file.listeners) {
      if (!onError) {
        continue;
      }

      onError(error);
    }

    this.dispose(path);
  }

  private handleMoveOrDelete(
    path: string,
    event: Parameters<NonNullable<WatchTextFileListeners["onMoveOrDelete"]>>[0]
  ) {
    const file = this.files.get(path);

    if (!file) {
      throw new Error("Unexpected move or delete event on a non-watched file");
    }

    for (const { onMoveOrDelete } of file.listeners) {
      if (!onMoveOrDelete) {
        continue;
      }

      onMoveOrDelete(event);
    }

    this.dispose(path);
  }
}

export const fileWatcherManager = new FileWatcherManager();
