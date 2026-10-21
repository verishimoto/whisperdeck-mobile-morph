import { HackPrompt } from "@/types";
import { shortLabel } from "@/lib/category-labels";

/** Hand-picked core archetypes shown as Recommended while browsing (no search). */
export const CURATED_RECOMMENDED = new Set<number>([1, 6, 10, 16, 54, 78, 91, 103, 121, 251]);

/** How many top search matches get the Recommended badge. */
export const SEARCH_RECOMMENDED_COUNT = 3;

/** Maximum cards in one multi-copy. */
export const MAX_MULTI_COPY = 5;

/** Input placeholders like [QUERY] found in the prompt template. */
export function inputTags(example: string): string[] {
  const found = example.match(/\[[A-Z][A-Z0-9 _/-]{1,30}\]/g) ?? [];
  return Array.from(new Set(found)).slice(0, 4);
}

/** Full card as a copyable text block. */
export function formatFullCard(p: HackPrompt): string {
  return [
    `#${p.id} — ${p.title}`,
    `Tag: ${shortLabel(p.category)} (${p.category})`,
    ``,
    `Description: ${p.description}`,
    ``,
    `Prompt:`,
    p.example,
    ``,
    `Why it's a hack: ${p.whyHack ?? ""}`,
  ].join("\n");
}

export function formatManyCards(list: HackPrompt[]): string {
  return list.map(formatFullCard).join("\n\n---\n\n");
}
