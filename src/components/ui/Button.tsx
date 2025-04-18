import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  waveEffect?: boolean;
  animation?: 'wave' | 'ripple' | 'lift' | 'pulse-glow' | 'rotating-border' | 'none';
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  waveEffect = true,
  animation = 'wave',
}: ButtonProps) => {
  
  // Get animation classes based on the animation prop
  const getAnimationClasses = () => {
    if (disabled) return '';
    
    switch(animation) {
      case 'wave':
        return [
          'btn-wave',
          variant === 'primary' ? 'btn-wave-primary' : '',
          variant === 'secondary' ? 'btn-wave-secondary' : '',
          variant === 'outline' ? 'btn-wave-outline' : '',
        ].filter(Boolean).join(' ');
      case 'ripple':
        return 'btn-ripple';
      case 'lift':
        return 'btn-lift';
      case 'pulse-glow':
        return 'btn-pulse-glow';
      case 'rotating-border':
        return 'btn-rotating-border';
      case 'none':
      default:
        return '';
    }
  };
  
  // Use CSS class composition instead of Tailwind utility classes
  const classes = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    disabled ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    waveEffect && animation === 'wave' ? getAnimationClasses() : getAnimationClasses(),
    className
  ].filter(Boolean).join(' ');
  
  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; 