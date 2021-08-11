import React from 'react';
import { getAuthenticationUrl } from './utils';
import { Redirect } from 'react-router-dom';
import store from '../../app/store';

function Authentication() {
  const authed = store.getState().authentication.authed;

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

