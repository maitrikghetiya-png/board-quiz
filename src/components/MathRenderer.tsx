import React from 'react';

interface MathRendererProps {
  text: string;
  className?: string;
}

/**
 * Premium typographic renderer for mathematical equations, chemical formulas,
 * superscripts, subscripts, Greek constants, and physical units.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Render tokens cleanly
  const renderFormattedTokens = (rawText: string) => {
    // Regular expression matching:
    // 1. Superscripts with ^ such as x^2, 10^-7, A^(1/3), (d/2)/4, K_max, etc.
    // 2. Subscripts like E_cell, E°_cell, μ_0, ε_0, B_0, λ_max, H_2O, etc.
    // 3. Greek symbols and math constants
    // 4. Fractions like a/b in parentheses or simple terms
    const tokens = rawText.split(/(\^[0-9A-Za-z\-+/*()]+\b|\b[A-Za-z0-9°]+_[0-9A-Za-z()]+|\b[0-9]+(?:\.[0-9]+)?\s*×\s*10\^[-+]?[0-9]+)/g);

    return tokens.map((part, index) => {
      // Handle powers e.g. ^2, ^(-7), ^(1/3)
      if (part.startsWith('^')) {
        const cleanPower = part.substring(1).replace(/^\((.*)\)$/, '$1');
        return (
          <sup key={index} className="text-[0.72em] font-semibold tracking-tight text-slate-800 -top-1 relative inline-block mx-[0.5px]">
            {cleanPower}
          </sup>
        );
      }

      // Handle subscripts e.g. E_cell, E°_cathode, mu_0
      if (part.includes('_') && !part.includes(' ')) {
        const [base, sub] = part.split('_');
        const cleanSub = sub.replace(/^\((.*)\)$/, '$1');
        return (
          <span key={index} className="inline-block whitespace-nowrap">
            {base}
            <sub className="text-[0.72em] font-medium tracking-tight text-slate-700 bottom-[-0.2em] relative inline-block mx-[0.5px]">
              {cleanSub}
            </sub>
          </span>
        );
      }

      // Handle standard text
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <span className={`inline leading-relaxed text-slate-900 ${className}`}>
      {renderFormattedTokens(text)}
    </span>
  );
};
