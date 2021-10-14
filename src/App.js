import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ServiceWorkerUpdateListener } from "./ServiceWorkerUpdateListener.js";

import TopPanel from "./Components/TopPanel";
import Root from "./Components/Root";
import Set from "./Components/Set";

const App = () => {
  const [updateWaiting, setUpdateWaiting] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      let listener = new ServiceWorkerUpdateListener();
      listener.onupdateinstalling = (installingEvent) => {
        console.log("SW installed", installingEvent);
      };
      listener.onupdatewaiting = (waitingEvent) => {
        console.log("new update waiting", waitingEvent);
        setUpdateWaiting(true);
      };
      navigator.serviceWorker
        .getRegistration()
        .then((reg) => listener.addRegistration(reg));

      return () => listener.removeEventListener();
    } else {
      //do nothing
    }
  }, []);

  return (
    <div className="topParent">
      <h1>fgf</h1>
      <TopPanel />
      <UpdateReady updateWaiting={updateWaiting} />
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

const UpdateReady = ({ updateWaiting }) => {
  if (updateWaiting) return <>no update</>;

  return (
    <>
      <h1>ready</h1>
    </>
  );
};

export default App;
