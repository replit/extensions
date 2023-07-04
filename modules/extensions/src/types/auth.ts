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
