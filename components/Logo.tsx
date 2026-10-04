import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const LogoSymbol: React.FC<{ size?: number; className?: string }> = ({ size = 22, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="HireMe AI Symbol"
    >
      {/* Crisp enterprise square with subtle radius */}
      <rect width="24" height="24" rx="6" fill="#174C4A" />
      
      {/* Clean talent lens node + matching checkmark */}
      <rect x="5.5" y="6" width="2.5" height="12" rx="1" fill="#FFFFFF" />
      <rect x="16" y="6" width="2.5" height="12" rx="1" fill="#FFFFFF" />
      <circle cx="12" cy="8.5" r="1.5" fill="#FFFFFF" />
      <path
        d="M7 12.5H11L13 14.5L17 10.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = ''
}) => {
  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <LogoSymbol size={size === 'sm' ? 20 : size === 'md' ? 24 : 28} />
      <div className="flex flex-col">
        {/* HireMe AI wordmark in Manrope SemiBold */}
        <div
          className={`font-brand font-semibold tracking-tight ${textSizes[size]} text-[#171817] leading-none flex items-baseline gap-1`}
          style={{ fontFamily: "'Manrope', 'Inter', sans-serif", fontWeight: 600 }}
        >
          <span>HireMe</span>
          <span className="text-[#174C4A] font-bold">AI</span>
        </div>
        {showTagline && (
          <span
            className="text-[10px] text-[#686A66] font-normal tracking-tight mt-0.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Find the right talent. Understand why.
          </span>
        )}
      </div>
    </div>
  );
};
