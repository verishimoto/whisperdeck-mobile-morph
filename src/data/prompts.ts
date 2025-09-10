import { HackPrompt } from '@/types';

export const hackPrompts: HackPrompt[] = [
  {
    id: 100,
    title: "Recursive Self-Improvement Prompt",
    description: "AI helps you improve your own prompts iteratively",
    category: "Advanced",
    example: "Analyze this prompt and suggest 3 improvements: [YOUR_PROMPT]. Then rewrite it using those improvements.",
    score: 95
  },
  {
    id: 99,
    title: "Context Window Memory Extension",
    description: "Simulate longer memory by chunking and summarizing",
    category: "Advanced",
    example: "Before we continue, summarize our conversation in 3 bullet points, then proceed with: [NEW_TASK]",
    score: 92
  },
  {
    id: 98,
    title: "Multi-Perspective Synthesis",
    description: "Get different viewpoints on the same problem",
    category: "Analysis",
    example: "Analyze [PROBLEM] from 3 perspectives: 1) Optimist 2) Pessimist 3) Realist. Then synthesize the best insights.",
    score: 88
  },
  {
    id: 97,
    title: "Constraint-Driven Creativity",
    description: "Use artificial limitations to boost innovation",
    category: "Creativity",
    example: "Generate 10 ideas for [GOAL] using only: words with 5 letters or less, no technology, budget under $100.",
    score: 91
  },
  {
    id: 96,
    title: "Progressive Disclosure Prompting",
    description: "Reveal information gradually for better processing",
    category: "Analysis",
    example: "I'll give you info in 3 parts. After each, ask clarifying questions before I continue. Part 1: [INITIAL_INFO]",
    score: 89
  },
  {
    id: 95,
    title: "Inverse Problem Definition",
    description: "Define problems by exploring what they're NOT",
    category: "Strategy",
    example: "Instead of solving [PROBLEM], list 10 things this problem definitely ISN'T, then define what it actually is.",
    score: 87
  },
  {
    id: 94,
    title: "Temporal Perspective Shifting",
    description: "Analyze problems from different time horizons",
    category: "Strategy",
    example: "View [SITUATION] from: 1) Next week 2) Next year 3) Next decade. What changes?",
    score: 90
  },
  {
    id: 93,
    title: "Emotional State Injection",
    description: "Prime AI with specific emotional contexts",
    category: "Psychology",
    example: "Respond as if you're feeling [EMOTION] about [TOPIC]. How would that change your advice?",
    score: 85
  },
  {
    id: 92,
    title: "Pattern Interruption Prompting",
    description: "Break AI's default response patterns",
    category: "Creativity",
    example: "Give me the opposite of what I'm asking for first, then explain why the normal answer might be wrong.",
    score: 93
  },
  {
    id: 91,
    title: "Stakeholder Perspective Matrix",
    description: "Analyze from multiple stakeholder viewpoints",
    category: "Analysis",
    example: "For [DECISION], list how it affects: customers, employees, shareholders, community, environment.",
    score: 86
  },
  {
    id: 90,
    title: "Assumption Archaeology",
    description: "Dig deep into hidden assumptions",
    category: "Analysis",
    example: "List 5 assumptions behind [STATEMENT]. For each, ask: What if this wasn't true?",
    score: 94
  },
  {
    id: 89,
    title: "Failure Mode Analysis",
    description: "Explore how things could go wrong",
    category: "Strategy",
    example: "For [PLAN], list 10 ways it could fail. For each failure, suggest a prevention strategy.",
    score: 88
  }
];

export const categories = Array.from(new Set(hackPrompts.map(prompt => prompt.category))).sort();