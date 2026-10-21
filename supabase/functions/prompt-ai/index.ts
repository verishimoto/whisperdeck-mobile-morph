import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText } from "npm:ai";
import { createClient } from "npm:@supabase/supabase-js@2";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
} from "../_shared/run-id.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

type Card = { id: number; title: string; category: string; description: string };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "AI is not configured." }, 500);

    // Signed-in users only (protects AI credits).
    const authHeader = req.headers.get("Authorization") ?? "";
    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData } = await supa.auth.getUser();
    if (!userData?.user) return json({ error: "Please sign in to use AI features." }, 401);

    const body = await req.json();
    const mode = body?.mode;
    let instructions = "";
    let input = "";

    if (mode === "find") {
      const task = String(body.task ?? "").slice(0, 2000).trim();
      const cards: Card[] = Array.isArray(body.cards) ? body.cards.slice(0, 300) : [];
      if (!task || cards.length === 0) return json({ error: "Describe your task first." }, 400);
      instructions =
        "You match a user's task to prompts from a prompt-engineering library. Pick the 3 to 5 best-fitting prompts. Reply with ONLY a JSON object: {\"matches\":[{\"id\":number,\"reason\":string}]}. Each reason is one or two plain sentences explaining why this prompt helps with the user's specific task. Use only ids from the list.";
      input = `Task:\n${task}\n\nLibrary (id | category | title | description):\n` +
        cards.map((c) => `${c.id} | ${c.category} | ${c.title} | ${c.description}`).join("\n");
    } else if (mode === "adapt") {
      const goal = String(body.goal ?? "").slice(0, 1500).trim();
      const context = String(body.context ?? "").slice(0, 3000).trim();
      const p = body.prompt ?? {};
      if (!goal || !p.example) return json({ error: "Add your goal first." }, 400);
      instructions =
        "You adapt a prompt-engineering technique into a ready-to-paste prompt for the user's goal. Keep the technique's structure and intent, fill every [PLACEHOLDER] with the user's specifics (or a clear question if unknown), and write it in the user's language. Reply with ONLY the final prompt text, no preamble.";
      input = `Technique: #${p.id} ${p.title} (${p.category})\nDescription: ${p.description}\nWhy it works: ${p.whyHack ?? ""}\nTemplate prompt:\n${p.example}\n\nUser goal:\n${goal}\n\nUser context:\n${context || "(none)"}`;
    } else {
      return json({ error: "Unknown request." }, 400);
    }

    const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(req));
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    let upstreamError: any = null;
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: instructions,
      messages: [{ role: "user", content: input }],
      abortSignal: req.signal,
      onError: ({ error }) => { upstreamError = error; },
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    let text = "";
    for await (const chunk of result.textStream) text += chunk;

    if (upstreamError || !text.trim()) {
      const status = upstreamError?.statusCode ?? 502;
      const msg =
        status === 429 ? "Too many requests right now. Please try again in a moment." :
        status === 402 ? "AI credits have run out for this workspace." :
        status === 403 ? "AI access is not available for this request." :
        "The AI could not answer. Please try again.";
      console.error("prompt-ai upstream error", status, upstreamError?.message);
      return json({ error: msg }, [402, 403, 429].includes(status) ? status : 502);
    }

    if (mode === "find") {
      const m = text.match(/\{[\s\S]*\}/);
      let matches: { id: number; reason: string }[] = [];
      try { matches = JSON.parse(m?.[0] ?? "{}").matches ?? []; } catch { /* ignore */ }
      const valid = new Set((body.cards as Card[]).map((c) => c.id));
      matches = matches.filter((x) => valid.has(Number(x.id))).slice(0, 5);
      if (!matches.length) return json({ error: "No matches found. Try describing the task differently." }, 422);
      return json({ matches });
    }
    return json({ adapted: text.trim() });
  } catch (e) {
    if ((e as Error)?.name === "AbortError") return json({ error: "Cancelled" }, 499);
    console.error("prompt-ai error", e);
    return json({ error: "Something went wrong." }, 500);
  }
});
