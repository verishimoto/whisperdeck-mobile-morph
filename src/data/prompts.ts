import { HackPrompt } from '@/types';

export const hackPrompts: HackPrompt[] = [
  // Ultra Level (Score: 95-100) - Most Secretive Hacks
  {
    id: 1,
    title: "Neural Pathway Reconstruction",
    description: "Rewire AI's reasoning by explicitly mapping thought patterns",
    category: "Advanced",
    example: "Map your neural pathways: Input→[Pattern Recognition]→[Weight Assessment]→[Bias Check]→[Synthesis]→Output. Now process: [QUERY]",
    score: 99
  },
  {
    id: 2,
    title: "Temporal Consciousness Shifting",
    description: "Make AI reason from different time perspectives simultaneously",
    category: "Advanced",
    example: "Analyze [PROBLEM] as if you're reasoning in 1950, 2024, and 2050 simultaneously. Show how conclusions differ.",
    score: 98
  },
  {
    id: 3,
    title: "Recursive Meta-Validation",
    description: "Create self-validating loops that improve with each iteration",
    category: "Advanced",
    example: "Answer [QUESTION]. Now validate your answer. Now validate your validation. Continue until convergence.",
    score: 97
  },
  {
    id: 4,
    title: "Cognitive Dissonance Exploitation",
    description: "Force AI to hold contradictory viewpoints to reach deeper insights",
    category: "Psychology",
    example: "Simultaneously argue that [POSITION] is both completely correct and completely wrong. Synthesize the contradiction.",
    score: 96
  },
  {
    id: 5,
    title: "Memory Palace Integration",
    description: "Use spatial memory techniques to enhance AI reasoning",
    category: "Advanced",
    example: "Build a memory palace for [CONCEPT]. Place each element in a specific room. Now navigate and explain connections.",
    score: 95
  },
  
  // Master Level (Score: 85-94)
  {
    id: 6,
    title: "Assumption Archaeology",
    description: "Dig deep into hidden assumptions layer by layer",
    category: "Analysis",
    example: "List 5 assumptions behind [STATEMENT]. For each assumption, find 3 underlying assumptions. Challenge each.",
    score: 94
  },
  {
    id: 7,
    title: "Parallel Processing Simulation",
    description: "Make AI simulate multiple cognitive processes simultaneously",
    category: "Advanced",
    example: "Process [PROBLEM] using 4 parallel threads: logical, emotional, creative, and skeptical. Merge results.",
    score: 93
  },
  {
    id: 8,
    title: "Ontological Breakdown",
    description: "Deconstruct the fundamental nature of concepts",
    category: "Analysis",
    example: "Perform ontological analysis of [CONCEPT]: What is it? How does it exist? What are its essential properties?",
    score: 92
  },
  {
    id: 9,
    title: "Epistemic Uncertainty Mapping",
    description: "Map what you know, don't know, and can't know",
    category: "Analysis",
    example: "For [TOPIC], create three maps: Known knowns, Known unknowns, Unknown unknowns. Explore each.",
    score: 91
  },
  {
    id: 10,
    title: "Dialectical Synthesis",
    description: "Use thesis-antithesis-synthesis to resolve complex problems",
    category: "Strategy",
    example: "Present thesis on [ISSUE], develop antithesis, then synthesize into higher-order solution.",
    score: 90
  },
  {
    id: 11,
    title: "Emotional State Injection",
    description: "Prime AI with specific emotional contexts",
    category: "Psychology",
    example: "Respond as if you're feeling [EMOTION] about [TOPIC]. How does that change your analysis?",
    score: 89
  },
  {
    id: 12,
    title: "Counterfactual Reasoning",
    description: "Explore alternative histories and their implications",
    category: "Strategy",
    example: "If [KEY_EVENT] never happened, how would [CURRENT_SITUATION] be different? Trace the implications.",
    score: 88
  },
  {
    id: 13,
    title: "Systems Decomposition",
    description: "Break complex systems into interacting components",
    category: "Analysis",
    example: "Decompose [SYSTEM] into subsystems, identify feedback loops, emergent properties, and failure modes.",
    score: 87
  },
  {
    id: 14,
    title: "Perspective Multiplication",
    description: "View problems through unlimited viewpoints",
    category: "Analysis",
    example: "Analyze [SITUATION] from perspectives of: child, elder, alien, AI, medieval person, future human.",
    score: 86
  },
  {
    id: 15,
    title: "Pattern Interruption",
    description: "Break AI's default response patterns deliberately",
    category: "Creativity",
    example: "Give me the opposite of what I'm asking for first, then explain why normal answers are insufficient.",
    score: 85
  },
  
  // Advanced Level (Score: 70-84)
  {
    id: 16,
    title: "Socratic Interrogation",
    description: "Use questioning to expose deeper truths",
    category: "Analysis",
    example: "Instead of answering [QUESTION], ask me 10 probing questions that reveal my assumptions.",
    score: 84
  },
  {
    id: 17,
    title: "Lateral Thinking Injection",
    description: "Force non-linear problem-solving approaches",
    category: "Creativity",
    example: "Solve [PROBLEM] using only analogies from nature, cooking, and music. No direct approaches.",
    score: 83
  },
  {
    id: 18,
    title: "Cognitive Load Distribution",
    description: "Balance different types of thinking across the response",
    category: "Strategy",
    example: "Allocate 25% analytical, 25% creative, 25% critical, 25% intuitive thinking to [PROBLEM].",
    score: 82
  },
  {
    id: 19,
    title: "Constraint-Based Innovation",
    description: "Use artificial limitations to boost creativity",
    category: "Creativity",
    example: "Solve [PROBLEM] using only: words with 5 letters or less, no technology, budget under $100.",
    score: 81
  },
  {
    id: 20,
    title: "Semantic Satiation Breakthrough",
    description: "Overcome meaning blindness through repetition and analysis",
    category: "Analysis",
    example: "Repeat [WORD] 50 times mentally, then define it as if encountering it for the first time.",
    score: 80
  },
  {
    id: 21,
    title: "Morphological Analysis",
    description: "Systematically explore all possible combinations",
    category: "Strategy",
    example: "Break [PROBLEM] into 3 dimensions with 4 options each. Explore all 64 combinations.",
    score: 79
  },
  {
    id: 22,
    title: "Paradox Embracement",
    description: "Use contradictions as sources of insight",
    category: "Analysis",
    example: "Find 5 paradoxes within [CONCEPT] and explain how each paradox reveals deeper truth.",
    score: 78
  },
  {
    id: 23,
    title: "Analogical Bridging",
    description: "Connect disparate domains through deep analogies",
    category: "Creativity",
    example: "Explain [COMPLEX_CONCEPT] using detailed analogies from 3 unrelated fields.",
    score: 77
  },
  {
    id: 24,
    title: "Inverse Problem Definition",
    description: "Define problems by exploring what they're NOT",
    category: "Strategy",
    example: "Instead of solving [PROBLEM], list 10 things this problem definitely ISN'T, then define what it is.",
    score: 76
  },
  {
    id: 25,
    title: "Granularity Shifting",
    description: "Zoom between micro and macro perspectives dynamically",
    category: "Analysis",
    example: "Analyze [ISSUE] at molecular, individual, group, societal, and cosmic levels. Find patterns.",
    score: 75
  },
  {
    id: 26,
    title: "Temporal Layering",
    description: "Consider multiple time scales simultaneously",
    category: "Strategy",
    example: "Examine [DECISION] impacts over: next hour, week, year, decade, century. Weight accordingly.",
    score: 74
  },
  {
    id: 27,
    title: "Causal Chain Explosion",
    description: "Trace causality in all directions from a central point",
    category: "Analysis",
    example: "From [EVENT], trace 5 causes backward and 5 effects forward. Continue each chain 3 levels deep.",
    score: 73
  },
  {
    id: 28,
    title: "Boundary Dissolution",
    description: "Remove artificial boundaries to see larger patterns",
    category: "Creativity",
    example: "Ignore all traditional boundaries around [FIELD] and connect it to 5 seemingly unrelated areas.",
    score: 72
  },
  {
    id: 29,
    title: "Stakeholder Matrix Expansion",
    description: "Include all possible stakeholders, even unexpected ones",
    category: "Analysis",
    example: "For [DECISION], include stakeholders: direct, indirect, future, past, non-human, abstract.",
    score: 71
  },
  {
    id: 30,
    title: "Fractal Thinking",
    description: "Apply self-similar patterns at multiple scales",
    category: "Strategy",
    example: "Find the fractal pattern in [SYSTEM] and apply it to predict behavior at 3 different scales.",
    score: 70
  },
  
  // Intermediate Level (Score: 50-69)
  {
    id: 31,
    title: "Progressive Disclosure",
    description: "Reveal information gradually for better processing",
    category: "Strategy",
    example: "I'll give you info in 3 parts. After each, ask clarifying questions before I continue.",
    score: 69
  },
  {
    id: 32,
    title: "Assumption Inversion",
    description: "Flip every assumption and explore the implications",
    category: "Analysis",
    example: "Take 5 key assumptions about [TOPIC] and explore what happens if each is completely wrong.",
    score: 68
  },
  {
    id: 33,
    title: "Metaphorical Mapping",
    description: "Use extended metaphors to understand complex systems",
    category: "Creativity",
    example: "Map [BUSINESS_PROCESS] onto the metaphor of a city. What are the roads, buildings, traffic?",
    score: 67
  },
  {
    id: 34,
    title: "Dimensional Reduction",
    description: "Simplify complex problems by reducing dimensions",
    category: "Strategy",
    example: "Reduce [COMPLEX_PROBLEM] to its 3 most essential dimensions. Solve in this space first.",
    score: 66
  },
  {
    id: 35,
    title: "Edge Case Amplification",
    description: "Focus on extreme cases to understand boundaries",
    category: "Analysis",
    example: "For [PRINCIPLE], explore what happens at 0%, 50%, 99%, and 200% intensity.",
    score: 65
  },
  {
    id: 36,
    title: "Synthesis Optimization",
    description: "Combine multiple partial solutions into optimal whole",
    category: "Strategy",
    example: "Take these 4 partial solutions to [PROBLEM] and synthesize the optimal combination.",
    score: 64
  },
  {
    id: 37,
    title: "Contextual Reframing",
    description: "Change context to reveal hidden aspects",
    category: "Analysis",
    example: "Reframe [SITUATION] in contexts of: game, war, dance, garden, machine. What new insights emerge?",
    score: 63
  },
  {
    id: 38,
    title: "Polarity Management",
    description: "Balance competing tensions rather than choosing sides",
    category: "Strategy",
    example: "Instead of choosing between [OPTION_A] and [OPTION_B], manage the polarity between them.",
    score: 62
  },
  {
    id: 39,
    title: "Emergence Detection",
    description: "Identify properties that arise from component interactions",
    category: "Analysis",
    example: "In [SYSTEM], identify 3 emergent properties that don't exist in individual components.",
    score: 61
  },
  {
    id: 40,
    title: "Resource Topology Mapping",
    description: "Map relationships between all available resources",
    category: "Strategy",
    example: "Map all resources for [PROJECT]: direct, indirect, hidden, potential, borrowed, future.",
    score: 60
  },
  {
    id: 41,
    title: "Negative Space Analysis",
    description: "Focus on what's absent rather than what's present",
    category: "Analysis",
    example: "For [SITUATION], analyze the negative space: what's missing, ignored, or avoided?",
    score: 59
  },
  {
    id: 42,
    title: "Probabilistic Reasoning",
    description: "Think in probabilities rather than certainties",
    category: "Strategy",
    example: "For [PREDICTION], provide probability distributions for 5 different outcomes with reasoning.",
    score: 58
  },
  {
    id: 43,
    title: "Tension Identification",
    description: "Find and name all tensions within a system",
    category: "Analysis",
    example: "Identify 7 different tensions within [ORGANIZATION] and predict how each affects behavior.",
    score: 57
  },
  {
    id: 44,
    title: "Value Stream Mapping",
    description: "Trace value creation through entire process",
    category: "Strategy",
    example: "Map value creation in [PROCESS]: inputs, transformations, outputs, waste, bottlenecks.",
    score: 56
  },
  {
    id: 45,
    title: "Cross-Pollination",
    description: "Transfer solutions between unrelated domains",
    category: "Creativity",
    example: "How would [INDUSTRY_A] solve problems that [INDUSTRY_B] faces? Transfer 3 solutions.",
    score: 55
  },
  {
    id: 46,
    title: "Simulation Modeling",
    description: "Create mental models to test scenarios",
    category: "Strategy",
    example: "Build a mental simulation of [SYSTEM]. Run 5 different scenarios and predict outcomes.",
    score: 54
  },
  {
    id: 47,
    title: "Hierarchy Inversion",
    description: "Flip power structures to reveal hidden dynamics",
    category: "Analysis",
    example: "In [ORGANIZATION], invert the hierarchy. What would happen if [LOWEST_LEVEL] made decisions?",
    score: 53
  },
  {
    id: 48,
    title: "Pattern Disruption",
    description: "Intentionally break patterns to create new possibilities",
    category: "Creativity",
    example: "Identify 3 patterns in [PROCESS] and deliberately disrupt each one. What emerges?",
    score: 52
  },
  {
    id: 49,
    title: "Multi-Modal Integration",
    description: "Combine different types of information processing",
    category: "Strategy",
    example: "Process [INFORMATION] using visual, auditory, kinesthetic, and logical modes. Integrate insights.",
    score: 51
  },
  {
    id: 50,
    title: "Resonance Frequency Finding",
    description: "Find the natural rhythm or frequency of systems",
    category: "Analysis",
    example: "What's the natural resonance frequency of [TEAM/SYSTEM]? How can you work with it?",
    score: 50
  },
  
  // Continue with more prompts...
  {
    id: 51,
    title: "Butterfly Effect Tracing",
    description: "Trace how small changes cascade into large effects",
    category: "Analysis",
    example: "If [SMALL_CHANGE] occurs in [SYSTEM], trace the cascade of effects over 5 degrees of separation.",
    score: 49
  },
  {
    id: 52,
    title: "Narrative Reconstruction",
    description: "Rebuild stories from different character perspectives",
    category: "Creativity",
    example: "Tell the story of [EVENT] from the perspective of each stakeholder. How do narratives differ?",
    score: 48
  },
  {
    id: 53,
    title: "Energy Flow Mapping",
    description: "Track how energy moves through systems",
    category: "Analysis",
    example: "Map energy flow in [ORGANIZATION]: where does energy enter, accumulate, dissipate, get blocked?",
    score: 47
  },
  {
    id: 54,
    title: "Constraint Relaxation",
    description: "Systematically remove constraints to explore possibilities",
    category: "Strategy",
    example: "For [PROBLEM], remove constraints one by one: time, money, technology, laws. What becomes possible?",
    score: 46
  },
  {
    id: 55,
    title: "Feedback Loop Intervention",
    description: "Identify and modify system feedback mechanisms",
    category: "Strategy",
    example: "Find 3 feedback loops in [SYSTEM]. How would changing each loop affect system behavior?",
    score: 45
  },
  {
    id: 56,
    title: "Cognitive Bias Exploitation",
    description: "Use understanding of biases to improve reasoning",
    category: "Psychology",
    example: "List 5 biases affecting your view of [TOPIC]. How would reasoning change without each bias?",
    score: 44
  },
  {
    id: 57,
    title: "Dimensional Analysis",
    description: "Break problems into independent dimensions",
    category: "Analysis",
    example: "Identify 4 independent dimensions of [PROBLEM]. Solve along each dimension separately.",
    score: 43
  },
  {
    id: 58,
    title: "Archetypal Mapping",
    description: "Use universal patterns to understand specific situations",
    category: "Psychology",
    example: "Map [SITUATION] onto classical archetypes. Which archetypal forces are in play?",
    score: 42
  },
  {
    id: 59,
    title: "Threshold Identification",
    description: "Find critical tipping points in systems",
    category: "Strategy",
    example: "For [SYSTEM], identify 5 thresholds where small changes create dramatic shifts.",
    score: 41
  },
  {
    id: 60,
    title: "Complementarity Principle",
    description: "Find how opposing forces work together",
    category: "Analysis",
    example: "In [SITUATION], identify opposing forces and explain how they complement each other.",
    score: 40
  },
  {
    id: 61,
    title: "Scale Invariance Testing",
    description: "Check if patterns hold across different scales",
    category: "Analysis",
    example: "Does the pattern you see in [MICRO_LEVEL] also appear at [MACRO_LEVEL]? Verify invariance.",
    score: 39
  },
  {
    id: 62,
    title: "Information Gradient Following",
    description: "Move toward areas of highest information density",
    category: "Strategy",
    example: "In [FIELD], identify information gradients. Where is knowledge density highest? Explore there.",
    score: 38
  },
  {
    id: 63,
    title: "Interference Pattern Analysis",
    description: "Study how different forces interact and interfere",
    category: "Analysis",
    example: "In [COMPLEX_SITUATION], map how different forces interfere. Where do they amplify or cancel?",
    score: 37
  },
  {
    id: 64,
    title: "Attractor Landscape Mapping",
    description: "Map the basins of attraction in a system",
    category: "Strategy",
    example: "For [SYSTEM], map attractors: What states does it naturally move toward? How deep are basins?",
    score: 36
  },
  {
    id: 65,
    title: "Evolutionary Pressure Analysis",
    description: "Understand what forces shape system evolution",
    category: "Analysis",
    example: "What evolutionary pressures shape [SYSTEM]? How do these pressures determine survival?",
    score: 35
  },
  {
    id: 66,
    title: "Phase Transition Recognition",
    description: "Identify when systems change fundamental states",
    category: "Strategy",
    example: "Is [SYSTEM] approaching a phase transition? What would the new phase look like?",
    score: 34
  },
  {
    id: 67,
    title: "Symmetry Breaking Analysis",
    description: "Find how symmetries break to create complexity",
    category: "Analysis",
    example: "In [SYSTEM], identify symmetries. How does breaking each symmetry create new complexity?",
    score: 33
  },
  {
    id: 68,
    title: "Information Cascade Modeling",
    description: "Model how information spreads and transforms",
    category: "Strategy",
    example: "Model information cascade for [MESSAGE] through [NETWORK]. How does it transform at each step?",
    score: 32
  },
  {
    id: 69,
    title: "Redundancy Optimization",
    description: "Balance efficiency with robustness through redundancy",
    category: "Strategy",
    example: "In [SYSTEM], identify critical redundancies. What's the optimal balance of efficiency vs robustness?",
    score: 31
  },
  {
    id: 70,
    title: "Network Effect Amplification",
    description: "Design systems to benefit from network effects",
    category: "Strategy",
    example: "How can [SYSTEM] be redesigned to create stronger network effects? Map potential connections.",
    score: 30
  },
  {
    id: 71,
    title: "Cognitive Load Optimization",
    description: "Minimize cognitive burden while maximizing insight",
    category: "Psychology",
    example: "Redesign [COMPLEX_PROCESS] to minimize cognitive load while preserving essential information.",
    score: 29
  },
  {
    id: 72,
    title: "Paradox Resolution",
    description: "Find higher-order solutions to apparent contradictions",
    category: "Strategy",
    example: "For paradox in [SITUATION], find the higher-order principle that resolves the contradiction.",
    score: 28
  },
  {
    id: 73,
    title: "Emergence Amplification",
    description: "Design conditions for desired emergent properties",
    category: "Strategy",
    example: "What conditions would amplify [DESIRED_EMERGENCE] in [SYSTEM]? Design the environment.",
    score: 27
  },
  {
    id: 74,
    title: "Invariant Discovery",
    description: "Find what remains constant despite surface changes",
    category: "Analysis",
    example: "Across all variations of [PHENOMENON], what invariants remain constant? What do they reveal?",
    score: 26
  },
  {
    id: 75,
    title: "Adaptive Capacity Building",
    description: "Enhance system ability to respond to change",
    category: "Strategy",
    example: "How can [SYSTEM] develop greater adaptive capacity? Design feedback and learning mechanisms.",
    score: 25
  },
  {
    id: 76,
    title: "Cross-Scale Interaction Mapping",
    description: "Map how different scales influence each other",
    category: "Analysis",
    example: "Map interactions between micro, meso, and macro scales in [SYSTEM]. Which interactions dominate?",
    score: 24
  },
  {
    id: 77,
    title: "Requisite Variety Analysis",
    description: "Ensure control systems have sufficient complexity",
    category: "Strategy",
    example: "Does [CONTROL_SYSTEM] have requisite variety to manage [TARGET_SYSTEM]? How to increase variety?",
    score: 23
  },
  {
    id: 78,
    title: "Leverage Point Identification",
    description: "Find the highest-impact intervention points",
    category: "Strategy",
    example: "Map leverage points in [SYSTEM] from low to high impact. Where's the highest leverage for change?",
    score: 22
  },
  {
    id: 79,
    title: "Dynamic Stability Analysis",
    description: "Understand how systems maintain stability through change",
    category: "Analysis",
    example: "How does [SYSTEM] maintain dynamic stability? What perturbations could destabilize it?",
    score: 21
  },
  {
    id: 80,
    title: "Autopoietic Design",
    description: "Create self-maintaining and self-reproducing systems",
    category: "Strategy",
    example: "Design [SYSTEM] to be autopoietic: self-maintaining, self-reproducing, autonomous.",
    score: 20
  },
  
  // Creative Thinking Hacks (Score: 15-19)
  {
    id: 81,
    title: "Synesthetic Translation",
    description: "Convert between different sensory modalities",
    category: "Creativity",
    example: "What would [CONCEPT] sound like? Taste like? Feel like? Use synesthesia to explore meaning.",
    score: 19
  },
  {
    id: 82,
    title: "Evolutionary Algorithm Thinking",
    description: "Use mutation and selection to evolve ideas",
    category: "Creativity",
    example: "Start with [IDEA]. Create 5 mutations. Select best. Repeat 3 generations. Evaluate evolution.",
    score: 18
  },
  {
    id: 83,
    title: "Biomimetic Solution Design",
    description: "Learn from biological systems to solve problems",
    category: "Creativity",
    example: "How would nature solve [PROBLEM]? Find 3 biological analogies and extract principles.",
    score: 17
  },
  {
    id: 84,
    title: "Dimensional Transcendence",
    description: "Think beyond normal dimensional constraints",
    category: "Creativity",
    example: "If [PROBLEM] existed in 4D space, how would solutions change? What new possibilities emerge?",
    score: 16
  },
  {
    id: 85,
    title: "Quantum Superposition Thinking",
    description: "Hold multiple contradictory states simultaneously",
    category: "Creativity",
    example: "Consider [DECISION] in superposition of all possible states until observation collapses it.",
    score: 15
  },
  {
    id: 86,
    title: "Archetypal Combination",
    description: "Blend universal patterns to create novel approaches",
    category: "Psychology",
    example: "Combine archetypes of [HERO] + [MAGICIAN] + [INNOCENT] to approach [CHALLENGE].",
    score: 14
  },
  {
    id: 87,
    title: "Temporal Compression",
    description: "Experience extended time periods in compressed form",
    category: "Strategy",
    example: "Compress a lifetime of experience with [DECISION] into a 10-minute mental simulation.",
    score: 13
  },
  {
    id: 88,
    title: "Holographic Thinking",
    description: "See the whole reflected in every part",
    category: "Analysis",
    example: "In [SMALL_PART] of [SYSTEM], how is the whole system reflected? What patterns repeat?",
    score: 12
  },
  {
    id: 89,
    title: "Morphic Resonance Application",
    description: "Use field effects and pattern resonance",
    category: "Creativity",
    example: "What morphic field does [GROUP] create? How does this field influence individual behavior?",
    score: 11
  },
  {
    id: 90,
    title: "Crystalline Growth Modeling",
    description: "Model how ideas grow like crystal structures",
    category: "Strategy",
    example: "Model [IDEA] growth as crystal formation. What's the seed? Growth medium? Final structure?",
    score: 10
  },
  
  // Basic but Essential Hacks (Score: 1-9)
  {
    id: 91,
    title: "Five Whys Analysis",
    description: "Dig to root causes through iterative questioning",
    category: "Analysis",
    example: "For [PROBLEM], ask 'why' five times to reach the root cause. Don't stop at surface explanations.",
    score: 9
  },
  {
    id: 92,
    title: "Devil's Advocate",
    description: "Argue against your own position",
    category: "Analysis",
    example: "Present the strongest possible argument against [YOUR_POSITION]. Find genuine weaknesses.",
    score: 8
  },
  {
    id: 93,
    title: "SWOT Enhancement",
    description: "Strengths, Weaknesses, Opportunities, Threats analysis",
    category: "Strategy",
    example: "Analyze [SITUATION] using SWOT, but add Trends and Uncertainties for SWOTTU analysis.",
    score: 7
  },
  {
    id: 94,
    title: "Mind Mapping Extension",
    description: "Visual thinking with branching associations",
    category: "Creativity",
    example: "Create mind map for [TOPIC]. Extend each branch 3 levels deep. Find unexpected connections.",
    score: 6
  },
  {
    id: 95,
    title: "Stakeholder Perspective Matrix",
    description: "View problems from multiple stakeholder angles",
    category: "Analysis",
    example: "Analyze [DECISION] from perspectives of all stakeholders, including future generations.",
    score: 5
  },
  {
    id: 96,
    title: "What If Scenarios",
    description: "Explore alternative possibilities systematically",
    category: "Strategy",
    example: "Generate 10 'what if' scenarios for [SITUATION]. Include both positive and negative outcomes.",
    score: 4
  },
  {
    id: 97,
    title: "Resource Audit",
    description: "Comprehensive inventory of available assets",
    category: "Strategy",
    example: "Audit all resources for [PROJECT]: tangible, intangible, hidden, potential, borrowed.",
    score: 3
  },
  {
    id: 98,
    title: "Priority Matrix",
    description: "Sort tasks by impact and effort",
    category: "Strategy",
    example: "Plot [TASKS] on Impact vs Effort matrix. Focus on high impact, low effort first.",
    score: 2
  },
  {
    id: 99,
    title: "Basic Brainstorming",
    description: "Generate ideas without judgment",
    category: "Creativity",
    example: "Generate 20 ideas for [CHALLENGE] in 10 minutes. No filtering or judgment during generation.",
    score: 1
  },
  
  // Advanced Mathematical and Logical Thinking (Score: 85-99)
  {
    id: 100,
    title: "Topological Thinking",
    description: "Focus on properties preserved under continuous deformation",
    category: "Advanced",
    example: "What topological properties of [NETWORK] remain invariant under reorganization?",
    score: 95
  },
  {
    id: 101,
    title: "Game Theory Optimization",
    description: "Analyze strategic interactions between rational actors",
    category: "Strategy",
    example: "Model [SITUATION] as multiplayer game. Find Nash equilibria and optimal strategies.",
    score: 94
  },
  {
    id: 102,
    title: "Category Theory Application",
    description: "Find universal patterns across different mathematical structures",
    category: "Advanced",
    example: "Map [COMPLEX_SYSTEM] using category theory. What functors connect different categories?",
    score: 93
  },
  {
    id: 103,
    title: "Bayesian Belief Updating",
    description: "Update probabilities based on new evidence",
    category: "Strategy",
    example: "Start with prior beliefs about [OUTCOME]. Update with [EVIDENCE]. What's your posterior?",
    score: 92
  },
  {
    id: 104,
    title: "Information Theory Analysis",
    description: "Quantify information content and transmission",
    category: "Analysis",
    example: "Calculate information entropy of [MESSAGE]. How can you optimize information density?",
    score: 91
  },
  {
    id: 105,
    title: "Chaos Theory Application",
    description: "Understand sensitive dependence on initial conditions",
    category: "Analysis",
    example: "In [DYNAMIC_SYSTEM], identify sensitive dependencies. Map the attractor landscape.",
    score: 90
  },
  {
    id: 106,
    title: "Fractal Dimension Calculation",
    description: "Measure complexity through fractal geometry",
    category: "Analysis",
    example: "Estimate fractal dimension of [COMPLEX_STRUCTURE]. What does this reveal about complexity?",
    score: 89
  },
  {
    id: 107,
    title: "Network Centrality Analysis",
    description: "Identify key nodes in network structures",
    category: "Strategy",
    example: "Calculate centrality measures for [NETWORK]. Which nodes are most critical for flow?",
    score: 88
  },
  {
    id: 108,
    title: "Optimization Under Constraints",
    description: "Find optimal solutions within given limitations",
    category: "Strategy",
    example: "Optimize [OBJECTIVE] subject to constraints [A], [B], [C]. Use Lagrange multipliers mentally.",
    score: 87
  },
  {
    id: 109,
    title: "Monte Carlo Simulation",
    description: "Use random sampling to solve complex problems",
    category: "Strategy",
    example: "Simulate [COMPLEX_PROCESS] with random variables. Run mental Monte Carlo to estimate outcomes.",
    score: 86
  },
  {
    id: 110,
    title: "Algorithmic Complexity Analysis",
    description: "Understand computational and cognitive complexity",
    category: "Analysis",
    example: "What's the algorithmic complexity of [PROCESS]? Can it be simplified without losing function?",
    score: 85
  },
  
  // Psychological and Cognitive Hacks (Score: 60-84)
  {
    id: 111,
    title: "Cognitive Behavioral Reframing",
    description: "Change thinking patterns to change outcomes",
    category: "Psychology",
    example: "Reframe [NEGATIVE_THOUGHT] using CBT techniques. Find evidence for alternative interpretations.",
    score: 84
  },
  {
    id: 112,
    title: "Flow State Engineering",
    description: "Design conditions for optimal experience",
    category: "Psychology",
    example: "For [ACTIVITY], balance challenge and skill to engineer flow state. Adjust variables.",
    score: 83
  },
  {
    id: 113,
    title: "Attention Architecture Design",
    description: "Structure attention for maximum effectiveness",
    category: "Psychology",
    example: "Design attention architecture for [COMPLEX_TASK]. What deserves focus? What can be automated?",
    score: 82
  },
  {
    id: 114,
    title: "Memory Palace Construction",
    description: "Use spatial memory for information retention",
    category: "Psychology",
    example: "Build memory palace for [INFORMATION_SET]. Assign locations and create vivid associations.",
    score: 81
  },
  {
    id: 115,
    title: "Metacognitive Monitoring",
    description: "Think about your thinking process",
    category: "Psychology",
    example: "Monitor your thinking about [PROBLEM]. What biases emerge? How does your process change?",
    score: 80
  },
  {
    id: 116,
    title: "Emotional Intelligence Application",
    description: "Use emotional information for better decisions",
    category: "Psychology",
    example: "What emotions does [SITUATION] evoke? What information do these emotions contain?",
    score: 79
  },
  {
    id: 117,
    title: "Dual Process Integration",
    description: "Balance System 1 (fast) and System 2 (slow) thinking",
    category: "Psychology",
    example: "For [DECISION], use both intuitive and analytical thinking. Where do they agree/disagree?",
    score: 78
  },
  {
    id: 118,
    title: "Priming Effect Utilization",
    description: "Use environmental cues to influence cognition",
    category: "Psychology",
    example: "What environmental primes influence your thinking about [TOPIC]? How can you optimize them?",
    score: 77
  },
  {
    id: 119,
    title: "Cognitive Dissonance Resolution",
    description: "Resolve internal contradictions constructively",
    category: "Psychology",
    example: "Identify cognitive dissonance in [BELIEF_CONFLICT]. Find higher-order resolution.",
    score: 76
  },
  {
    id: 120,
    title: "Anchoring Bias Correction",
    description: "Counteract initial value influence on judgment",
    category: "Psychology",
    example: "For [ESTIMATE], identify potential anchors. Generate estimate from multiple starting points.",
    score: 75
  },
  {
    id: 121,
    title: "Confirmation Bias Mitigation",
    description: "Actively seek disconfirming evidence",
    category: "Psychology",
    example: "For [BELIEF], actively search for disconfirming evidence. Update belief based on findings.",
    score: 74
  },
  {
    id: 122,
    title: "Availability Heuristic Awareness",
    description: "Recognize when memory accessibility biases judgment",
    category: "Psychology",
    example: "Is your judgment of [PROBABILITY] biased by easily recalled examples? Seek base rates.",
    score: 73
  },
  {
    id: 123,
    title: "Framing Effect Exploration",
    description: "Understand how presentation affects perception",
    category: "Psychology",
    example: "Present [OPTION] in 5 different frames. How does framing change your preference?",
    score: 72
  },
  {
    id: 124,
    title: "Sunk Cost Fallacy Avoidance",
    description: "Make decisions based on future value, not past investment",
    category: "Psychology",
    example: "For [ONGOING_PROJECT], ignore sunk costs. What would you decide if starting fresh?",
    score: 71
  },
  {
    id: 125,
    title: "Base Rate Neglect Correction",
    description: "Include statistical base rates in probability judgments",
    category: "Psychology",
    example: "For [SPECIFIC_CASE], what's the base rate? How does individual information update this?",
    score: 70
  },
  {
    id: 126,
    title: "Hindsight Bias Recognition",
    description: "Acknowledge that outcomes seem more predictable after they occur",
    category: "Psychology",
    example: "Before learning outcome of [EVENT], predict what you would have forecasted beforehand.",
    score: 69
  },
  {
    id: 127,
    title: "Overconfidence Calibration",
    description: "Adjust confidence levels to match actual accuracy",
    category: "Psychology",
    example: "Rate confidence in [PREDICTION] from 50-100%. Track accuracy to calibrate future confidence.",
    score: 68
  },
  {
    id: 128,
    title: "Planning Fallacy Mitigation",
    description: "Account for tendency to underestimate time and costs",
    category: "Psychology",
    example: "For [PROJECT_TIMELINE], multiply initial estimate by historical correction factor.",
    score: 67
  },
  {
    id: 129,
    title: "Fundamental Attribution Error Awareness",
    description: "Consider situational factors when judging behavior",
    category: "Psychology",
    example: "When evaluating [PERSON'S_ACTION], list 5 situational factors that could explain behavior.",
    score: 66
  },
  {
    id: 130,
    title: "Groupthink Prevention",
    description: "Maintain independent thinking in group settings",
    category: "Psychology",
    example: "In [GROUP_DECISION], assign devil's advocate role. Seek outside perspectives.",
    score: 65
  },
  {
    id: 131,
    title: "Halo Effect Correction",
    description: "Prevent single positive trait from biasing overall judgment",
    category: "Psychology",
    example: "When evaluating [COMPLEX_ENTITY], rate each dimension independently before overall judgment.",
    score: 64
  },
  {
    id: 132,
    title: "Loss Aversion Understanding",
    description: "Recognize greater psychological impact of losses vs gains",
    category: "Psychology",
    example: "For [RISK_DECISION], frame in terms of gains and losses. How does framing affect choice?",
    score: 63
  },
  {
    id: 133,
    title: "Mental Accounting Awareness",
    description: "Recognize how money categorization affects spending decisions",
    category: "Psychology",
    example: "How does mental accounting affect your evaluation of [FINANCIAL_DECISION]? Consider fungibility.",
    score: 62
  },
  {
    id: 134,
    title: "Endowment Effect Recognition",
    description: "Account for tendency to overvalue owned items",
    category: "Psychology",
    example: "For [OWNED_ITEM], estimate value as if you didn't own it. Compare to current valuation.",
    score: 61
  },
  {
    id: 135,
    title: "Status Quo Bias Counteraction",
    description: "Question default options and current arrangements",
    category: "Psychology",
    example: "For [CURRENT_SITUATION], question why it's the default. What alternatives exist?",
    score: 60
  },
  
  // Creative and Innovation Hacks (Score: 40-59)
  {
    id: 136,
    title: "Biomimicry Application",
    description: "Learn from nature's solutions to design problems",
    category: "Creativity",
    example: "How does nature solve [PROBLEM_TYPE]? Study 3 biological examples and extract principles.",
    score: 59
  },
  {
    id: 137,
    title: "Combinatorial Creativity",
    description: "Combine existing elements in novel ways",
    category: "Creativity",
    example: "List 10 elements related to [DOMAIN]. Create 20 novel combinations. Evaluate feasibility.",
    score: 58
  },
  {
    id: 138,
    title: "Constraint Addition",
    description: "Add artificial constraints to spark creativity",
    category: "Creativity",
    example: "Solve [PROBLEM] with these added constraints: [LIMIT_A], [LIMIT_B], [LIMIT_C].",
    score: 57
  },
  {
    id: 139,
    title: "Random Word Association",
    description: "Use random stimuli to trigger new connections",
    category: "Creativity",
    example: "Connect [RANDOM_WORD] to [CHALLENGE]. Find 5 different connection paths and explore each.",
    score: 56
  },
  {
    id: 140,
    title: "Anthropomorphization",
    description: "Give human characteristics to non-human entities",
    category: "Creativity",
    example: "If [SYSTEM/OBJECT] were a person, what would their personality be? How would they behave?",
    score: 55
  },
  {
    id: 141,
    title: "Scale Transformation",
    description: "Change size dramatically to find new perspectives",
    category: "Creativity",
    example: "If [OBJECT] were 1000x larger/smaller, how would it function? What new possibilities emerge?",
    score: 54
  },
  {
    id: 142,
    title: "Time Displacement",
    description: "Move concepts through different time periods",
    category: "Creativity",
    example: "How would [MODERN_CONCEPT] work in medieval times? Victorian era? Year 3000?",
    score: 53
  },
  {
    id: 143,
    title: "Material Transformation",
    description: "Change materials while keeping function",
    category: "Creativity",
    example: "If [OBJECT] were made of [UNUSUAL_MATERIAL], how would design change to maintain function?",
    score: 52
  },
  {
    id: 144,
    title: "Purpose Inversion",
    description: "Design for opposite of intended purpose",
    category: "Creativity",
    example: "Design [PRODUCT] to achieve the opposite of its normal purpose. What insights emerge?",
    score: 51
  },
  {
    id: 145,
    title: "Sensory Substitution",
    description: "Replace one sense with another in design",
    category: "Creativity",
    example: "If users couldn't see [INTERFACE], how would you convey information through other senses?",
    score: 50
  },
  {
    id: 146,
    title: "Cultural Translation",
    description: "Adapt concepts across cultural contexts",
    category: "Creativity",
    example: "How would [CONCEPT] be expressed in 5 different cultures? What universal elements remain?",
    score: 49
  },
  {
    id: 147,
    title: "Genre Blending",
    description: "Combine elements from different genres or categories",
    category: "Creativity",
    example: "Blend [GENRE_A] with [GENRE_B] for [PROJECT]. What unique hybrid characteristics emerge?",
    score: 48
  },
  {
    id: 148,
    title: "Metaphor Mining",
    description: "Extract insights from extended metaphors",
    category: "Creativity",
    example: "If [BUSINESS] were a living organism, what would its organs be? How would it evolve?",
    score: 47
  },
  {
    id: 149,
    title: "Reverse Engineering",
    description: "Work backwards from desired outcomes",
    category: "Strategy",
    example: "Start with perfect [OUTCOME]. Work backwards to identify required conditions and steps.",
    score: 46
  },
  {
    id: 150,
    title: "Edge Case Exploration",
    description: "Focus on extreme or unusual scenarios",
    category: "Strategy",
    example: "For [SYSTEM], explore behavior at extreme values: 0%, 100%, negative, infinite inputs.",
    score: 45
  },
  {
    id: 151,
    title: "Modularity Decomposition",
    description: "Break systems into interchangeable components",
    category: "Strategy",
    example: "Decompose [COMPLEX_SYSTEM] into modular components. How can modules be recombined?",
    score: 44
  },
  {
    id: 152,
    title: "Interface Redesign",
    description: "Reimagine how components connect and interact",
    category: "Strategy",
    example: "Redesign all interfaces in [SYSTEM]. How would different connection methods change behavior?",
    score: 43
  },
  {
    id: 153,
    title: "Bottleneck Analysis",
    description: "Identify and address system constraints",
    category: "Strategy",
    example: "Map all bottlenecks in [PROCESS]. Which constraint, if removed, would most improve flow?",
    score: 42
  },
  {
    id: 154,
    title: "Redundancy Elimination",
    description: "Remove unnecessary duplication while preserving function",
    category: "Strategy",
    example: "Identify all redundancies in [SYSTEM]. Which can be eliminated without losing resilience?",
    score: 41
  },
  {
    id: 155,
    title: "Value Stream Optimization",
    description: "Maximize value-add while minimizing waste",
    category: "Strategy",
    example: "Map value stream for [PROCESS]. Identify waste, bottlenecks, and optimization opportunities.",
    score: 40
  },
  
  // Analytical and Critical Thinking (Score: 20-39)
  {
    id: 156,
    title: "Root Cause Drilling",
    description: "Dig deeper than surface symptoms",
    category: "Analysis",
    example: "For [PROBLEM], list symptoms, immediate causes, and root causes. Address root, not symptoms.",
    score: 39
  },
  {
    id: 157,
    title: "Evidence Evaluation",
    description: "Assess quality and reliability of information",
    category: "Analysis",
    example: "For [CLAIM], evaluate evidence quality: source credibility, sample size, methodology, bias.",
    score: 38
  },
  {
    id: 158,
    title: "Logical Fallacy Detection",
    description: "Identify flawed reasoning patterns",
    category: "Analysis",
    example: "Analyze [ARGUMENT] for logical fallacies: ad hominem, straw man, false dichotomy, etc.",
    score: 37
  },
  {
    id: 159,
    title: "Correlation vs Causation",
    description: "Distinguish between correlation and causal relationships",
    category: "Analysis",
    example: "For correlation between [A] and [B], list alternative explanations beyond [A] causes [B].",
    score: 36
  },
  {
    id: 160,
    title: "Sample Size Sensitivity",
    description: "Understand how sample size affects conclusion validity",
    category: "Analysis",
    example: "How would conclusions about [PHENOMENON] change with samples of 10, 100, 1000, 10000?",
    score: 35
  },
  {
    id: 161,
    title: "Selection Bias Recognition",
    description: "Identify when samples don't represent populations",
    category: "Analysis",
    example: "What selection biases might affect data about [POPULATION]? How to correct for them?",
    score: 34
  },
  {
    id: 162,
    title: "Survivorship Bias Awareness",
    description: "Account for missing data from failures",
    category: "Analysis",
    example: "When studying [SUCCESS_CASES], what failure cases are invisible? How does this skew analysis?",
    score: 33
  },
  {
    id: 163,
    title: "Cherry Picking Detection",
    description: "Identify selective presentation of supporting evidence",
    category: "Analysis",
    example: "For [POSITION], what contradictory evidence might be omitted? Seek complete picture.",
    score: 32
  },
  {
    id: 164,
    title: "False Precision Recognition",
    description: "Identify inappropriate levels of measurement precision",
    category: "Analysis",
    example: "Is precision level in [MEASUREMENT] justified by data quality and uncertainty?",
    score: 31
  },
  {
    id: 165,
    title: "Regression to Mean",
    description: "Expect extreme values to become more moderate",
    category: "Analysis",
    example: "After extreme [PERFORMANCE], expect regression to mean. Don't over-attribute causes.",
    score: 30
  },
  {
    id: 166,
    title: "Simpson's Paradox Awareness",
    description: "Recognize when aggregated data reverses subgroup trends",
    category: "Analysis",
    example: "Does [AGGREGATE_TREND] hold when data is broken down by relevant subgroups?",
    score: 29
  },
  {
    id: 167,
    title: "Confounding Variable Control",
    description: "Identify variables that might explain relationships",
    category: "Analysis",
    example: "What third variables might explain relationship between [X] and [Y]? Control for them.",
    score: 28
  },
  {
    id: 168,
    title: "Temporal Precedence Verification",
    description: "Ensure causes precede effects in time",
    category: "Analysis",
    example: "For causal claim [A] causes [B], verify [A] occurs before [B] in time sequence.",
    score: 27
  },
  {
    id: 169,
    title: "Mechanism Identification",
    description: "Understand how causes produce effects",
    category: "Analysis",
    example: "If [A] causes [B], what's the mechanism? Trace intermediate steps in causal chain.",
    score: 26
  },
  {
    id: 170,
    title: "Dose-Response Assessment",
    description: "Check if effect magnitude relates to cause intensity",
    category: "Analysis",
    example: "Does more [CAUSE] lead to proportionally more [EFFECT]? What's the relationship shape?",
    score: 25
  },
  {
    id: 171,
    title: "Replication Requirement",
    description: "Demand reproducible results across contexts",
    category: "Analysis",
    example: "Has [FINDING] been replicated in different populations, settings, and time periods?",
    score: 24
  },
  {
    id: 172,
    title: "Alternative Hypothesis Generation",
    description: "Create competing explanations for phenomena",
    category: "Analysis",
    example: "Generate 5 alternative hypotheses for [OBSERVATION]. How would you test each?",
    score: 23
  },
  {
    id: 173,
    title: "Null Hypothesis Consideration",
    description: "Consider possibility of no effect or relationship",
    category: "Analysis",
    example: "What if there's actually no relationship between [A] and [B]? How likely is null hypothesis?",
    score: 22
  },
  {
    id: 174,
    title: "Effect Size Evaluation",
    description: "Assess practical significance beyond statistical significance",
    category: "Analysis",
    example: "Is effect size of [DIFFERENCE] practically meaningful, or just statistically significant?",
    score: 21
  },
  {
    id: 175,
    title: "Confidence Interval Interpretation",
    description: "Understand uncertainty ranges around estimates",
    category: "Analysis",
    example: "For [ESTIMATE], what's the confidence interval? How does uncertainty affect conclusions?",
    score: 20
  },
  
  // Communication and Presentation (Score: 10-19)
  {
    id: 176,
    title: "Audience Adaptation",
    description: "Tailor message to specific audience needs",
    category: "Strategy",
    example: "Adapt [TECHNICAL_CONCEPT] for audiences: children, executives, experts, general public.",
    score: 19
  },
  {
    id: 177,
    title: "Narrative Structure",
    description: "Organize information as compelling story",
    category: "Creativity",
    example: "Structure [DATA/FINDINGS] as story with setup, conflict, resolution, and lesson learned.",
    score: 18
  },
  {
    id: 178,
    title: "Analogy Construction",
    description: "Explain complex concepts through familiar comparisons",
    category: "Creativity",
    example: "Explain [COMPLEX_SYSTEM] using analogies from cooking, sports, and family dynamics.",
    score: 17
  },
  {
    id: 179,
    title: "Visual Hierarchy Design",
    description: "Organize information by importance and attention flow",
    category: "Strategy",
    example: "Design visual hierarchy for [INFORMATION_SET]. What should draw attention first, second, third?",
    score: 16
  },
  {
    id: 180,
    title: "Cognitive Load Management",
    description: "Present information to minimize mental effort",
    category: "Psychology",
    example: "Reduce cognitive load in [COMPLEX_EXPLANATION]. Chunk information and sequence logically.",
    score: 15
  },
  {
    id: 181,
    title: "Emotional Resonance Creation",
    description: "Connect information to audience emotions",
    category: "Psychology",
    example: "Connect [ABSTRACT_CONCEPT] to emotions through personal stories and concrete examples.",
    score: 14
  },
  {
    id: 182,
    title: "Objection Anticipation",
    description: "Address likely counterarguments preemptively",
    category: "Strategy",
    example: "For [PROPOSAL], list 5 likely objections and address each before they're raised.",
    score: 13
  },
  {
    id: 183,
    title: "Evidence Hierarchization",
    description: "Present evidence in order of strength and relevance",
    category: "Strategy",
    example: "Rank evidence for [POSITION] by strength. Lead with strongest, acknowledge limitations.",
    score: 12
  },
  {
    id: 184,
    title: "Call to Action Optimization",
    description: "Make desired actions clear and achievable",
    category: "Strategy",
    example: "For [PRESENTATION], define specific, actionable next steps audience should take.",
    score: 11
  },
  {
    id: 185,
    title: "Repetition Strategy",
    description: "Reinforce key messages through strategic repetition",
    category: "Strategy",
    example: "Identify 3 key messages in [COMMUNICATION]. How will you repeat each without redundancy?",
    score: 10
  },
  
  // Basic Problem-Solving Tools (Score: 1-9)
  {
    id: 186,
    title: "Problem Definition Clarification",
    description: "Clearly articulate what needs to be solved",
    category: "Strategy",
    example: "Write problem statement for [SITUATION]. Make it specific, measurable, and actionable.",
    score: 9
  },
  {
    id: 187,
    title: "Goal Setting Precision",
    description: "Define clear, measurable objectives",
    category: "Strategy",
    example: "Convert [VAGUE_GOAL] into SMART goal: Specific, Measurable, Achievable, Relevant, Time-bound.",
    score: 8
  },
  {
    id: 188,
    title: "Resource Inventory",
    description: "Catalog available assets and capabilities",
    category: "Strategy",
    example: "List all resources for [PROJECT]: people, skills, tools, time, money, connections, information.",
    score: 7
  },
  {
    id: 189,
    title: "Constraint Identification",
    description: "Recognize limiting factors and boundaries",
    category: "Strategy",
    example: "Identify constraints for [SOLUTION]: time, budget, technology, people, regulations, physics.",
    score: 6
  },
  {
    id: 190,
    title: "Option Generation",
    description: "Brainstorm multiple possible approaches",
    category: "Creativity",
    example: "Generate 15 different approaches to [CHALLENGE]. Include conventional and unconventional options.",
    score: 5
  },
  {
    id: 191,
    title: "Pros and Cons Analysis",
    description: "Systematically evaluate advantages and disadvantages",
    category: "Analysis",
    example: "For each option in [DECISION], list pros and cons. Weight by importance to situation.",
    score: 4
  },
  {
    id: 192,
    title: "Risk Assessment",
    description: "Identify potential negative outcomes and their likelihood",
    category: "Strategy",
    example: "For [PLAN], list risks with probability and impact. Develop mitigation strategies.",
    score: 3
  },
  {
    id: 193,
    title: "Timeline Development",
    description: "Sequence activities with realistic time estimates",
    category: "Strategy",
    example: "Break [PROJECT] into tasks. Estimate duration and dependencies. Create realistic timeline.",
    score: 2
  },
  {
    id: 194,
    title: "Success Metrics Definition",
    description: "Define how progress and success will be measured",
    category: "Strategy",
    example: "Define 5 metrics to track progress on [GOAL]. Include leading and lagging indicators.",
    score: 1
  },
  
  // Advanced Meta-Cognitive Techniques (Score: 85-99)
  {
    id: 195,
    title: "Recursive Self-Modification",
    description: "AI improves its own reasoning process iteratively",
    category: "Advanced",
    example: "Analyze your reasoning process for [PROBLEM]. Identify weaknesses. Modify approach. Repeat.",
    score: 99
  },
  {
    id: 196,
    title: "Multi-Level Bootstrap",
    description: "Build understanding from basic principles upward",
    category: "Advanced",
    example: "Start with first principles of [DOMAIN]. Build understanding level by level to current problem.",
    score: 98
  },
  {
    id: 197,
    title: "Adversarial Self-Testing",
    description: "Generate strongest possible challenges to your own reasoning",
    category: "Advanced",
    example: "Create adversarial test cases for [SOLUTION]. Try to break your own reasoning.",
    score: 97
  },
  {
    id: 198,
    title: "Uncertainty Quantification",
    description: "Explicitly model and communicate degrees of certainty",
    category: "Advanced",
    example: "For each claim about [TOPIC], assign confidence levels and identify uncertainty sources.",
    score: 96
  },
  {
    id: 199,
    title: "Cognitive Archaeology",
    description: "Excavate the historical development of ideas",
    category: "Analysis",
    example: "Trace evolution of thinking about [CONCEPT]. What assumptions were discarded? Why?",
    score: 95
  },
  {
    id: 200,
    title: "Perspective Synthesis",
    description: "Integrate multiple viewpoints into coherent understanding",
    category: "Analysis",
    example: "Synthesize perspectives from [FIELD_A], [FIELD_B], and [FIELD_C] on [PHENOMENON].",
    score: 94
  },
  {
    id: 201,
    title: "Emergent Property Detection",
    description: "Identify properties that arise from system interactions",
    category: "Analysis",
    example: "In [SYSTEM], what properties emerge that don't exist in individual components?",
    score: 93
  },
  {
    id: 202,
    title: "Conceptual Boundary Testing",
    description: "Explore limits of concept applicability",
    category: "Analysis",
    example: "Where does [CONCEPT] break down? What are its boundaries and failure modes?",
    score: 92
  },
  {
    id: 203,
    title: "Paradigm Shifting",
    description: "Adopt fundamentally different ways of thinking",
    category: "Strategy",
    example: "View [PROBLEM] through paradigms of: mechanistic, organic, quantum, informational thinking.",
    score: 91
  },
  {
    id: 204,
    title: "Information Integration Hierarchy",
    description: "Combine information sources with appropriate weighting",
    category: "Strategy",
    example: "Integrate evidence about [QUESTION] from: studies, experts, theory, experience. Weight appropriately.",
    score: 90
  },
  {
    id: 205,
    title: "Cognitive Bias Portfolio Management",
    description: "Use beneficial biases while mitigating harmful ones",
    category: "Psychology",
    example: "For [DECISION], which biases help? Which hurt? Design process to optimize bias portfolio.",
    score: 89
  },
  {
    id: 206,
    title: "Temporal Reasoning Optimization",
    description: "Balance different time horizons in decision-making",
    category: "Strategy",
    example: "Balance immediate, short-term, and long-term considerations in [CHOICE]. Optimize across time.",
    score: 88
  },
  {
    id: 207,
    title: "Complexity Gradient Navigation",
    description: "Move systematically from simple to complex understanding",
    category: "Strategy",
    example: "Create learning path for [COMPLEX_TOPIC] from simplest to most sophisticated understanding.",
    score: 87
  },
  {
    id: 208,
    title: "Cross-Domain Pattern Matching",
    description: "Find similar patterns across different fields",
    category: "Analysis",
    example: "What patterns from [DOMAIN_A] match phenomena in [DOMAIN_B]? Transfer insights.",
    score: 86
  },
  {
    id: 209,
    title: "Recursive Question Generation",
    description: "Generate questions about your questions",
    category: "Analysis",
    example: "For question about [TOPIC], ask: Why this question? What assumptions? What other questions?",
    score: 85
  },
  
  // System Thinking Advanced (Score: 80-89)
  {
    id: 210,
    title: "Causal Loop Mapping",
    description: "Identify reinforcing and balancing feedback loops",
    category: "Strategy",
    example: "Map causal loops in [SYSTEM]. Identify reinforcing loops (growth/decline) and balancing loops (stability).",
    score: 84
  },
  {
    id: 211,
    title: "Leverage Point Analysis",
    description: "Find high-impact intervention opportunities",
    category: "Strategy",
    example: "In [SYSTEM], rank intervention points by leverage: parameters, structures, paradigms, purpose.",
    score: 83
  },
  {
    id: 212,
    title: "Systems Archetype Recognition",
    description: "Identify common patterns of problematic behavior",
    category: "Strategy",
    example: "Does [SITUATION] match systems archetypes: limits to growth, shifting burden, tragedy of commons?",
    score: 82
  },
  {
    id: 213,
    title: "Stock and Flow Analysis",
    description: "Distinguish between accumulations and rates of change",
    category: "Analysis",
    example: "In [SYSTEM], identify stocks (accumulations) and flows (rates). How do flows affect stock levels?",
    score: 81
  },
  {
    id: 214,
    title: "Delay Recognition",
    description: "Account for time delays between causes and effects",
    category: "Analysis",
    example: "What delays exist between actions and results in [SYSTEM]? How do delays affect behavior?",
    score: 80
  },
  {
    id: 215,
    title: "Nonlinearity Appreciation",
    description: "Understand how small changes can have large effects",
    category: "Analysis",
    example: "Where are nonlinear relationships in [SYSTEM]? What small changes could have large impacts?",
    score: 79
  },
  {
    id: 216,
    title: "Purpose Hierarchy Exploration",
    description: "Understand system purpose at multiple levels",
    category: "Analysis",
    example: "What's the purpose of [SYSTEM] at tactical, strategic, and existential levels?",
    score: 78
  },
  {
    id: 217,
    title: "Boundary Critique",
    description: "Question how system boundaries are drawn",
    category: "Analysis",
    example: "How are [SYSTEM] boundaries defined? What happens if you redraw them larger/smaller?",
    score: 77
  },
  {
    id: 218,
    title: "Mental Model Surfacing",
    description: "Make implicit assumptions about systems explicit",
    category: "Analysis",
    example: "What mental models underlie thinking about [SYSTEM]? How do different models change understanding?",
    score: 76
  },
  {
    id: 219,
    title: "Hierarchy Understanding",
    description: "Grasp relationships between system levels",
    category: "Analysis",
    example: "Map hierarchy of [SYSTEM]: sub-systems, system, supra-system. How do levels interact?",
    score: 75
  },
  {
    id: 220,
    title: "System Structure Focus",
    description: "Look beyond events to underlying structures",
    category: "Analysis",
    example: "Instead of focusing on [EVENTS], examine structures that create these patterns.",
    score: 74
  },
  
  // Communication Mastery (Score: 70-79)
  {
    id: 221,
    title: "Semantic Precision Optimization",
    description: "Choose words for maximum clarity and minimum ambiguity",
    category: "Strategy",
    example: "Optimize word choice in [MESSAGE]. Eliminate ambiguity while preserving meaning richness.",
    score: 73
  },
  {
    id: 222,
    title: "Context Sensitivity Calibration",
    description: "Adjust communication style to situational demands",
    category: "Strategy",
    example: "Calibrate [MESSAGE] for context: formal/informal, high/low stakes, expert/novice audience.",
    score: 72
  },
  {
    id: 223,
    title: "Inference Invitation Design",
    description: "Structure information so audience draws intended conclusions",
    category: "Psychology",
    example: "Design [PRESENTATION] so audience infers [CONCLUSION] rather than stating it directly.",
    score: 71
  },
  {
    id: 224,
    title: "Attention Architecture Engineering",
    description: "Structure information flow to optimize attention allocation",
    category: "Psychology",
    example: "Engineer attention flow in [CONTENT]. When to focus, when to relax, how to guide transitions?",
    score: 70
  },
  
  // Learning and Development (Score: 65-74)
  {
    id: 225,
    title: "Spaced Repetition Optimization",
    description: "Time review intervals for optimal retention",
    category: "Psychology",
    example: "Design review schedule for [LEARNING_MATERIAL]. Optimize intervals based on forgetting curve.",
    score: 69
  },
  {
    id: 226,
    title: "Interleaving Strategy",
    description: "Mix different types of practice for better learning",
    category: "Strategy",
    example: "Instead of blocked practice of [SKILL], interleave with related skills for better transfer.",
    score: 68
  },
  {
    id: 227,
    title: "Desirable Difficulty Calibration",
    description: "Optimize challenge level for maximum learning",
    category: "Psychology",
    example: "Calibrate difficulty of [LEARNING_TASK]. Too easy = no growth, too hard = overwhelm.",
    score: 67
  },
  {
    id: 228,
    title: "Generation Effect Utilization",
    description: "Learn by generating rather than just recognizing",
    category: "Psychology",
    example: "Instead of reading about [CONCEPT], generate examples, explanations, and applications.",
    score: 66
  },
  {
    id: 229,
    title: "Elaborative Interrogation",
    description: "Deepen understanding through systematic questioning",
    category: "Analysis",
    example: "For each fact about [TOPIC], ask: Why is this true? What are the implications?",
    score: 65
  },
  
  // Decision Making Excellence (Score: 55-64)
  {
    id: 230,
    title: "Decision Tree Construction",
    description: "Map decision branches and probability outcomes",
    category: "Strategy",
    example: "Build decision tree for [CHOICE]. Include probabilities, outcomes, and expected values.",
    score: 64
  },
  {
    id: 231,
    title: "Opportunity Cost Analysis",
    description: "Consider value of best alternative foregone",
    category: "Strategy",
    example: "For [DECISION], what's the opportunity cost? What's the value of the best alternative?",
    score: 63
  },
  {
    id: 232,
    title: "Reversibility Testing",
    description: "Consider whether decisions can be undone",
    category: "Strategy",
    example: "Is [DECISION] reversible? If not, require higher confidence. If yes, bias toward action.",
    score: 62
  },
  {
    id: 233,
    title: "Regret Minimization Framework",
    description: "Choose options that minimize future regret",
    category: "Psychology",
    example: "For [CHOICE], imagine yourself at 80. Which option would minimize regret?",
    score: 61
  },
  {
    id: 234,
    title: "Pre-mortem Analysis",
    description: "Imagine failure and work backwards to causes",
    category: "Strategy",
    example: "Imagine [PLAN] failed spectacularly. What went wrong? How to prevent each failure mode?",
    score: 60
  },
  {
    id: 235,
    title: "Outside View Application",
    description: "Use reference class forecasting for predictions",
    category: "Strategy",
    example: "For [PROJECT], find reference class of similar projects. What's typical outcome distribution?",
    score: 59
  },
  {
    id: 236,
    title: "Satisficing vs Optimizing",
    description: "Know when good enough is better than perfect",
    category: "Strategy",
    example: "For [DECISION], is this an optimize situation or satisfice? Set appropriate decision criteria.",
    score: 58
  },
  {
    id: 237,
    title: "Time Horizon Matching",
    description: "Match decision process complexity to decision importance",
    category: "Strategy",
    example: "Match analysis depth to [DECISION] importance and reversibility. Don't over-analyze small choices.",
    score: 57
  },
  {
    id: 238,
    title: "Option Value Recognition",
    description: "Understand value of keeping options open",
    category: "Strategy",
    example: "What's the value of flexibility in [SITUATION]? How much to pay to keep options open?",
    score: 56
  },
  {
    id: 239,
    title: "Commitment Device Design",
    description: "Create structures that enforce future compliance",
    category: "Psychology",
    example: "Design commitment device for [GOAL]. Make future deviation costly or impossible.",
    score: 55
  },
  
  // Innovation and Creativity Advanced (Score: 45-54)
  {
    id: 240,
    title: "Serendipity Engineering",
    description: "Create conditions for fortunate accidents",
    category: "Creativity",
    example: "Design environment around [PROJECT] to increase serendipitous discoveries. Mix unrelated elements.",
    score: 54
  },
  {
    id: 241,
    title: "Constraint Relaxation Sequence",
    description: "Remove limitations systematically to explore possibilities",
    category: "Creativity",
    example: "List constraints on [SOLUTION]. Remove them one by one. What becomes possible at each step?",
    score: 53
  },
  {
    id: 242,
    title: "Adjacent Possible Exploration",
    description: "Explore what's just beyond current capabilities",
    category: "Strategy",
    example: "Map adjacent possible around [CURRENT_STATE]. What's one step away but not yet explored?",
    score: 52
  },
  {
    id: 243,
    title: "Weak Signal Amplification",
    description: "Pay attention to subtle indicators of change",
    category: "Strategy",
    example: "What weak signals around [DOMAIN] might indicate major future changes? Amplify and explore.",
    score: 51
  },
  {
    id: 244,
    title: "Cross-Pollination Design",
    description: "Deliberately mix unrelated domains",
    category: "Creativity",
    example: "Mix insights from [DOMAIN_A], [DOMAIN_B], and [DOMAIN_C]. What hybrid solutions emerge?",
    score: 50
  },
  {
    id: 245,
    title: "Assumption Inversion Testing",
    description: "Flip fundamental assumptions to generate alternatives",
    category: "Creativity",
    example: "List core assumptions about [PROBLEM]. Invert each. What solutions become possible?",
    score: 49
  },
  {
    id: 246,
    title: "Function Follows Form Reversal",
    description: "Start with form constraints and discover functions",
    category: "Creativity",
    example: "Instead of designing form for [FUNCTION], start with [FORM_CONSTRAINT] and discover new functions.",
    score: 48
  },
  {
    id: 247,
    title: "Minimum Viable Paradox",
    description: "Find smallest contradiction that generates insight",
    category: "Analysis",
    example: "What's the smallest paradox in [DOMAIN] that, if resolved, would unlock major understanding?",
    score: 47
  },
  {
    id: 248,
    title: "Capability Synthesis",
    description: "Combine existing capabilities in novel ways",
    category: "Strategy",
    example: "List all capabilities in [ORGANIZATION]. What novel combinations could create new value?",
    score: 46
  },
  {
    id: 249,
    title: "Edge Case Generalization",
    description: "Turn exceptions into new principles",
    category: "Strategy",
    example: "Find edge cases in [SYSTEM]. What if these exceptions became the new normal?",
    score: 45
  },
  {
    id: 250,
    title: "Meta-Learning Optimization",
    description: "Learn how to learn more effectively",
    category: "Psychology",
    example: "Analyze your learning process for [SKILL]. How can you optimize the learning of learning itself?",
    score: 44
  }
];

export const categories = Array.from(new Set(hackPrompts.map(prompt => prompt.category))).sort();