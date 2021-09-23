import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSet, updateSet } from "../Data/supabaseClient";

import "../Styles/Components/Set.scss";

const Set = () => {
  const { id } = useParams();
  // console.log(id);
  const [items, setItems] = useState([]);
  const [rand, setRand] = useState(null);

  useEffect(() => {
    const run = async () => {
      const data = await fetchSet(id);
      setItems(data);
    };

    run();
  }, [id]);

  const submitSingle = async (val) => {
    if (!val) return;

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
    if (!start || !end) return;

    let range = [];
    for (let i = start; i <= end; i++) {
      if (!items.includes(i)) range.push(i);
    }

    if (!items) {
      setItems(range);
      await updateSet(id, range);
      return;
    }

    let newItems = items.concat(range).sort((a, b) => a - b);
    setItems(newItems);
    await updateSet(id, newItems);
  };

  const deleteSingle = async (val) => {
    if (!val || !items) return;

    const filtered = items.filter((item) => item !== val);
    setItems(filtered);
    await updateSet(id, filtered);
  };

  const deleteRange = async (start, end) => {
    if (!items || !start || !end) return;

    const filtered = items.filter((item) => {
      if (item >= start && item <= end) return false;
      else return true;
    });
    setItems(filtered);
    await updateSet(id, filtered);
  };

  const selectRandom = () => {
    const seed = Math.random();
    const res = Math.floor(seed * items.length);
    setRand(res);
  };

  const DisplayRandom = () => {
    if (items) {
      return <>{items[rand]}</>;
    } else {
      return <></>;
    }
  };

  const RenderItems = () => {
    if (!items)
      return (
        <div className="renderItems section">
          <p>no items</p>
        </div>
      );
    return (
      <div className="renderItems section ">
        <p>
          {items.map((item, index) => {
            if (index < items.length - 1) {
              return <React.Fragment key={index}>{item}, </React.Fragment>;
            } else {
              return <React.Fragment key={index}>{item}</React.Fragment>;
            }
          })}
        </p>
      </div>
    );
  };

  return (
    <div className="set">
      <RenderItems />
      <div className="container">
        <Inputs submitSingle={submitSingle} submitRange={submitRange} />
        <Delete deleteSingle={deleteSingle} deleteRange={deleteRange} />
      </div>
      <Random selectRandom={selectRandom} Rand={DisplayRandom} />
    </div>
  );
};

const Inputs = (props) => {
  const submitSingle = () => {
    props.submitSingle(Number(single));
    setSingle("");
  };
  const submitRange = () => {
    props.submitRange(Number(start), Number(end));
    setStart("");
    setEnd("");
  };

  const [single, setSingle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSingle = (event) => setSingle(event.target.value);
  const handleStart = (event) => setStart(event.target.value);
  const handleEnd = (event) => setEnd(event.target.value);

  return (
    <>
      <div className="child title">
        <h2>Insert</h2>
      </div>
      <div className="child sub-grid">
        <h3 className="row">Single</h3>
        <h4 className="row" style={{ visibility: "hidden" }}>
          BLANK
        </h4>
        <input
          className="row"
          type="number"
          value={single}
          onChange={handleSingle}
        />
        <button onClick={submitSingle}>Submit</button>
      </div>
      <div className="child sub-grid">
        <h3 className="row">Range</h3>
        <h4>From</h4>
        <h4>Through</h4>
        <input type="number" value={start} onChange={handleStart} />
        <input type="number" value={end} onChange={handleEnd} />
        <button onClick={submitRange}>Submit</button>
      </div>
    </>
  );
};

const Delete = (props) => {
  const deleteSingle = () => {
    props.deleteSingle(Number(single));
    setSingle("");
  };
  const deleteRange = () => {
    props.deleteRange(Number(start), Number(end));
    setStart("");
    setEnd("");
  };
  const [single, setSingle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSingle = (event) => setSingle(event.target.value);
  const handleStart = (event) => setStart(event.target.value);
  const handleEnd = (event) => setEnd(event.target.value);

  return (
    <>
      <div className="child title">
        <h2>Delete</h2>
      </div>
      <div className="child sub-grid">
        <h3 className="row">Single</h3>
        <h4 className="row" style={{ visibility: "hidden" }}>
          BLANK
        </h4>
        <input
          className="row"
          type="number"
          value={single}
          onChange={handleSingle}
        />
        <button onClick={deleteSingle}>Submit</button>
      </div>
      <div className="child sub-grid">
        <h3 className="row">Range</h3>
        <h4>From</h4>
        <h4>Through</h4>

        <input type="number" value={start} onChange={handleStart} />
        <input type="number" value={end} onChange={handleEnd} />
        <button onClick={deleteRange}>Submit</button>
      </div>
    </>
  );
};

const Random = (props) => {
  const selectRandom = () => props.selectRandom();

  return (
    <div className="rando">
      <button onClick={selectRandom}>Rando</button>
      <h1>
        <props.Rand />
      </h1>
    </div>
  );
};
export default Set;
