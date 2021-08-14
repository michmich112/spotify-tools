import { AnyAction } from "redux";
import { Tokens } from "./types";

export enum AuthenticationActions {
  Authenticate = 'Authentication/Authenticate',
  UnAuthenticate = 'Authentication/UnAuthenticate',
}

export function authenticate(tokens: Tokens): AnyAction {
  return {
    type: AuthenticationActions.Authenticate,
    ...tokens
  }
}

export function unauthenticate(): AnyAction {
  return {
    type: AuthenticationActions.UnAuthenticate
  }
}

