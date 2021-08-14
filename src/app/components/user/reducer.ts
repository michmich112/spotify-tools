import { AnyAction } from "redux";
import { User, UserActions, UserState } from "./types";

const initialState: UserState = {
  name: '',
  metadata: {
    id: '',
    uri: '',
    href: '',
  }
}

function userReducer(
  state = initialState,
  action: AnyAction): UserState {
  switch (action.type) {
    case UserActions.SetUser:
      const { displayName, id, uri, href } = action.user as User;
      return {
        name: displayName,
        metadata: {
          id,
          uri,
          href,
        }
      }
    case UserActions.UnsetUser:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;

