
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const baseStyles = 'w-full h-16 flex items-center justify-center text-xl font-bold rounded-lg shadow-md transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-blue-700',
    secondary: 'bg-secondary text-white hover:bg-emerald-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-primary border-2 border-primary hover:bg-blue-50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
   