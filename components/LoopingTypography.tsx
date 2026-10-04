import React from 'react';

const MARQUEE_ITEMS = [
  'AI MATCHING',
  'CANDIDATE INTELLIGENCE',
  'EVIDENCE-BASED HIRING',
  'DETERMINISTIC SCORING',
  'EXPLAINABLE RECRUITMENT',
  'FACT-GROUNDED VERIFICATION',
  'AI MATCHING',
  'CANDIDATE INTELLIGENCE',
  'EVIDENCE-BASED HIRING',
  'DETERMINISTIC SCORING',
  'EXPLAINABLE RECRUITMENT',
  'FACT-GROUNDED VERIFICATION',
];

export const LoopingTypography: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-3 border-y border-[#E5E7EB] bg-white select-none opacity-85">
      <div className="animate-marquee-slow flex items-center gap-8 whitespace-nowrap">
        {MARQUEE_ITEMS.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span
              className="text-xs sm:text-sm font-bold tracking-widest text-[#9CA3AF] uppercase font-mono hover:text-[#202124] transition-colors"
            >
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E83E8C]" />
          </div>
        ))}
      </div>
    </div>
  );
};
