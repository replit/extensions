import * as jose from "jose";

export type VerifyResult = Promise<jose.JWTVerifyResult>;

export interface AuthenticatedInstallation {
  id: string;
  extensionId: string;
}

export interface AuthenticatedUser {
  id: number;
}

export interface AuthenticateResult {
  user: AuthenticatedUser;
  installation: AuthenticatedInstallation;
}
