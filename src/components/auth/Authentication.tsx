import React from 'react';
import { getAuthenticationUrl } from './utils';
import {
  authenticate,
  isAuthed,
} from './authenticationSlice';
import { useAppSelector } from '../../app/hooks';
import { Redirect } from 'react-router-dom';

function Authentication() {
  const authed = useAppSelector(isAuthed);

  const spotifyRedirect = () => {
    const url = getAuthenticationUrl();
    /* eslint-disable no-restricted-globals */
    location.href = url;
  }


  if (authed) {
    // Todo Redirect to index page
    return <Redirect to="/" />
  } else {
    return (
      <button onClick={spotifyRedirect}>Link Spotify</button>
    );
  }
}

export default Authentication;

