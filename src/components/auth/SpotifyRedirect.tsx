import React, { useEffect, useState } from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authenticate, isAuthed } from "./authenticationSlice";
import { getAccessTokenFromCode } from "./utils";

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

function SpotifyRedirect() {
  const dispatch = useAppDispatch();
  const query = useQuery() as any;
  const code = query.get('code');
  const [loading, setLoading] = useState(true);
  const authed = useAppSelector(isAuthed);


  useEffect(() => {
    if (code) {
      console.log(`code ${code}`);
      setLoading(true);
      getAccessTokenFromCode(code)
        .then(data => {
          dispatch(authenticate({ authToken: data, refreshToken: '' }));
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
      return <Redirect to="/" />
    } else {
      return <Redirect to="/auth" />
    }
  }

}

export default SpotifyRedirect;
