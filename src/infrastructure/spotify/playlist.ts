import axios from "axios";
import { AuthenticationState } from "../../app/components/auth/types";
import { UserState } from "../../app/components/user/types";

export async function getPlaylist(auth: AuthenticationState, id: string): Promise<any> {
  const res = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: getAuthToken(auth)
    }
  });
  return res.data;
};

export async function getPlaylistTracks(auth: AuthenticationState, playlistId: string): Promise<string[]> {
  const playlist = await getPlaylist(auth, playlistId);
  const ids = playlist.tracks.items.map((i: any) => i.track.id);
  return ids
}

export async function getPlaylistUris(auth: AuthenticationState, playlistId: string): Promise<string[]> {
  const playlist = await getPlaylist(auth, playlistId);
  const uris = playlist.tracks.items.map((i: any) => i.track.uri);
  return uris
}

export async function createPlaylist(auth: AuthenticationState, userId: string, playlistInfo: { name: string, public?: boolean, description?: string }): Promise<string> {
  const res = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,
    playlistInfo,
    { headers: { Authorization: getAuthToken(auth), "Content-Type": "application/json" } }
  );
  return res.data.id;
}

export async function addTracksToPlaylist(auth: AuthenticationState, playlistId: string, uris: string[]): Promise<void> {
  await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    { uris },
    {
      headers: {
        Authorization: getAuthToken(auth),
        "Content-Type": "application/json",
      }
    })
}

export async function CopyPlaylist(auth: AuthenticationState, user: UserState, srcPlaylistId: string, destPlaylistName: string): Promise<void> {
  const trackUris = await getPlaylistUris(auth, srcPlaylistId);
  const userId = user.metadata.id;
  const newPlaylistId = await createPlaylist(auth, userId, { name: destPlaylistName });
  await addTracksToPlaylist(auth, newPlaylistId, trackUris);
}

function getAuthToken(auth: AuthenticationState): string {
  return `${auth.tokenType} ${auth.accessToken}`;
}



