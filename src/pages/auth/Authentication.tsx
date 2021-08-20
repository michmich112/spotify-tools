import React from 'react';
import { Redirect } from 'react-router-dom';
import { getAuthenticationUrl } from '../../infrastructure/spotify/auth';
import AppSelectors from '../../app/selectors';

function Authentication() {
  const authed = AppSelectors.auth.isAuthed();

  const spotifyRedirect = () => {
    const url = getAuthenticationUrl();
    /* eslint-disable no-restricted-globals */
    location.href = url;
  }

  if (authed) {
    return <Redirect to="/" />
  } else {
    return (
      <div>
        <button onClick={spotifyRedirect}>Link Spotify</button>
      </div>
    );
  }
}

export default Authentication;

