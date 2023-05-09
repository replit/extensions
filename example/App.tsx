import * as React from "react";
import {
  useReplit,
  useWatchTextFile,
  UseWatchTextFileStatus,
} from "@replit/extensions-react";
import { messages } from "@replit/extensions";
import "./App.css";

export default function App() {
  const { status, error, filePath } = useReplit();

  const connected: boolean = status === "ready";

  const {
    content,
    watchError,
    writeChange,
    status: watchStatus,
  } = useWatchTextFile({
    filePath: "example/test.json",
  });

  const sendMessage = () => {
    messages.showNotice("THIS IS A TEST");
  };

  const randomizeJson = async () => {
    try {
      const json = JSON.parse(content || "{}");

      const randomKey =
        Object.keys(json)[Math.floor(Math.random() * Object.keys(json).length)];

      json[randomKey] = Math.random();

      if (writeChange) {
        writeChange({
          from: 0,
          to: content?.length || 0,
          insert: JSON.stringify(json, null, 2),
        });
      }
    } catch (e) {
      console.error(e);
      await messages.showError("Error randomizing JSON");
    }
  };

  return (
    <main>
      <div className="center">
        <div>
          <div className="heading">Example extension</div>
          {error ? (
            <>
              <div className="error">error: {error.message ?? error}</div>
              {error.message === "timeout" ? (
                <div>
                  Note: Make sure to open this URL as an extension, not a
                  webview
                </div>
              ) : null}
            </>
          ) : (
            <div>
              {connected
                ? filePath
                  ? `connected to ${filePath}`
                  : "connected"
                : "connecting..."}
              <button onClick={sendMessage}>Click</button>
              <button onClick={randomizeJson}>Randomize JSON</button>
              <hr />
              {watchStatus === UseWatchTextFileStatus.Watching
                ? "watching"
                : "not watching " + watchError}{" "}
              | {filePath}
              <hr />
              <pre>{content}</pre>
            </div>
          )}
          <span>{status}</span>
        </div>
      </div>
    </main>
  );
}
