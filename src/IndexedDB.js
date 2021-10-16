import { openDB, deleteDB, wrap, unwrap } from "idb";

let db;
(async function () {
  console.log("in anon function");
  db = await openDB("randos-db", 1, {
    upgrade(db) {
      db.createObjectStore("set", { keyPath: "id" });
    },
  });

  // let putting = await db.put("settings", "fizbang", "content");
})();

export const putIdb = async (id, set) => {
  return (await db).put("set", set);
};
