import React from "react";
import { Switch, Route } from "react-router-dom";

import TopPanel from "./Components/TopPanel";
import Root from "./Components/Root";
import Set from "./Components/Set";

const App = () => {
  return (
    <div>
      <TopPanel />
      <Switch>
        <Route exact path="/">
          <Root />
        </Route>
        <Route path="/set">
          <Set />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
