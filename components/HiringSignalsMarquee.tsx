import React from 'react';

interface Company {
  name: string;
  symbol: React.ReactNode;
}

const COMPANIES: Company[] = [
  {
    name: 'Google',
    symbol: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.94 5.94 0 0 1 8 12.5a5.94 5.94 0 0 1 5.991-6.014c1.55 0 2.902.573 3.945 1.503l3.076-3.076C19.167 3.23 16.74 2 13.991 2 8.47 2 4 6.47 4 12s4.47 10 9.991 10c5.783 0 9.61-4.06 9.61-9.78a9.1 9.1 0 0 0-.166-1.935H12.24z"/>
      </svg>
    )
  },
  {
    name: 'Microsoft',
    symbol: (
      <svg className="w-4 h-4" viewBox="0 0 23 23" fill="currentColor">
        <path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/>
      </svg>
    )
  },
  {
    name: 'Apple',
    symbol: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.74-1.2 1.88-1.05 2.99 1.12.09 2.26-.54 3-1.43z"/>
      </svg>
    )
  },
  {
    name: 'Meta',
    symbol: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2-2.67 4-4 6-4a4 4 0 1 1 0 8c-2 0-4-1.33-6-4z"/>
      </svg>
    )
  },
  {
    name: 'Stripe',
    symbol: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.93 10.09c0-1.25.96-1.77 2.47-1.77 1.76 0 3.73.57 5.05 1.31l.43-4.14C20.44 4.88 18.06 4.3 16.14 4.3c-4.62 0-7.79 2.37-7.79 6.84 0 6.06 7.94 5.09 7.94 7.73 0 1.46-1.12 1.96-2.82 1.96-2.14 0-4.32-.77-5.74-1.63l-.47 4.23c1.69.83 4.22 1.37 6.13 1.37 4.88 0 8.3-2.29 8.3-6.9 0-6.19-7.76-5.22-7.76-7.84z"/>
      </svg>
    )
  },
  {
    name: 'Amazon',
    symbol: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.23 15.65c-1.33.91-3.08 1.42-4.8 1.42-3.14 0-5.83-1.68-7.3-4.2l-1.3 1c1.86 3.1 5.24 5.2 9.17 5.2 2.1 0 4.23-.62 5.86-1.8l-1.63-1.62zm1.6-2.02l2.1-.2c-.32-1.36-.96-2.5-1.85-3.35l-1.4 1.5c.6.6 1 1.3 1.15 2.05zm-7.98-7.53c-2.3 0-4.16 1.43-4.16 3.76 0 2.06 1.45 3.23 3.65 3.23.94 0 1.9-.3 2.53-.8V9.16c-.63.43-1.47.66-2.2.66-1.24 0-1.87-.56-1.87-1.45 0-1 .85-1.56 2.3-1.56.76 0 1.34.13 1.77.3v-1c-.52-.3-1.25-.4-2.02-.4z"/>
      </svg>
    )
  },
  {
    name: 'Salesforce',
    symbol: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.4 11.2c0-2.4-1.9-4.3-4.3-4.3-.4 0-.8.1-1.1.2C12.3 5.3 10.4 4 8.2 4 5 4 2.4 6.5 2.4 9.7c0 .5.1 1 .2 1.4C1.1 12 0 13.5 0 15.2c0 2.5 2 4.6 4.5 4.6H18c3.3 0 6-2.7 6-6 0-3-2.2-5.4-5.6-5.6z"/>
      </svg>
    )
  },
  {
    name: 'Netflix',
    symbol: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2v20h4V12.7l8 9.3h4V2h-4v9.3L8 2H4z"/>
      </svg>
    )
  },
  {
    name: 'Slack',
    symbol: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.522 2.522H3.782a2.528 2.528 0 0 1-2.52-2.522V8.824a2.528 2.528 0 0 1 2.52-2.52h5.042zm10.135 3.782a2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.782a2.528 2.528 0 0 1 2.522-2.52H15.177a2.528 2.528 0 0 1 2.52 2.52v5.043zm-3.782 10.135a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z"/>
      </svg>
    )
  }
];

// Replicate arrays to enable clean continuous seamless infinite looping
const MARQUEE_ITEMS = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];

export const HiringSignalsMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-6 bg-[#FAF7F2] border-y border-[#E5E2DC] select-none">
      <div className="text-[10px] font-mono uppercase font-black tracking-widest text-[#525866]/70 text-center mb-5">
        TRUSTED BY LEADING ENTERPRISE & TECHNOLOGY TALENT TEAMS
      </div>
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        
        {/* Continuous animation tape */}
        <div className="animate-infinite-marquee flex items-center gap-14 sm:gap-20 whitespace-nowrap">
          {MARQUEE_ITEMS.map((company, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 text-[#525866] hover:text-[#0D3834] transition-all duration-150 cursor-pointer"
            >
              <span className="text-[#00A86B] opacity-80 shrink-0">{company.symbol}</span>
              <span className="font-brand uppercase tracking-wider text-[11px] font-extrabold">{company.name}</span>
            </div>
          ))}
        </div>

        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};
