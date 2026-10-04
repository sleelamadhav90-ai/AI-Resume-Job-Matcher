import React, { useEffect, useState } from 'react';

interface AnimatedCircularProgressBarProps {
  value: number;
  max?: number;
  min?: number;
  gaugePrimaryColor?: string;
  gaugeSecondaryColor?: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const AnimatedCircularProgressBar: React.FC<AnimatedCircularProgressBarProps> = ({
  value,
  max = 100,
  min = 0,
  gaugePrimaryColor = '#4F46E5',
  gaugeSecondaryColor = '#E2E8F0',
  className = '',
  size = 72,
  strokeWidth = 6,
  label,
}) => {
  const [animatedValue, setAnimatedValue] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 800;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(Math.round(easedProgress * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const handle = requestAnimationFrame(step);
    return () => cancelAnimationFrame(handle);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedValue = Math.min(Math.max(animatedValue, min), max);
  const strokeDashoffset = circumference - (normalizedValue / max) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Secondary background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gaugeSecondaryColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Primary animated gauge circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gaugePrimaryColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
        <span className="font-mono font-black text-xs text-[#111827]">{animatedValue}%</span>
        {label && <span className="text-[9px] font-mono text-[#64748B] uppercase font-bold mt-0.5">{label}</span>}
      </div>
    </div>
  );
};
