export interface HackPrompt {
  id: number;
  title: string;
  description: string;
  category: string;
  example: string;
  advancedExample?: string;
  whyHack?: string;
  source?: string;
  score?: number;
}

export interface FilterState {
  search: string;
  category: string;
}