import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export async function callPromptAI<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke("prompt-ai", { body });
  if (error) {
    let msg = "Something went wrong.";
    if (error instanceof FunctionsHttpError) {
      try { msg = (await error.context.json()).error ?? msg; } catch { /* keep default */ }
    }
    throw new Error(msg);
  }
  return data as T;
}
