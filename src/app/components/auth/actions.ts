import { AnyAction } from "redux";

export enum AuthenticationActions {
  Authenticate = 'Authentication/Authenticate',
  UnAuthenticate = 'Authentication/UnAuthenticate',
}

export function authenticate(accessToken: string, refreshToken: string): AnyAction {
  return {
    type: AuthenticationActions.Authenticate,
    accessToken,
    refreshToken
  }
}

export function unauthenticate(): AnyAction {
  return {
    type: AuthenticationActions.UnAuthenticate
  }
}

