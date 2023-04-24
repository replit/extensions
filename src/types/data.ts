/**
 * A Replit user
 */
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

  // PlanUserData fragment
  isUserHacker?: boolean;
  isUserPro?: boolean;

  // RolesUserData fragment
  roles?: Array<UserRole>;
}

/**
 * A user social media link
 */
export interface UserSocial {
  id: number;
  url: string;
  type: UserSocialType;
}

/**
 * An enumerated type of social media links
 */
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

/**
 * A user role
 */
export interface UserRole {
  id: number;
  name: string;
  key: string;
  tagline: string;
}

/**
 * A Repl
 */
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
  iconUrl?: string;
  imageUrl?: string;

  // CommentsReplData fragment
  comments?: {
    items?: Array<ReplComment>;
  };

  // OwnerData fragment
  owner?: Pick<User, "id" | "username" | "image"> & {
    __typename: string;
    description?: string;
  };

  // MultiplayersData fragment
  multiplayers?: Array<User>;
}

/**
 * A Repl tag
 */
export interface Tag {
  id: string;
  isOfficial: boolean;
}

/**
 * A Repl Comment
 */
export interface ReplComment {
  id: number;
  body: string;
  user: User;
}

/**
 * Options for user queries
 */
export interface UserDataInclusion {
  includeSocialData?: boolean;
  includeRoles?: boolean;
  includePlan?: boolean;
}

/**
 * Options for repl queries
 */
export interface ReplDataInclusion {
  includeSocialData?: boolean;
  includeComments?: boolean;
  includeOwner?: boolean;
  includeMultiplayers?: boolean;
}

/**
 * A graphql response
 */
export type GraphResponse<T> = Promise<T | never>;

/**
 * A graphql response for the repl query
 */
export type ReplQueryOutput = GraphResponse<{ repl: Repl }>;

/**
 * A graphql response for the userByUsername query
 */
export type UserByUsernameQueryOutput = GraphResponse<{ userByUsername: User }>;

/**
 * A graphql response for the user query
 */
export type UserQueryOutput = GraphResponse<{ user: User }>;
