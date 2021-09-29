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
  if (id) console.log(id);

  const [key, setKey] = useState(id);

  const handleKey = (event) => {
    setKey(event.target.value);
  };

  // NEW button
  const history = useHistory();

  const handleNew = async () => {
    const { data, error } = await supabase.from("instances").insert({});
    console.log(data, error);
    const id = data[0].id;

    history.push(`/${id}`);
    setKey(id);
  };
  useEffect(() => {
    setKey(id);
  }, []);

  return (
    <div className="topPanel">
      <div className="box">
        {/* <New /> */}
        <button onClick={() => handleNew()} className="">
          New
        </button>
      </div>
      <div className="box">
        <input
          type="text"
          value={key}
          onChange={handleKey}
          placeholder="Put ID here"
          className="id_input"
        ></input>
        <button>GO</button>
      </div>
    </div>
  );
};

// const New = () => {
//   const history = useHistory();

//   const handleNew = async () => {
//     const { data, error } = await supabase.from("instances").insert({});
//     console.log(data, error);
//     const id = data[0].id;

//     history.push(`/${id}`);
//     setKey(id);
//     console.log(history);
//   };

//   return (
//     <button onClick={() => handleNew()} className="left">
//       New
//     </button>
//   );
// };

export default TopPanel;
