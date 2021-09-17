import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { matchPath } from "react-router";
import { supabase } from "../Data/supabaseClient";
import "../Styles/Components/TopPanel.scss";

const TopPanel = (props) => {
  const { pathname } = useLocation();
  const params = matchPath(pathname, { path: "/:id" });
  let id = "";
  if (params) id = params.params.id;

  const [key, setKey] = useState(id);
  const [placeholder, setPlaceholder] = useState("Enter key here");

  const handleKey = (event) => {
    setKey(event.target.value);
  };

  useEffect(() => {
    if (key !== "") {
      setPlaceholder(key);
    }
  }, []);
  return (
    <div className="topPanel">
      <div className="box">
        <New />
      </div>
      <div className="box">
        <input
          type="text"
          value={key}
          onChange={handleKey}
          placeholder={placeholder}
        />
      </div>
      <div className="box">
        <button>GO</button>
      </div>
    </div>
  );
};

const New = () => {
  const history = useHistory();

  const handleNew = async () => {
    const { data, error } = await supabase.from("instances").insert({});
    console.log(data, error);
    const id = data[0].id;

    history.push(`/${id}`);
    console.log(history);
  };

  return (
    <button onClick={() => handleNew()} className="button left">
      New
    </button>
  );
};

export default TopPanel;
