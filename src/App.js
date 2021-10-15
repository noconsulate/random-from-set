import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ServiceWorkerUpdateListener } from "./ServiceWorkerUpdateListener.js";

import TopPanel from "./Components/TopPanel";
import Root from "./Components/Root";
import Set from "./Components/Set";
import UpdateBanner from "./Components/UpdateBanner";

import "./Styles/index.scss";

const App = () => {
  const [updateWaiting, setUpdateWaiting] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [swListener, setSwListener] = useState({});

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      let listener = new ServiceWorkerUpdateListener();
      setSwListener(listener);
      listener.onupdateinstalling = (installingEvent) => {
        // console.log("SW installed", installingEvent);
      };
      listener.onupdatewaiting = (waitingEvent) => {
        // console.log("new update waiting", waitingEvent);
        setUpdateWaiting(true);
      };
      listener.onupdateready = (event) => {
        // console.log("updateready event");
        window.location.reload();
      };
      navigator.serviceWorker.getRegistration().then((reg) => {
        listener.addRegistration(reg);
        setRegistration(reg);
      });

      return () => listener.removeEventListener();
    } else {
      //do nothing because no sw in development
    }
  }, []);

  const refreshApp = () => {
    console.log(registration, swListener);
    swListener.skipWaiting(registration.waiting);
  };

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
      <Spacer />
      <UpdateBanner updateWaiting={updateWaiting} refreshApp={refreshApp} />
    </div>
  );
};

const Spacer = () => {
  return <div className="spacer">dd*</div>;
};

export default App;
