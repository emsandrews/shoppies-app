import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import App from "./components/App";

class Main extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route strict path="/">
            <LandingPage />
          </Route>
          <Route strict path="/Shoppies">
            <App />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;
