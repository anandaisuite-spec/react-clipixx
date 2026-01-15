import { motion } from 'framer-motion';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'relative font-medium tracking-wide uppercase transition-all duration-300 rounded-full';

  const variants = {
    primary: 'bg-white text-dark-950 hover:bg-white/90',
    secondary: 'bg-primary-600 text-white hover:bg-primary-500',
    outline: 'bg-transparent border-2 border-white/30 text-white hover:border-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-4 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
