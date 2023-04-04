/*****************************************************************
 * * FS (Filesystem) Types
 *****************************************************************/

/**
 * A Filesystem node type
 */
export enum FsNodeType {
  File = "FILE",
  Directory = "DIRECTORY",
}

/**
 * A base interface for nodes, just includes
 * the type of the node and the path, This interface
 * does not expose the node's content/children
 */
export interface FsNode {
  path: string;
  type: FsNodeType;
}

export interface WatchFileWatchers {
  onChange: WatchFileWatcherOnChange;
  onError: WatchFileWatcherOnError;
  onMoveOrDelete: WatchFileWatcherOnMoveOrDelete;
}

export interface WriteChangeArgs {
  from: number;
  to: number;
  insert: string;
}

export interface WatchTextFileWatchers {
  onReady: WatchTextFileWatcherOnReady;
  onChange: WatchTextFileWatcherOnChange;
  onError: WatchTextFileWatcherOnError;
  onMoveOrDelete: WatchTextFileWatcherOnMoveOrDelete;
}

export interface DirectoryChildNode {
  filename: string;
  type: FsNodeType;
}

/*****************************************************************
 * * Theme Types
 *****************************************************************/
export type CssColor = string;

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

export enum ColorScheme {
  Light = "light",
  Dark = "dark",
}

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

export interface ThemeSyntaxHighlightingTag {
  __typename: string;
  name: string;
  modifiers: null | Array<string>;
}

export interface ThemeSyntaxHighlightingModifier {
  textDecoration?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  color?: string;
}

export interface ThemeEditorSyntaxHighlighting {
  __typename: string;
  tags: Array<ThemeSyntaxHighlightingTag>;
  values: ThemeSyntaxHighlightingModifier;
}

export interface ThemeValuesEditor {
  editor: Array<ThemeEditorSyntaxHighlighting>;
}

export interface ThemeValues {
  __typename?: string;
  editor: ThemeValuesEditor;
  global: ThemeValuesGlobal;
}

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

/*****************************************************************
 * * Data Input/Output Types
 *****************************************************************/

export interface UserDataInclusion {
  includeSocialData?: boolean;
  includeRoles?: boolean;
}

export interface ReplDataInclusion {
  includeSocialData?: boolean;
  includeComments?: boolean;
  includeOwner?: boolean;
  includeMultiplayers?: boolean;
}

export type GraphResponse<T> = Promise<T | never>;

export type ReplQueryOutput = GraphResponse<{ repl: Repl }>;
export type UserByUsernameQueryOutput = GraphResponse<{ userByUsername: User }>;
export type UserQueryOutput = GraphResponse<{ user: User }>;

/*****************************************************************
 * * GraphQL Types
 *****************************************************************/

// User
export interface User {
  id: number;
  username: string;
  image: string;
  bio?: string;

  // SocialUserData fragment
  url?: string;
  socials?: Array<UserSocial>;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  fullName?: string;
  followCount?: number;
  followerCount?: number;

  // RolesUserData fragment
  roles?: Array<UserRole>;
}

export interface UserSocial {
  id: number;
  url: string;
  type: UserSocialType;
}
export enum UserSocialType {
  twitter = "twitter",
  github = "github",
  linkedin = "linkedin",
  website = "website",
  youtube = "youtube",
  twitch = "twitch",
  facebook = "facebook",
  discord = "discord",
}
export interface UserRole {
  id: number;
  name: string;
  key: string;
  tagline: string;
}

// Repl
export interface Repl {
  id: string;
  url: string;
  title: string;
  description: string;
  timeCreated: string;
  slug: string;
  isPrivate: boolean;

  // SocialReplData fragment
  likeCount?: number;
  publicForkCount?: number;
  runCount?: number;
  commentCount?: number;
  tags?: Array<Tag>;

  // CommentsReplData fragment
  comments?: {
    items?: Array<ReplComment>;
  };

  // OwnerData fragment
  owner?: {
    __typename: string;
    id: number;
    username: string;
    image: string;
    bio?: string;
    description?: string;
  };

  // MultiplayersData fragment
  multiplayers?: Array<User>;
}

export interface Tag {
  id: string;
  isOfficial: boolean;
}
export interface ReplComment {
  id: number;
  body: string;
  user: User;
}

/*****************************************************************
 * * Miscalleneous / React Types / Function Args
 *****************************************************************/

export enum HandshakeStatus {
  Ready = "ready",
  Error = "error",
  Loading = "loading",
}

export interface StrError {
  error: string;
}
export interface NullableStrError {
  error: string | null;
}

