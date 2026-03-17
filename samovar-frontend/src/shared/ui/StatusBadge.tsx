import React from 'react';

export type StatusVariant = 'ok' | 'warn';

export interface StatusBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ variant, children }) => {
  const classes = ['status-badge', variant === 'ok' ? 'status-ok' : 'status-warn'].join(' ');
  return <span className={classes}>{children}</span>;
};

