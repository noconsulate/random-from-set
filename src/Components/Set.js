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
  }, [id, items]);

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
      range.push(i);
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
    // if (!items)
    //   return (
    //     <div className="RenderItems">
    //       <p>no items</p>
    //     </div>
    //   );
    // return (
    //   <div className="RenderItems">
    //     <p>
    //       {items.map((item, index) => {
    //         if (index < items.length - 1) {
    //           return <React.Fragment key={index}>{item}, </React.Fragment>;
    //         } else {
    //           return <React.Fragment key={index}>{item}</React.Fragment>;
    //         }
    //       })}
    //     </p>
    //   </div>
    // );

    return (
      <div className="renderItems">
        <p>
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
          55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
          72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
          89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
          105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
          119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132,
          133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146,
          147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160,
          161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174,
          175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188,
          189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200
        </p>
      </div>
    );
  };

  return (
    <div className="Set">
      <RenderItems />
      <Inputs submitSingle={submitSingle} submitRange={submitRange} />
      <Delete deleteSingle={deleteSingle} deleteRange={deleteRange} />
      <Random selectRandom={selectRandom} Rand={DisplayRandom} />
    </div>
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

const Random = (props) => {
  const selectRandom = () => props.selectRandom();

  return (
    <>
      <button onClick={selectRandom}>Get Rando</button>
      <h1>
        <props.Rand />
      </h1>
    </>
  );
};
export default Set;
