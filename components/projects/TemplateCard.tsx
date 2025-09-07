import React from 'react';
import { ProjectTemplate } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface TemplateCardProps {
  template: ProjectTemplate;
  onSelect?: (template: ProjectTemplate) => void;
  onClick?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect, onClick }) => {
  return (
    <Card className="p-5 flex flex-col text-left h-full" onClick={onClick}>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{template.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{template.description}</p>
      </div>
      {onSelect && (
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template);
          }} 
          variant="secondary" 
          className="w-full mt-auto"
        >
          Select Template
        </Button>
      )}
    </Card>
  );
};

export default TemplateCard;
