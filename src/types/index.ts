export interface HackPrompt {
  id: number;
  rank?: string;
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
  sort: 'asc' | 'desc';
}