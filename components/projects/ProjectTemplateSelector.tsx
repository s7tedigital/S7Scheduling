import React from 'react';
import { useProjectTemplates } from '../../hooks/useMockData';
import { ProjectTemplate } from '../../types';
import TemplateCard from './TemplateCard';

interface ProjectTemplateSelectorProps {
  onTemplateSelect: (template: ProjectTemplate) => void;
}

const ProjectTemplateSelector: React.FC<ProjectTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const { data: templates, loading } = useProjectTemplates();

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-5 animate-pulse">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-6"></div>
              <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map(template => (
            <TemplateCard key={template.id} template={template} onSelect={onTemplateSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectTemplateSelector;