import { User } from "../user/types"

export type AuthenticationState = {
  authed: boolean,
  accessToken: string,
  refreshToken: string,
  tokenType: string,
}

/**
 * Token information
 */
export type Tokens = {
  accessToken: string,
  refreshToken: string,
  tokenType: string,
}

