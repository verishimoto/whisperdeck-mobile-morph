// Display-only short labels. Stored category names stay unchanged.
export const categoryShortLabel: Record<string, string> = {
  'Meta-Cognition': 'Metacognition',
  'Strategic Reasoning': 'Strategy',
  'Analytical Decomposition': 'Analysis',
  'Divergent Thinking': 'Divergence',
  'Behavioral Psychology': 'Psychology',
  Design: 'Design',
};

export const shortLabel = (category: string) => categoryShortLabel[category] ?? category;
