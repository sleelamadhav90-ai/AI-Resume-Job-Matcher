import React from 'react';

interface ShimmerButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  onClick,
  className = '',
  shimmerColor = '#ffffff',
  shimmerSize = '0.08em',
  shimmerDuration = '3s',
  title,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      title={title}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-indigo-50 border border-indigo-200/90 text-indigo-700 font-extrabold text-xs px-3 py-1.5 cursor-pointer shadow-2xs hover:bg-indigo-100 transition-all group ${className}`}
    >
      {/* Shimmer reflection highlight line */}
      <span
        aria-hidden="true"
        className="absolute inset-0 z-10 block -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:animate-shimmer"
      />
      
      {/* Content */}
      <span className="relative z-20 inline-flex items-center gap-1">
        {children}
      </span>
    </button>
  );
};