export interface TextFileWatcherReadyArgs {
  initialContent: string;
  version: number;
  writeChange: (writeChangeArgs: WriteChangeArgs) => Promise<void>;
}
export interface TextFileWatcherOnChangeArgs {
  latestContent: string;
  version: number;
  changeSource: string;
  changes: any; // TODO fix
}
export interface OnMoveOrDeleteArgs {
  eventType: "MOVE" | "DELETE";
  node: FsNode;
}
export type OnActiveFileChangeCallback = (file: string) => void;
export type WatchFileWatcherOnChange = (newContent: string) => void;
export type WatchFileWatcherOnError = (error: string) => void;
export type WatchFileWatcherOnMoveOrDelete = (args: OnMoveOrDeleteArgs) => void;
export type WatchTextFileWatcherOnReady = (
  readyArgs: TextFileWatcherReadyArgs
) => void;
export type WatchTextFileWatcherOnChange = (
  changeArgs: TextFileWatcherOnChangeArgs
) => void;
export type WatchTextFileWatcherOnError = (error: string) => void;
export type WatchTextFileWatcherOnMoveOrDelete = (
  args: OnMoveOrDeleteArgs
) => void;
export type HandshakeOuput = Promise<null | (() => void)>;
export type OnThemeChangeValuesCallback = (values: ThemeValuesGlobal) => void;
export type OnThemeChangeCallback = (theme: ThemeVersion) => void;

/*****************************************************************
 * * Session
 *****************************************************************/

interface SelectionRange {
  from: number;
  to: number;
}

interface EditorSelection {
  ranges: readonly SelectionRange[];
  mainIndex: number;
}

/*****************************************************************
 * * Extension Port Wrapper
 *****************************************************************/

export type ExtensionPortAPI = {
  handshake: () => void;

  // fs Module
  readFile: (
    path: string,
    encoding: "utf8" | "binary" | null
  ) => Promise<{ content: string } | StrError>;
  writeFile: (
    path: string,
    content: string | Blob
  ) => Promise<{ success: boolean } | StrError>;
  readDir: (path: string) => Promise<{
    children: Array<DirectoryChildNode>;
    error: string;
  }>;
  createDir: (path: string) => Promise<{} | StrError>;
  deleteFile: (path: string) => Promise<{} | StrError>;
  deleteDir: (path: string) => Promise<{} | StrError>;
  move: (path: string, to: string) => Promise<NullableStrError>;
  copyFile: (path: string, to: string) => Promise<NullableStrError>;
  watchFile: (path: string, watcher: WatchFileWatchers) => () => void;
  watchTextFile: (path: string, watcher: WatchTextFileWatchers) => () => void;

  // replDb Module
  setReplDbValue: (key: string, value: string) => Promise<void>;
  getReplDbValue: (key: string) => NullableStrError;
  listReplDbKeys: (prefix: string) => Promise<{ keys: string[] } | StrError>;
  deleteReplDbKey: (key: string) => Promise<void>;

  activatePane: () => Promise<void>;

  // theme
  getCurrentThemeValues: () => Promise<ThemeValuesGlobal>;
  onThemeChangeValues: (
    callback: OnThemeChangeValuesCallback
  ) => Promise<() => void>;
  getCurrentTheme: () => Promise<ThemeVersion>;
  onThemeChange: (
    callback: (theme: ThemeVersion) => void
  ) => Promise<() => void>;

  filePath: string;

  // messages Module
  showConfirm: (text: string, length?: number) => string;
  showError: (text: string, length?: number) => string;
  showNotice: (text: string, length?: number) => string;
  showWarning: (text: string, length?: number) => string;
  hideMessage: (id: string) => void;
  hideAllMessages: () => void;

  // data Module
  currentUser: (args: UserDataInclusion) => UserQueryOutput;
  userById: (args: { id: string } & UserDataInclusion) => UserQueryOutput;
  userByUsername: (
    args: { username: string } & UserDataInclusion
  ) => UserByUsernameQueryOutput;
  currentRepl: (args: ReplDataInclusion) => ReplQueryOutput;
  replById: (args: { id: string } & ReplDataInclusion) => ReplQueryOutput;
  replByUrl: (args: { url: string } & ReplDataInclusion) => ReplQueryOutput;

  // session Module
  watchActiveFile: (callback: (path: string) => void) => () => void;
  getActiveFile: () => Promise<string | null>;
  onSelectionChange: (s: (s: EditorSelection) => void) => () => void;
  getSelection: () => EditorSelection | null;
};
