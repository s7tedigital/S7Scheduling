
import React from 'react';
import Card from '../ui/Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <Card className="p-5 flex items-center">
      <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
      </div>
    </Card>
  );
};

export default MetricCard;
