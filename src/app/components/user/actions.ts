import { AnyAction } from "redux";
import { User, UserActions } from "./types";

export function setUser(user: User): AnyAction {
  return {
    type: UserActions.SetUser,
    user,
  }
}

export function unsetUser(): AnyAction {
  return {
    type: UserActions.UnsetUser
  }
}

