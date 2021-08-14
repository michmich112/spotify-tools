import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { authenticate } from "../../app/components/auth/actions";
import { AuthenticationState, Tokens } from "../../app/components/auth/types";
import store from "../../app/store";
import { getAccessTokenFromCode } from "../../infrastructure/spotify/auth";

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

function SpotifyRedirect() {
  const dispatch = useDispatch();
  const query = useQuery() as any;
  const code = query.get('code');
  const [loading, setLoading] = useState(true);
  const authed = (store.getState().authentication as AuthenticationState).authed

  useEffect(() => {
    if (code) {
      setLoading(true);
      getAccessTokenFromCode(code)
        .then((data: Tokens) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // only run once when component is mounted

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
