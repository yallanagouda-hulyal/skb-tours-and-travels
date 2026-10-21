import React from 'react';
import './GlassCard.css';

export default function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  onClick,
  ...props
}) {
  return (
    <div
      className={`glass-card ${hoverEffect ? 'glass-hover' : ''} ${glow ? 'glass-glow' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
