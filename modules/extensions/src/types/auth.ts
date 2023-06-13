import { JWTVerifyResult, JWTHeaderParameters, JWTPayload } from "jose";

export type VerifyResult = Promise<JWTVerifyResult>;

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

export type { JWTVerifyResult, JWTHeaderParameters, JWTPayload };
