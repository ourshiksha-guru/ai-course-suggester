import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase env vars not set");
    _client = createClient(url, key);
  }
  return _client;
}

export async function saveSuggestion(
  goal: string,
  curriculum: object,
  matched_modules: object[]
) {
  const { data, error } = await getClient()
    .from("suggestions")
    .insert({ goal, curriculum, matched_modules })
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function getSuggestion(id: string) {
  const { data, error } = await getClient()
    .from("suggestions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
