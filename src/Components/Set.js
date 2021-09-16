import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSet, updateSet } from "../Data/supabaseClient";

const Set = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  useEffect(async () => {
    const data = await fetchSet(id);
    console.log(data);
    setItems(data);
  }, []);

  const submitSingle = async (val) => {
    console.log("hi", val);

    const newItems = items.concat(Number(val));
    setItems(newItems);

    await updateSet(id, newItems);
  };

  return (
    <>
      <p>id</p>
      <p>{id}</p>
      <p>set</p>
      <p>{items}</p>
      <Inputs submitSingle={submitSingle} />
    </>
  );
};

const Inputs = (props) => {
  const [single, setSingle] = useState("34");
  const handleSingle = (event) => setSingle(event.target.value);

  console.log(props);
  const submitSingle = () => props.submitSingle(single);

  return (
    <>
      <label>
        Single input:
        <input type="text" value={single} onChange={handleSingle} />
        <button onClick={submitSingle}>submit</button>
      </label>
    </>
  );
};

export default Set;
