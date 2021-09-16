import React from "react";
import { Switch, Route } from "react-router-dom";

import TopPanel from "./Components/TopPanel";
import Root from "./Components/Root";

const App = () => {
  return (
    <div>
      <TopPanel />
      <Switch>
        <Route path="/">
          <Root />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
