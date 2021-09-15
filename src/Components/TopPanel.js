import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Components/TopPanel.scss";

const TopPanel = () => {
  return (
    <div className="topPanel">
      <div className="box">
        <New />
      </div>
      <div className="box">
        {/* <h2>Randos</h2> */}
        <Link to="/">Randos</Link>
      </div>
      <div className="box">
        <h2>old</h2>
      </div>
    </div>
  );
};

const New = () => <button className="button left">New</button>;

export default TopPanel;
