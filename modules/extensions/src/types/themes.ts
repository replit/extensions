import { User } from "./data";

/**
 * Alias for strings
 */
export type CssColor = string;

/**
 * Global theme values interface
 */
export interface ThemeValuesGlobal {
  __typename?: string;
  backgroundRoot: CssColor;
  backgroundDefault: CssColor;
  backgroundHigher: CssColor;
  backgroundHighest: CssColor;
  backgroundOverlay: CssColor;
  foregroundDefault: CssColor;
  foregroundDimmer: CssColor;
  foregroundDimmest: CssColor;
  outlineDimmest: CssColor;
  outlineDimmer: CssColor;
  outlineDefault: CssColor;
  outlineStronger: CssColor;
  outlineStrongest: CssColor;
  accentPrimaryDimmest: CssColor;
  accentPrimaryDimmer: CssColor;
  accentPrimaryDefault: CssColor;
  accentPrimaryStronger: CssColor;
  accentPrimaryStrongest: CssColor;
  accentPositiveDimmest: CssColor;
  accentPositiveDimmer: CssColor;
  accentPositiveDefault: CssColor;
  accentPositiveStronger: CssColor;
  accentPositiveStrongest: CssColor;
  accentNegativeDimmest: CssColor;
  accentNegativeDimmer: CssColor;
  accentNegativeDefault: CssColor;
  accentNegativeStronger: CssColor;
  accentNegativeStrongest: CssColor;
  redDimmest: CssColor;
  redDimmer: CssColor;
  redDefault: CssColor;
  redStronger: CssColor;
  redStrongest: CssColor;
  orangeDimmest: CssColor;
  orangeDimmer: CssColor;
  orangeDefault: CssColor;
  orangeStronger: CssColor;
  orangeStrongest: CssColor;
  yellowDimmest: CssColor;
  yellowDimmer: CssColor;
  yellowDefault: CssColor;
  yellowStronger: CssColor;
  yellowStrongest: CssColor;
  limeDimmest: CssColor;
  limeDimmer: CssColor;
  limeDefault: CssColor;
  limeStronger: CssColor;
  limeStrongest: CssColor;
  greenDimmest: CssColor;
  greenDimmer: CssColor;
  greenDefault: CssColor;
  greenStronger: CssColor;
  greenStrongest: CssColor;
  tealDimmest: CssColor;
  tealDimmer: CssColor;
  tealDefault: CssColor;
  tealStronger: CssColor;
  tealStrongest: CssColor;
  blueDimmest: CssColor;
  blueDimmer: CssColor;
  blueDefault: CssColor;
  blueStronger: CssColor;
  blueStrongest: CssColor;
  blurpleDimmest: CssColor;
  blurpleDimmer: CssColor;
  blurpleDefault: CssColor;
  blurpleStronger: CssColor;
  blurpleStrongest: CssColor;
  purpleDimmest: CssColor;
  purpleDimmer: CssColor;
  purpleDefault: CssColor;
  purpleStronger: CssColor;
  purpleStrongest: CssColor;
  magentaDimmest: CssColor;
  magentaDimmer: CssColor;
  magentaDefault: CssColor;
  magentaStronger: CssColor;
  magentaStrongest: CssColor;
  pinkDimmest: CssColor;
  pinkDimmer: CssColor;
  pinkDefault: CssColor;
  pinkStronger: CssColor;
  pinkStrongest: CssColor;
  greyDimmest: CssColor;
  greyDimmer: CssColor;
  greyDefault: CssColor;
  greyStronger: CssColor;
  greyStrongest: CssColor;
  brownDimmest: CssColor;
  brownDimmer: CssColor;
  brownDefault: CssColor;
  brownStronger: CssColor;
  brownStrongest: CssColor;
  black: CssColor;
  white: CssColor;
}

/**
 * Enumerated Color Scheme
 */
export enum ColorScheme {
  Light = "light",
  Dark = "dark",
}

/**
 * Custom Theme GraphQL type
 */
export interface CustomTheme {
  author: User;
  colorScheme: ColorScheme;
  hasUnpublishedChanges: boolean;
  id: number;
  isCurrentUserThemeAuthor: boolean;
  isInstalledByCurrentUser: boolean;
  latestThemeVersion: ThemeVersion;
  numInstalls?: number;
  slug?: string;
  status?: "public" | "private";
  title?: string;
}

/**
 * Theme Syntax Highlighting Tag
 */
export interface ThemeSyntaxHighlightingTag {
  __typename: string;
  name: string;
  modifiers: null | Array<string>;
}

/**
 * Theme Syntax Highlighting Modifier
 */
export interface ThemeSyntaxHighlightingModifier {
  textDecoration?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  color?: string;
}

/**
 * Theme Editor Syntax Highlighting
 */
export interface ThemeEditorSyntaxHighlighting {
  __typename: string;
  tags: Array<ThemeSyntaxHighlightingTag>;
  values: ThemeSyntaxHighlightingModifier;
}

/**
 * Editor Theme Values, an array of ThemeEditorSyntaxHighlighting
 */
export interface ThemeValuesEditor {
  syntaxHighlighting: Array<ThemeEditorSyntaxHighlighting>;
}

/**
 * Both global and editor theme values
 */
export interface ThemeValues {
  __typename?: string;
  editor: ThemeValuesEditor;
  global: ThemeValuesGlobal;
}

/**
 * Theme Version GraphQL type
 */
export interface ThemeVersion {
  __typename?: string;
  id: number;
  hue: number;
  lightness: number;
  saturation: number;
  timeUpdated?: string;
  description?: string;
  customTheme?: CustomTheme;
  values?: ThemeValues;
}

/**
 * Fires with the new theme values when the current theme changes
 */
export type OnThemeChangeValuesListener = (values: ThemeValuesGlobal) => void;

/**
 * Fires with the new theme data when the current theme changes
 */
export type OnThemeChangeListener = (theme: ThemeVersion) => void;
