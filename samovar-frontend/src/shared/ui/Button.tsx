import React from 'react';

type ButtonVariant = 'primary' | 'cyan' | 'outline' | 'danger';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClassMap: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  cyan: 'btn-cyan',
  outline: 'btn-outline',
  danger: 'btn-danger',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth,
  className = '',
  children,
  ...rest
}) => {
  const classes = ['btn', variantClassMap[variant], fullWidth ? 'full-width' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
};

