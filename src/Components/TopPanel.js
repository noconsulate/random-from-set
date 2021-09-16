import React from "react";
import { Link, useHistory } from "react-router-dom";
import { supabase } from "../Data/supabaseClient";
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

const New = () => {
  const history = useHistory();

  const handleNew = async () => {
    const { data, error } = await supabase.from("instances").insert({});
    console.log(data, error);

    history.push("/set");
    console.log(history);
  };

  return (
    <button onClick={() => handleNew()} className="button left">
      New
    </button>
  );
};

export default TopPanel;
