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
  onChange: (newContent: string) => void;
  onError: (error: string) => void;
  onMoveOrDelete: (args: {
    eventType: "MOVE" | "DELETE";
    node: FsNode;
  }) => void;
}

export interface WriteChangeArgs {
  from: number;
  to: number;
  insert: string;
}

export interface WatchTextFileWatchers {
  onReady: (readyArgs: {
    initialContent: string;
    version: number;
    writeChange: (writeChangeArgs: WriteChangeArgs) => Promise<void>;
  }) => void;
  onChange: (changeArgs: {
    latestContent: string;
    version: number;
    changeSource: string;
    changes: any; // TODO fix
  }) => void;
  onError: (error: string) => void;
  onMoveOrDelete: (args: {
    eventType: "MOVE" | "DELETE";
    node: FsNode;
  }) => void;
}

export interface DirectoryChildNode {
  filename: string;
  type: FsNodeType;
}

/*****************************************************************
 * * Theme Types
 *****************************************************************/

export interface ThemeValues {
  global: {
    backgroundRoot: string;
    backgroundDefault: string;
    backgroundHigher: string;
    backgroundHighest: string;
    backgroundOverlay: string;
    foregroundDefault: string;
    foregroundDimmer: string;
    foregroundDimmest: string;
    outlineDimmest: string;
    outlineDimmer: string;
    outlineDefault: string;
    outlineStronger: string;
    outlineStrongest: string;
    accentPrimaryDimmest: string;
    accentPrimaryDimmer: string;
    accentPrimaryDefault: string;
    accentPrimaryStronger: string;
    accentPrimaryStrongest: string;
    accentPositiveDimmest: string;
    accentPositiveDimmer: string;
    accentPositiveDefault: string;
    accentPositiveStronger: string;
    accentPositiveStrongest: string;
    accentNegativeDimmest: string;
    accentNegativeDimmer: string;
    accentNegativeDefault: string;
    accentNegativeStronger: string;
    accentNegativeStrongest: string;
    redDimmest: string;
    redDimmer: string;
    redDefault: string;
    redStronger: string;
    redStrongest: string;
    orangeDimmest: string;
    orangeDimmer: string;
    orangeDefault: string;
    orangeStronger: string;
    orangeStrongest: string;
    yellowDimmest: string;
    yellowDimmer: string;
    yellowDefault: string;
    yellowStronger: string;
    yellowStrongest: string;
    limeDimmest: string;
    limeDimmer: string;
    limeDefault: string;
    limeStronger: string;
    limeStrongest: string;
    greenDimmest: string;
    greenDimmer: string;
    greenDefault: string;
    greenStronger: string;
    greenStrongest: string;
    tealDimmest: string;
    tealDimmer: string;
    tealDefault: string;
    tealStronger: string;
    tealStrongest: string;
    blueDimmest: string;
    blueDimmer: string;
    blueDefault: string;
    blueStronger: string;
    blueStrongest: string;
    blurpleDimmest: string;
    blurpleDimmer: string;
    blurpleDefault: string;
    blurpleStronger: string;
    blurpleStrongest: string;
    purpleDimmest: string;
    purpleDimmer: string;
    purpleDefault: string;
    purpleStronger: string;
    purpleStrongest: string;
    magentaDimmest: string;
    magentaDimmer: string;
    magentaDefault: string;
    magentaStronger: string;
    magentaStrongest: string;
    pinkDimmest: string;
    pinkDimmer: string;
    pinkDefault: string;
    pinkStronger: string;
    pinkStrongest: string;
    greyDimmest: string;
    greyDimmer: string;
    greyDefault: string;
    greyStronger: string;
    greyStrongest: string;
    brownDimmest: string;
    brownDimmer: string;
    brownDefault: string;
    brownStronger: string;
    brownStrongest: string;
    black: string;
    white: string;
  };
  editor: {
    //   syntaxHighlighting: Array<SyntaxHighlightingSpec>;
    syntaxHighlighting: any;
  };
}

export enum ColorScheme {
  Light = "light",
  Dark = "dark",
}

export interface Theme {
  id: string;
  description: string;
  values: ThemeValues;
  colorScheme: ColorScheme;
  name: string;
  isOfficial: boolean;
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
 * * Miscalleneous / React Types
 *****************************************************************/

export enum HandshakeStatus {
  Ready = "ready",
  Error = "error",
  Loading = "loading",
}

export type StrError = { error: string };
export type NullableStrError = { error: string | null };
export type VoidPromise = Promise<void>;
export type VoidFunction = () => void;

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
  watchFile: (path: string, watcher: WatchFileWatchers) => VoidFunction;
  watchTextFile: (path: string, watcher: WatchTextFileWatchers) => VoidFunction;

  // replDb Module
  setReplDbValue: (key: string, value: string) => VoidPromise;
  getReplDbValue: (key: string) => NullableStrError;
  listReplDbKeys: (prefix: string) => Promise<{ keys: string[] } | StrError>;
  deleteReplDbKey: (key: string) => VoidPromise;

  activatePane: () => VoidPromise;

  // theme
  getCurrentTheme: () => Promise<Theme>;
  onThemeChange: (callback: (theme: Theme) => void) => Promise<() => void>;

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
};
