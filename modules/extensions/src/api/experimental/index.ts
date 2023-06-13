export * as auth from "./auth";
export * as editor from "./editor";
import * as jose from "jose";

export type VerifyResult = Promise<jose.JWTVerifyResult>;
export type AuthenticateResult = Promise<{
  user: {
    id: number;
  };
  installation: {
    id: string;
    extensionId: string;
  };
}>;
