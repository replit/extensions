import { ObjectAny } from "..";

export interface UserSocial {
  id: number;
  url?: string;
  type?: string;
}

export interface UserRole {
  id?: string;
  key?: string;
  name: string;
  tagline?: string;
}

export interface ReplTag {
  id: string;
  isOfficial?: boolean;
}

export interface ReplComment {
  __typename?: string;
  id: number;
  body: string;
  user?: User;
  timeCreated?: string;
  timeUpdated?: string;
  repl?: Repl;
  replies?: Array<ReplComment>;
  isHidden?: string;
}

export type PaginationConnection<T> = {
  items: Array<T>;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    nextCursor?: string;
    previousCursor?: string;
  }
}

export interface ReplDatabase {
  id?: string;
  keysCount?: number;
  jwt?: string;
  siteMB?: number;
}

export interface User {
  __typename?: string;
  id: number;
  username: string;
  bio?: string;
  image?: string;
  url?: string;
  socials?: Array<UserSocial>;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  fullName?: string;
  followerCount?: number;
  followCount?: number;
  roles?: Array<UserRole>;
}

export interface Team extends Omit<User, 'bio' | 'roles' | 'socials'> {
  description?: string;
}

export interface CurrentUser extends User {
  hasPrivacyRole?: boolean;
  isFirewallMode?: boolean;
  isVerified?: boolean;
}

export interface Repl {
  __typename?: string;
  id: string;
  url: string;
  title: string;
  description: string;
  timeCreated: string;
  slug: string;
  isPrivate?: boolean;
  likeCount?: number;
  publicForkCount?: number;
  runCount?: number;
  commentCount?: number;
  tags?: Array<ReplTag>;
  comments?: PaginationConnection<ReplComment>;
  database?: ReplDatabase;
  owner?: User | Team;
  multiplayers?: Array<User>;
}

export type GraphqlQueryResult<T> = {
  data: T;
  errors?: Array<ObjectAny & {
    name: string;
    message: string;
  }>;
  error?: ObjectAny & {
    message: string;
  };
  loading: boolean;
};