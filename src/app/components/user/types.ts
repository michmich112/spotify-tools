export enum UserActions {
  SetUser = "User/SetUser",
  UnsetUser = "User/UnsetUser",
}

export type User = {
  displayName: string,
  id: string,
  uri: string,
  href: string,
};

export type UserState = {
  name: string,
  metadata: {
    id: string,
    uri: string,
    href: string,
  }
};

