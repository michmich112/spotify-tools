import { RootState } from '../../app/store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  authToken?: string,
  refreshToken?: string,
  authed: boolean,
}

const initialState: AuthState = {
  authToken: undefined,
  refreshToken: undefined,
  authed: false,
}

/**
 * Authenticate with authToken and refreshToken
 */
function authenticateReducer(state: AuthState, action: PayloadAction<{ authToken: string, refreshToken: string }>) {
  const { authToken, refreshToken } = action.payload;
  return { ...state, authed: true, authToken, refreshToken }
}

/**
 * Remove the authentication
 */
function unAuthenticateReducer() {
  return { authed: false, refreshToken: undefined, authToken: undefined }
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticate: authenticateReducer,
    unAuthenticate: unAuthenticateReducer,
  }
});

export const { authenticate, unAuthenticate } = authSlice.actions;

export const selectAuthToken = (state: RootState) => state.authentication.authToken;

export const isAuthed = (state: RootState) => state.authentication.authed && !!state.authentication.authToken;

export default authSlice.reducer;
