import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TopPanel from "./Components/TopPanel";
import Root from "./Components/Root";

const App = () => {
  return (
    <div>
      <TopPanel />
      <Router>
        <Switch>
          <Route path="/">
            <Root />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
