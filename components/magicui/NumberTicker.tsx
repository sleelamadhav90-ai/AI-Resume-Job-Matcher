import React, { useEffect, useState } from 'react';

interface NumberTickerProps {
  value: number;
  className?: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  className = '',
  duration = 800,
  suffix = '',
  prefix = '',
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = 0;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Cubic ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + easedProgress * (endValue - startValue));
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const handle = requestAnimationFrame(step);
    return () => cancelAnimationFrame(handle);
  }, [value, duration]);

  return (
    <span className={`font-mono font-black ${className}`}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};
