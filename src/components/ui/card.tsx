import React, { useState } from "react";
import "../assets/styles.css";

interface CardProps {
  title: string;
  score: string | number;
  promptBlueprint: string;
  methodInsight: string;
  tags?: string[];
}

const Card: React.FC<CardProps> = ({
  title,
  score,
  promptBlueprint,
  methodInsight,
  tags = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`card is-collapsible ${isOpen ? "is-open" : ""}`}
      aria-expanded={isOpen}
    >
      {/* HEADER */}
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <span className="num">{score}</span>
          <h3 className="card-title">{title}</h3>
        </div>

        {/* Expander Button */}
        <button
          className="btn-expander"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="expander" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
      </div>

      {/* CARD BODY */}
      <div className="card-body">
        <div className="card-section">
          <h4 className="card-section-title">Prompt Blueprint</h4>
          <p>{promptBlueprint}</p>
        </div>

        <hr className="divider" />

        <div className="card-section">
          <h4 className="card-section-title">Method Insight</h4>
          <p>{methodInsight}</p>
        </div>

        {tags.length > 0 && (
          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
            {tags.map((tag, i) => (
              <span key={i} className="chip">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
