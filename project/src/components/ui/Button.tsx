import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'relative font-medium tracking-wide uppercase transition-all duration-300 rounded-full';

  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-dark-950 dark:hover:bg-white/90',
    secondary: 'bg-primary-600 text-white hover:bg-primary-500',
    outline: 'bg-transparent border-2 border-gray-900/30 text-gray-900 hover:border-gray-900 hover:bg-gray-900/5 dark:border-white/30 dark:text-white dark:hover:border-white dark:hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-4 text-base',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
