import React from "react";
import Card from "./components/Card";

const App: React.FC = () => {
  return (
    <main className="cards-container">
      <Card
        title="Neural Pathway Reconstruction"
        score="97.3"
        promptBlueprint="Reconstructs multi-agent cognitive reasoning pathways for improved model synthesis."
        methodInsight="Uses chained contextual analysis and pattern memory prompts to simulate continuous awareness."
        tags={["Expert", "LLM", "Optimization"]}
      />

      <Card
        title="Dynamic Chain Injection"
        score="89.6"
        promptBlueprint="Injects context dynamically mid-generation to increase coherence and recall."
        methodInsight="Balances temperature with context depth for modular agent reasoning."
        tags={["Pro", "Prompt Flow", "Adaptive"]}
      />
    </main>
  );
};

export default App;
