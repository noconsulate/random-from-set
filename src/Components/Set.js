import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSet, updateSet } from "../Data/supabaseClient";

const Set = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  useEffect(() => {
    const run = async () => {
      const data = await fetchSet(id);
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

    const newItems = items.concat(val).sort((a, b) => a - b);
    setItems(newItems);

    await updateSet(id, newItems);
  };

  const submitRange = async (start, end) => {
    let range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    let newItems = items.concat(range).sort((a, b) => a - b);
    setItems(newItems);
    await updateSet(id, newItems);
  };

  const deleteSingle = async (val) => {
    const filtered = items.filter((item) => item !== val);
    setItems(filtered);
    await updateSet(id, filtered);
  };

  const deleteRange = async (start, end) => {
    const filtered = items.filter((item) => {
      if (item >= start && item <= end) return false;
      else return true;
    });
    setItems(filtered);
    await updateSet(id, filtered);
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
      <RenderItems />
      <Inputs submitSingle={submitSingle} submitRange={submitRange} />
      <Delete deleteSingle={deleteSingle} deleteRange={deleteRange} />
    </>
  );
};

const Inputs = (props) => {
  const submitSingle = () => props.submitSingle(Number(single));
  const submitRange = () => props.submitRange(Number(start), Number(end));

  const [single, setSingle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSingle = (event) => setSingle(event.target.value);
  const handleStart = (event) => setStart(event.target.value);
  const handleEnd = (event) => setEnd(event.target.value);

  return (
    <>
      <div>
        <h3>Single Input</h3>
        <input type="number" value={single} onChange={handleSingle} />
        <button onClick={submitSingle}>submit</button>
      </div>
      <div>
        <h3>Range Input</h3>
        <p>From:</p>
        <input type="number" onChange={handleStart} />
        <p>Through:</p>
        <input type="number" onChange={handleEnd} />
        <button onClick={submitRange}>Submit</button>
      </div>
    </>
  );
};

const Delete = (props) => {
  const deleteSingle = () => props.deleteSingle(Number(single));
  const deleteRange = () => props.deleteRange(Number(start), Number(end));
  const [single, setSingle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSingle = (event) => setSingle(event.target.value);
  const handleStart = (event) => setStart(event.target.value);
  const handleEnd = (event) => setEnd(event.target.value);

  return (
    <>
      <div>
        <h3>Single Delete</h3>
        <input type="number" value={single} onChange={handleSingle} />
        <button onClick={deleteSingle}>Submit</button>
      </div>
      <div>
        <h3>Range Delete</h3>
        <p>From:</p>
        <input type="number" value={start} onChange={handleStart} />
        <p>Through:</p>
        <input type="number" value={end} onChange={handleEnd} />
        <button onClick={deleteRange}>Submit</button>
      </div>
    </>
  );
};

export default Set;
