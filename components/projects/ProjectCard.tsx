
import React from 'react';
import { Project, ProjectStatus } from '../../types';
import Card from '../ui/Card';
import { useAppContext } from '../../context/AppContext';

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.Planning]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  [ProjectStatus.InProduction]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  [ProjectStatus.PostProduction]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  [ProjectStatus.Completed]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { setSelectedItem } = useAppContext();

  return (
    <Card onClick={() => setSelectedItem(project)}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{project.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 h-10 overflow-hidden">{project.description}</p>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Director</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">{project.director}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Budget</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">${project.budget.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 dark:bg-slate-900 px-5 py-3 border-t border-slate-200 dark:border-slate-800 rounded-b-lg">
        {/* Progress Bar Placeholder */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
          <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
          <span>{project.startDate}</span>
          <span>{project.endDate}</span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
