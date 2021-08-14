import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { authenticate, unauthenticate } from "../../app/components/auth/actions";
import { AuthenticationState, Tokens } from "../../app/components/auth/types";
import { setUser } from "../../app/components/user/actions";
import { User } from "../../app/components/user/types";
import store from "../../app/store";
import { getAccessTokenFromCode } from "../../infrastructure/spotify/auth";
import { getUser } from "../../infrastructure/spotify/user";

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

function SpotifyRedirect() {
  const dispatch = useDispatch();
  const query = useQuery() as any;
  const code = query.get('code');
  const [loading, setLoading] = useState(true);
  const authed = (store.getState().authentication as AuthenticationState).authed

  const spotifyAuthentication = async () => {
    let tokens: Tokens;
    try {
      tokens = await getAccessTokenFromCode(code)
    } catch (e) {
      alert("Could not authenticate with spotify, please try again");
      console.error("Spotify authentication with code:", e);
      return;
    }
    dispatch(authenticate(tokens));
    let user: User;
    try {
      user = await getUser(tokens.accessToken, tokens.tokenType);
    } catch (e) {
      console.error("Could not get user with token");
      dispatch(unauthenticate());
      return;
    }
    dispatch(setUser(user));
  }

  useEffect(() => {
    if (code) {
      setLoading(true);
      spotifyAuthentication().then(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]) // only run once when component is mounted


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
