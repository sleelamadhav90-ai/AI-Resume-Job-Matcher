import React from 'react';

const SIGNALS = [
  'JAVA',
  'SPRING BOOT',
  'REACT',
  'POSTGRESQL',
  'AWS',
  '3+ YEARS EXPERIENCE',
  'BTECH',
  'REST APIS',
  'KUBERNETES',
  'STRONG MATCH',
  'EVIDENCE VERIFIED',
  'DETERMINISTIC RUBRIC',
  // Duplicate for seamless infinite loop
  'JAVA',
  'SPRING BOOT',
  'REACT',
  'POSTGRESQL',
  'AWS',
  '3+ YEARS EXPERIENCE',
  'BTECH',
  'REST APIS',
  'KUBERNETES',
  'STRONG MATCH',
  'EVIDENCE VERIFIED',
  'DETERMINISTIC RUBRIC',
];

export const HiringSignalsMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-4 bg-[#F6F7F9] border-y border-[#E5E7EB] select-none">
      <div className="animate-marquee-signals flex items-center gap-6 whitespace-nowrap">
        {SIGNALS.map((sig, idx) => (
          <div key={idx} className="flex items-center gap-6 text-xs font-mono font-bold text-[#6B7280]">
            <span>{sig}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB]" />
          </div>
        ))}
      </div>
    </div>
  );
};
