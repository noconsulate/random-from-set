import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSet, updateSet } from "../Data/supabaseClient";

const Set = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  useEffect(() => {
    const run = async () => {
      const data = await fetchSet(id);
      console.log(data);
      setItems(data);
    };

    run();
  }, [id]);

  const submitSingle = async (val) => {
    if (items.includes(Number(val))) return;

    const newItems = items.concat(Number(val));
    setItems(newItems);

    await updateSet(id, newItems);
  };

  const RenderItems = () => {
    if (!items) return <p>no items</p>;
    return (
      <p>
        {items.map((item, index) => {
          if (index < items.length - 1) {
            return <React.Fragment key={index}>{item}, </React.Fragment>;
          } else {
            return <React.Fragment key={index}>{item}</React.Fragment>;
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
