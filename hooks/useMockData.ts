import { useState, useEffect } from 'react';
import { mockProjects, mockScenes, mockCastAndCrew, mockProjectTemplates } from '../utils/mockData';
import { Project, Scene, CastMember, ProjectTemplate } from '../types';

const useMockData = <T,>(data: T[], delay: number = 500) => {
  const [result, setResult] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(data);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [data, delay]);

  return { data: result, loading };
};

export const useProjects = () => useMockData<Project>(mockProjects);
export const useScenes = (projectId?: string) => {
    const filteredScenes = projectId ? mockScenes.filter(s => s.projectId === projectId) : mockScenes;
    return useMockData<Scene>(filteredScenes);
};
export const useCastAndCrew = () => useMockData<CastMember>(mockCastAndCrew);
export const useProjectTemplates = () => useMockData<ProjectTemplate>(mockProjectTemplates);