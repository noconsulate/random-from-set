import React from "react";
import { Switch, Route } from "react-router-dom";

import TopPanel from "./Components/TopPanel";
import Root from "./Components/Root";
import Set from "./Components/Set";

const App = () => {
  return (
    <div className="topParent">
      <TopPanel />
      <Switch>
        <Route exact path="/">
          <Root />
        </Route>
        <Route path="/:id">
          <Set />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
