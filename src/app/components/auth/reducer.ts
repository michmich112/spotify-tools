import { AnyAction } from "redux";
import { AuthenticationActions } from "./actions";
import { AuthenticationState } from "./types";

const initialState: AuthenticationState = {
  authed: false,
  accessToken: '',
  refreshToken: '',
  tokenType: 'Bearer',
}

function authenticationReducer(
  state = initialState,
  action: AnyAction): AuthenticationState {
  switch (action.type) {
    case AuthenticationActions.Authenticate:
      return {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        tokenType: action.tokenType,
        authed: true,
      };
    case AuthenticationActions.UnAuthenticate:
      return initialState; // initial state is unauthenticated
    default:
      return state
  }
}

export default authenticationReducer;

