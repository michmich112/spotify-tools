import querystring from 'querystring';
import axios from 'axios';

//const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // client id for the spotify app
//const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET; // client secret for the spotify app
//const HOST = process.env.HOST; // current host url

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const HOST = "";
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
  access_token: undefined,
  token_type: undefined,
  created: undefined,
  expires_in: undefined,
  refresh_token: undefined,
  scope: undefined,
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
export async function getAccessTokenFromCode(code: string): Promise<string> {
  console.error(`calling get Access token from code`);
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
    console.debug('data', res.data);
    return res.data.access_token;
  } catch (e) {
    console.error('Could not fetch access token');
    console.error(e);
    throw new Error('Could not fetch access token from Spotify');
  }
}
