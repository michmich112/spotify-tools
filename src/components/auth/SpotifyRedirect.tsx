import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import store from "../../app/store";
import { authenticate } from "./actions";
import { getAccessTokenFromCode } from "./utils";

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

function SpotifyRedirect() {
  const dispatch = useDispatch();
  const query = useQuery() as any;
  const code = query.get('code');
  const [loading, setLoading] = useState(true);
  const authed = store.getState().authentication.authed

  useEffect(() => {
    if (code) {
      setLoading(true);
      getAccessTokenFromCode(code)
        .then(data => {
          dispatch(authenticate(data.accessToken, data.refreshToken));
          setLoading(false);
        })
        .catch(e => {
          alert("Could not authenticate with spotify, please try again");
          console.error("Spotify authentication with code:", e);
        });
    } else {
      console.error(`Code not in params`);
    }
  }, [])

  if (loading) {
    return (
      <div>Authenticating with Spotify</div>
    );
  } else {
    if (authed) {
      console.log(`is authed ${authed}`);
      return <Redirect to="/" />
    } else {
      return <Redirect to="/auth" />
    }
  }

}

export default SpotifyRedirect;
