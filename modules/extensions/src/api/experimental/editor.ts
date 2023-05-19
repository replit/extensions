import { EditorPreferences } from "../../types";
import { extensionPort } from "../../util/comlink";

/**
 * Returns the current user's editor preferences.
 */
export async function getPreferences(): Promise<EditorPreferences> {
  return await extensionPort.experimental.editor.getPreferences();
}
