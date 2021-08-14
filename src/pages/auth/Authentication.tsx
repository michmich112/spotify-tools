import React from 'react';
import { Redirect } from 'react-router-dom';
import store from '../../app/store';
import { AuthenticationState } from '../../app/components/auth/types';
import { getAuthenticationUrl } from '../../infrastructure/spotify/auth';

function Authentication() {
  const authed = (store.getState().authentication as AuthenticationState).authed;

  const spotifyRedirect = () => {
    const url = getAuthenticationUrl();
    /* eslint-disable no-restricted-globals */
    location.href = url;
  }

  if (authed) {
    return <Redirect to="/" />
  } else {
    return (
      <button onClick={spotifyRedirect}>Link Spotify</button>
    );
  }
}

export default Authentication;

