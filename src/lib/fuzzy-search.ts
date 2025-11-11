import Fuse, { FuseResult, FuseResultMatch } from 'fuse.js';
import { HackPrompt } from '@/types';

export interface FuzzySearchResult {
  item: HackPrompt;
  matches?: FuseResultMatch[];
  score?: number;
}

export const createFuzzySearch = (prompts: HackPrompt[]) => {
  return new Fuse(prompts, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'description', weight: 1.5 },
      { name: 'example', weight: 1 },
      { name: 'category', weight: 0.5 },
    ],
    threshold: 0.4,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
  });
};

export const highlightMatch = (text: string, matches?: FuseResultMatch[]): string => {
  if (!matches || matches.length === 0) return text;

  let result = text;
  const replacements: Array<{ start: number; end: number }> = [];

  matches.forEach((match) => {
    if (match.indices) {
      match.indices.forEach(([start, end]) => {
        replacements.push({ start, end });
      });
    }
  });

  // Sort by start position descending to avoid offset issues
  replacements.sort((a, b) => b.start - a.start);

  replacements.forEach(({ start, end }) => {
    const before = result.slice(0, start);
    const matched = result.slice(start, end + 1);
    const after = result.slice(end + 1);
    result = `${before}<mark class="bg-primary/30 text-primary-foreground">${matched}</mark>${after}`;
  });

  return result;
};
