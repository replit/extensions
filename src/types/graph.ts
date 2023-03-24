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
  roles?: UserRole;
}

export interface UserSocial {
  id: number;
  url: string;
  type: user_socialstypeEnumType;
}

export enum user_socialstypeEnumType {
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

// Response types

export type GraphResponse<T> = Promise<T | never>;

export type ReplQueryOutput = GraphResponse<{
  repl: Repl;
}>;

export type UserByUsernameQueryOutput = GraphResponse<{
  userByUsername: User;
}>;

export type UserQueryOutput = GraphResponse<{
  user: User;
}>;
