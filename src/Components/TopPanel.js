import React from "react";

import "../Styles/Components/TopPanel.scss";

const TopPanel = () => {
  return (
    <div className="topPanel">
      <New />
      <h2>Randos</h2>
      <h2>old</h2>
    </div>
  );
};

const New = () => <button className="button">New</button>;

export default TopPanel;
