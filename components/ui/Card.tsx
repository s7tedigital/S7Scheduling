
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const cursorClass = onClick ? 'cursor-pointer' : '';
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-950 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${cursorClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
