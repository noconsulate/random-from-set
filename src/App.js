import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ServiceWorkerUpdateListener } from "./ServiceWorkerUpdateListener.js";

import TopPanel from "./Components/TopPanel";
import Root from "./Components/Root";
import Set from "./Components/Set";

const App = () => {
  const [updateWaiting, setUpdateWaiting] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [swListener, setSwListener] = useState({});

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      let listener = new ServiceWorkerUpdateListener();
      setSwListener(listener);
      listener.onupdateinstalling = (installingEvent) => {
        console.log("SW installed", installingEvent);
      };
      listener.onupdatewaiting = (waitingEvent) => {
        console.log("new update waiting", waitingEvent);
        setUpdateWaiting(true);
      };
      navigator.serviceWorker.getRegistration().then((reg) => {
        listener.addRegistration(reg);
        setRegistration(reg);
      });

      return () => listener.removeEventListener();
    } else {
      //do nothing
    }
  }, []);

  const refreshApp = () => {
    console.log(registration, swListener);
    swListener.skipWaiting(registration.waiting);
    window.location.reload();
  };

  return (
    <div className="topParent">
      <h1>fgfsdsdsddddfdddddxx33fddd</h1>
      <TopPanel />
      <UpdateReady updateWaiting={updateWaiting} refreshApp={refreshApp} />
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

const UpdateReady = ({ updateWaiting, refreshApp }) => {
  console.log(updateWaiting);
  if (!updateWaiting)
    return (
      <div>
        <p>no update</p>
      </div>
    );

  return (
    <div className="updateReady">
      <h4>A ne w version of Randos is ready!</h4>
      <h4>
        <a onClick={refreshApp}>Click here</a> to install.
      </h4>
    </div>
  );
};

export default App;
