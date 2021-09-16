import { createClient } from "@supabase/supabase-js";

const url = process.env.REACT_APP_SUPABASE_URL;
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey);

export const fetchSet = async (id) => {
  const { data, error } = await supabase
    .from("instances")
    .select("items")
    .match({ id: id });

  console.log(data, error);

  return data[0].items;
};
