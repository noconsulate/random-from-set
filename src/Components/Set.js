import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSet } from "../Data/supabaseClient";

const Set = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  useEffect(async () => {
    const data = await fetchSet(id);
    console.log(data);
    setItems(data);
  }, []);
  return (
    <>
      <p>id</p>
      <p>{id}</p>
      <p>set</p>
      <p>{items}</p>
      <Inputs />
    </>
  );
};

const Inputs = (props) => {
  const [single, setSingle] = useState("");
  const handleSingle = (event) => setSingle(event.target.value);

  const submitSingle = () => {
    alert("hi");
  };

  return (
    <>
      <label>
        Single input:
        <input type="text" value={single} onChange={handleSingle} />
        <button onClick={submitSingle}>submit</button>
      </label>
      <p>{single}</p>
    </>
  );
};

export default Set;
