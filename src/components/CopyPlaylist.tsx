import { useState } from "react";
import AppSelectors from "../app/selectors";
import { CopyPlaylist as CopyPlaylistOperation } from "../infrastructure/spotify/playlist";

function CopyPlaylist() {
  const auth = AppSelectors.auth.getAuth();
  const user = AppSelectors.user.getUser();

  let [srcPlaylistId, setSrcPlaylistId] = useState("");
  let [destPlaylistName, setDestPlaylistName] = useState("");
  let [loading, setLoading] = useState(false);


  const copy = async () => {
    setLoading(true);
    await CopyPlaylistOperation(auth, user, srcPlaylistId, destPlaylistName);
    setSrcPlaylistId("");
    setDestPlaylistName("");
    setLoading(false);
  }

  if (loading) {
    return (<div>Loading...</div>);
  } else {
    return (
      <div>
        Source Playlist ID:
        <input onChange={(e) => setSrcPlaylistId(e.target.value)} />
      Destination Playlist Name:
        <input onChange={e => setDestPlaylistName(e.target.value)} />
        <button onClick={copy}>Copy Playlist</button>
      </div>
    )
  }
}

export default CopyPlaylist;

