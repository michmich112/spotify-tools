import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Authentication from "./pages/auth/Authentication";
import SpotifyRedirect from "./pages/auth/SpotifyRedirect";
import Main from "./pages/main/Main";

function Router() {


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <Authentication />
        </Route>
        <Route path="/spotifycb">
          <SpotifyRedirect />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );

}

export default Router;

