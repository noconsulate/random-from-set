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
    if (!items) {
      setItems([val]);
      await updateSet(id, [val]);
      return;
    }
    if (!val || items.includes(val)) return;

    const newItems = items.concat(val);
    setItems(newItems);

    await updateSet(id, newItems);
  };

  const submitRange = async (start, end) => {
    console.log(start, end);
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
      <Inputs submitSingle={submitSingle} submitRange={submitRange} />
    </>
  );
};

const Inputs = (props) => {
  const submitSingle = () => props.submitSingle(Number(single));
  const submitRange = () => props.submitRange(start, end);

  const [single, setSingle] = useState(34);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const handleSingle = (event) => setSingle(event.target.value);
  const handleStart = (event) => setStart(event.target.value);
  const handleEnd = (event) => setEnd(event.target.value);

  return (
    <>
      <div>
        <p>Single input:</p>
        <input type="number" value={single} onChange={handleSingle} />
        <button onClick={submitSingle}>submit</button>
      </div>
      <div>
        <p>Range input:</p>
        <p>From:</p>
        <input type="number" onChange={handleStart} />
        <p>Through:</p>
        <input type="number" onChange={handleEnd} />
        <button onClick={submitRange}>Submit</button>
      </div>
    </>
  );
};

export default Set;
