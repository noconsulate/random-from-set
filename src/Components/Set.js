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

  const RenderItems = () => {
    return (
      <p>
        {items.map((item, index) => {
          if (index < items.length - 1) {
            return <>{item}, </>;
          } else {
            return <>{item}</>;
          }
        })}
      </p>
    );
  };

  return (
    <>
      <p>id</p>
      <p>{id}</p>
      <p>set</p>

      <RenderItems />
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
