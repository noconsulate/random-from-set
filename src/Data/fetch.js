import { supabase } from "./supabaseClient";

export const fetchSet = async (id) => {
  const { data, error } = await supabase.from("instances").select();

  console.log(data, error);
};
