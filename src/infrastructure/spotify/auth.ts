import querystring from 'querystring';
import axios from 'axios';
import { Tokens } from '../../app/components/auth/types';

//const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // client id for the spotify app
//const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET; // client secret for the spotify app
//const HOST = process.env.HOST; // current host url

const CLIENT_ID = "d6844e4af75d4d04bf79c16c45c19b1a";
const CLIENT_SECRET = "5a9c5f969eb84bfaa368d8a77ac7c50b";
const HOST = "https://bccb-2601-647-5e80-180-a09c-4600-963f-5ac7.ngrok.io";
const scopes = [ // scopes for spotify authentication token
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-private',
  'playlist-read-collaborative'
];

/**
 * Authentication persistance mocking
 */
type authentication = {
  access_token: string,
  token_type: string,
  created?: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
}

/**
 * get the redirect url for authentication 
 */
export function getAuthenticationUrl() {

  const params = {
    client_id: CLIENT_ID, //todo get this
    response_type: 'code',
    redirect_uri: `${HOST}/spotifycb`, // go through ngrok
    scope: scopes.join(' '),
  }

  const urlbase = 'https://accounts.spotify.com/authorize'
  return `${urlbase}?${querystring.stringify(params)}`
}

/**
 * Get the user's access token from the authentication code
 */
export async function getAccessTokenFromCode(code: string): Promise<Tokens> {
  const body = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    scope: scopes.join(' '),
    code,
    redirect_uri: `${HOST}/spotifycb`,
  }

  const encodedBody = querystring.stringify(body);

  try {
    const res = await axios.post('https://accounts.spotify.com/api/token', encodedBody, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    const data: authentication = res.data;
    console.debug('data', res.data);
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      tokenType: data.token_type || 'Bearer',
    };
  } catch (e) {
    console.error('Could not fetch access token');
    console.error(e);
    throw new Error('Could not fetch access token from Spotify');
  }
}
