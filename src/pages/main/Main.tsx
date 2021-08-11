import React from 'react';
import { Redirect } from 'react-router-dom';
import store from '../../app/store';
import { AuthenticationState } from '../../components/auth/reducer';

function Main() {
  const authed = (store.getState().authentication as AuthenticationState).authed

  if (authed) {
    return (<div>Authed with Spotify</div>);
  } else {
    return (<Redirect to="/auth" />);
  }

}

export default Main;

