import store from "../../store";
import { UserState } from "./types";

export function getUser(): UserState {
  return store.getState().user as UserState;
}

export function getUserName(): string {
  return (store.getState().user as UserState).name;
}

