import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Components/TopPanel.scss";

const TopPanel = (props) => {
  return (
    <div className="topPanel">
      <div className="box">
        <New />
      </div>
      <div className="box">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2>Randos</h2>
        </Link>
      </div>
      <div className="box">
        <h2>old</h2>
      </div>
    </div>
  );
};

const New = () => <button className="button left">New</button>;

export default TopPanel;
