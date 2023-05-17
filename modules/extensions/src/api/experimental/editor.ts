import { EditorPreferences } from "src/types";
import { extensionPort } from "src/util/comlink";

export async function getPreferences(): Promise<EditorPreferences> {
  return await extensionPort.experimental.editor.getPreferences();
}
