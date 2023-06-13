import { JWTVerifyResult, JWTHeaderParameters, JWTPayload, JWK } from "jose";

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

export type { JWTVerifyResult, JWTHeaderParameters, JWTPayload, JWK };
