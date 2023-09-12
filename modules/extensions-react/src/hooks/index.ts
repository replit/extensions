import useThemeValues from "./useThemeValues";
import useReplitEffect from "./useReplitEffect";
import useActiveFile from "./useActiveFile";
import useTheme from "./useTheme";
import useIsExtension from "./useIsExtension";
import useSetThemeCssVariables from "./useSetThemeCssVariables";

export * from "./useReplit";
export * from "./useWatchTextFile";

export {
  // General purpose hooks
  useReplitEffect,
  useActiveFile,
  useIsExtension,
  // Theme hooks
  useThemeValues,
  useSetThemeCssVariables,
  useTheme,
};
