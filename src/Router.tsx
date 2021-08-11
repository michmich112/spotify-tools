import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Authentication from "./components/auth/Authentication";
import SpotifyRedirect from "./components/auth/SpotifyRedirect";

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
          <div>  Main page </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );

}

export default Router;

