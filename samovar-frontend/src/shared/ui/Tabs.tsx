import React from 'react';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  value: string;
  onChange: (id: string) => void;
  items: TabItem[];
}

export const Tabs: React.FC<TabsProps> = ({ value, onChange, items }) => {
  return (
    <div className="tabs-group">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`tab ${value === item.id ? 'active' : ''}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

