import React, { useState, useRef, MouseEvent } from 'react';

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientColor?: string;
  gradientSize?: number;
  gradientOpacity?: number;
}

export const MagicCard: React.FC<MagicCardProps> = ({
  children,
  className = '',
  gradientColor = '#6366F1',
  gradientSize = 250,
  gradientOpacity = 0.12,
}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(gradientOpacity);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all duration-200 ${className}`}
    >
      {/* Radial Spotlight Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 80%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};
