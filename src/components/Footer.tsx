import React from 'react';

interface FooterProps {
  className?: string;
}

/**
 * Standard professional footer for Board Quiz.
 * Displays the required authorship attribution:
 * "Made by Maitrik Ghetiya"
 * "Quad AI School of Tech"
 */
export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`border-t border-[#292D35] bg-[#111318] text-white py-8 mt-12 text-center ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
        <p className="text-sm font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
          <span>Made by</span>
          <span className="text-[#FFD43B] font-extrabold">Maitrik Ghetiya</span>
        </p>
        <p className="text-xs font-medium text-slate-400 tracking-wide">
          Quad AI School of Technology
        </p>
        <div className="pt-2 text-[11px] text-slate-500">
          <span>Board Quiz • CBSE Class 12 Preparation Portal</span>
        </div>
      </div>
    </footer>
  );
};
