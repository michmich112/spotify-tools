import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthenticationState } from '../../app/components/auth/types';
import store from '../../app/store';

function Main() {
  const authed = (store.getState().authentication as AuthenticationState).authed

  if (authed) {
    return (<div>Authed with Spotify</div>);
  } else {
    return (<Redirect to="/auth" />);
  }

}

export default Main;

