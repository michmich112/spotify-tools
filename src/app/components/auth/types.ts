export type AuthenticationState = {
  authed: boolean,
  accessToken: string,
  refreshToken: string,
}

/**
 * Token information
 */
export type Tokens = {
  accessToken: string,
  refreshToken: string,
  tokenType: string,
}

