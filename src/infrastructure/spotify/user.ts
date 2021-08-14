import axios from "axios";
import { User } from "../../app/components/user/types";

type spotifyUserImage = {
  height: number | null,
  url: string,
  width: number | null
}

/**
 * User type from spotify
 */
type spotifyUser = {
  display_name: string,
  external_urls: { [key: string]: string },
  followers: {
    href: string | null,
    total: number,
  },
  href: string,
  id: string,
  images: spotifyUserImage[],
  type: string,
  uri: string,
}

export async function getUser(accessToken: string, tokenType: string): Promise<User> {
  const res = await axios.get(`https://api.spotify.com/v1/me`, {
    headers: { Authorization: `${tokenType} ${accessToken}` }
  });
  const data = res.data as spotifyUser;
  console.debug("Auth res", res);
  return {
    displayName: data.display_name,
    id: data.id,
    uri: data.uri,
    href: data.href,
  }
}

