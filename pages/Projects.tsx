import React, { useState, useEffect, useMemo } from 'react';
import { useProjects } from '../hooks/useMockData';
import ProjectCard from '../components/projects/ProjectCard';
import { Project, ProjectStatus, ProjectTemplate } from '../types';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ProjectForm, { ProjectFormData } from '../components/projects/ProjectForm';
import { ArrowDownIcon, ArrowUpIcon } from '../components/ui/Icon';
import ProjectTemplateSelector from '../components/projects/ProjectTemplateSelector';

const Projects: React.FC = () => {
  const { data: initialProjects, loading } = useProjects();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isTemplateModalOpen, setTemplateModalOpen] = useState(false);
  const [initialFormData, setInitialFormData] = useState<Partial<ProjectFormData> | undefined>();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'startDate' | 'endDate'>('startDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (initialProjects.length > 0) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  const handleCreateProject = (data: ProjectFormData) => {
    const newProject: Project = {
      ...data,
      id: `proj-${Date.now()}`, // Simple unique ID for mock purposes
    };
    setProjects(prevProjects => [newProject, ...prevProjects]);
    setFormModalOpen(false);
  };

  const handleOpenNewProject = () => {
    setInitialFormData(undefined);
    setFormModalOpen(true);
  };

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setInitialFormData(template.defaultData);
    setTemplateModalOpen(false);
    setFormModalOpen(true);
  };
  
  const displayedProjects = useMemo(() => {
    const sortedProjects = [...projects].sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      
      if (valA < valB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    if (statusFilter === 'All') {
      return sortedProjects;
    }
    return sortedProjects.filter(p => p.status === statusFilter);
  }, [projects, statusFilter, sortBy, sortOrder]);
  
  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <Modal isOpen={isFormModalOpen} onClose={() => setFormModalOpen(false)} title="Create New Project">
        <ProjectForm 
          onSubmit={handleCreateProject}
          onCancel={() => setFormModalOpen(false)}
          initialData={initialFormData}
        />
      </Modal>
      
      <Modal isOpen={isTemplateModalOpen} onClose={() => setTemplateModalOpen(false)} title="Select a Project Template">
          <ProjectTemplateSelector onTemplateSelect={handleTemplateSelect} />
      </Modal>

      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-y-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            >
              <option value="All">All Statuses</option>
              {Object.values(ProjectStatus).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'startDate' | 'endDate')}
              className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            >
                <option value="startDate">Sort by Start Date</option>
                <option value="endDate">Sort by End Date</option>
                <option value="name">Sort by Name</option>
            </select>
            <Button variant="secondary" onClick={toggleSortOrder} className="p-2" aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}>
                {sortOrder === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
            </Button>
            <Button variant="secondary" onClick={() => setTemplateModalOpen(true)}>
                Use a Template
            </Button>
            <Button onClick={handleOpenNewProject}>
              New Project
            </Button>
          </div>
        </div>
        
        {loading && projects.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-950 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 p-5 animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-6"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        
        {displayedProjects.length === 0 && !loading && (
            <div className="text-center py-12 bg-white dark:bg-slate-950 rounded-lg">
                <p className="text-slate-500 dark:text-slate-400">No projects found for this filter.</p>
            </div>
        )}
      </div>
    </>
  );
};

export default Projects;