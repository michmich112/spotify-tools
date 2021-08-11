import React, { useEffect } from 'react';
import { getAuthenticationUrl } from './utils';
//import {
//  authenticate,
//  isAuthed,
// } from './authenticationSlice';
// import { useAppSelector } from '../../app/hooks';
import { Redirect } from 'react-router-dom';
import store from '../../app/store';

function Authentication() {
  //const authed = useAppSelector(isAuthed);
  const authentication = store.getState().authentication;
  const authed = store.getState().authentication.authed;


  const spotifyRedirect = () => {
    const url = getAuthenticationUrl();
    /* eslint-disable no-restricted-globals */
    location.href = url;
  }

  useEffect(() => {
    console.log('authentication', authentication);
    console.log(`authed ${authed}`);
  }, []);

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

