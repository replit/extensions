import { EditorPreferences } from "../../types";
import { extensionPort } from "../../util/comlink";

export async function getPreferences(): Promise<EditorPreferences> {
  return await extensionPort.experimental.editor.getPreferences();
}
