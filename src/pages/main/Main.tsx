import React from 'react';
import { Redirect } from 'react-router-dom';
import AppSelectors from '../../app/selectors';
import CopyPlaylist from '../../components/CopyPlaylist';

function Main() {
  const authed = AppSelectors.auth.isAuthed();
  const userName = AppSelectors.user.getUserName();

  if (authed) {
    return (
      <div>
        Welcome {userName};
        <CopyPlaylist />
      </div>);
  } else {
    return (<Redirect to="/auth" />);
  }

}

export default Main;

