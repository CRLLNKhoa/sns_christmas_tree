"use server";
import createSupabaseServerClient from "@/server/supabase.js";

export async function newTree(tree) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("tree").insert([tree]).select();
  if (error) {
    return { status: "Error!", data: error };
  } else return { status: "Success!", data: data };
}

export async function getTree(user_id) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("tree")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    return { status: "Error!", data: error };
  } else return { status: "Success!", data: data };
}

export async function readTree(tree_id) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("tree")
    .select("*")
    .eq("tree_id", tree_id);
  const { data: list, error: errorWhises } = await supabase
    .from("whises")
    .select("*")
    .eq("tree_id", tree_id);
  if (error || errorWhises) {
    return {
      status: "Error!",
      data: { error: error, whisesError: errorWhises },
    };
  } else
    return {
      status: "Success!",
      data: {
        list: list,
        tree: data,
      },
    };
}


export async function newWhises(whises) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("whises").insert([whises]).select("*");
    if (error) {
      return { status: "Error!", data: error };
    } else return { status: "Success!", data: data };
  }
  

  export async function getWhises(tree_id) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("whises")
      .select("*")
      .eq("tree_id", tree_id);
    if (error) {
      return { status: "Error!", data: error };
    } else return { status: "Success!", data: data };
  }