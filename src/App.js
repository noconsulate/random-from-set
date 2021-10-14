import React from "react";
import { Switch, Route } from "react-router-dom";
import { ServiceWorkerUpdateListener } from "./ServiceWorkerUpdateListener.js";

import TopPanel from "./Components/TopPanel";
import Root from "./Components/Root";
import Set from "./Components/Set";

const App = () => {
  const listener = new ServiceWorkerUpdateListener();
  listener.onupdateinstalling = (installingevent) => {
    console.log("SW installed");
  };
  listener.onupdatewaiting = (waitingevent) => {
    console.log("new update waiting");
  };

  navigator.serviceWorker
    .getRegistration()
    .then((reg) => listener.addRegistration(reg));

  return (
    <div className="topParent">
      <h1>fgf</h1>
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
