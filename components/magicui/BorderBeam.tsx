import React from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = '#6366F1',
  colorTo = '#10B981',
  borderWidth = 1.5,
}) => {
  return (
    <div
      aria-hidden="true"
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--anchor': '90deg',
          '--border-width': `${borderWidth}px`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className}`}
    >
      <div
        className="absolute aspect-square w-[var(--size)] bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent animate-border-beam"
        style={{
          offsetPath: 'rect(0 auto auto 0 round var(--size))',
        }}
      />
    </div>
  );
};
