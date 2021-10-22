import { openDB, deleteDB, wrap, unwrap } from "idb";

let db;
(async function () {
  db = await openDB("randos", 1, {
    upgrade(db) {
      db.createObjectStore("set", { keyPath: "id" });
    },
  });
})();

export const putIdb = async (id, set) => {
  const tx = db.transaction("set", "readwrite");
  const store = tx.objectStore("set");
  await store.put(set);
  await tx.done;
  return "indexDB done";
};
