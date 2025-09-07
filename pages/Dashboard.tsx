
import React from 'react';
import MetricCard from '../components/dashboard/MetricCard';
import { useProjects, useScenes, useCastAndCrew } from '../hooks/useMockData';
import { ProjectsIcon, ScenesIcon, CastCrewIcon } from '../components/ui/Icon';
import Card from '../components/ui/Card';

const Dashboard: React.FC = () => {
  const { data: projects } = useProjects();
  const { data: scenes } = useScenes();
  const { data: castAndCrew } = useCastAndCrew();

  const activeProjects = projects.filter(p => p.status === 'In Production').length;
  const scenesToday = scenes.filter(s => s.scheduledDate === new Date().toISOString().split('T')[0]).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard 
          title="Active Projects" 
          value={activeProjects} 
          icon={<ProjectsIcon className="w-6 h-6 text-blue-600"/>}
          colorClass="bg-blue-100 dark:bg-blue-900/50"
        />
        <MetricCard 
          title="Scenes Scheduled Today" 
          value={scenesToday}
          icon={<ScenesIcon className="w-6 h-6 text-green-600"/>}
          colorClass="bg-green-100 dark:bg-green-900/50"
        />
        <MetricCard 
          title="Available Crew" 
          value={castAndCrew.length} 
          icon={<CastCrewIcon className="w-6 h-6 text-purple-600"/>}
          colorClass="bg-purple-100 dark:bg-purple-900/50"
        />
      </div>

      {/* Other Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <h2 className="font-semibold text-lg mb-4">Timeline (Next 7 Days)</h2>
          <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
            <p className="text-slate-500">Timeline Chart Placeholder</p>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-lg mb-4">Urgent Tasks</h2>
          <div className="space-y-3">
             <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                <p className="font-medium text-sm">Confirm location for Scene 21C</p>
                <p className="text-xs text-error">Overdue</p>
             </div>
             <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                <p className="font-medium text-sm">Anya Petrova costume fitting</p>
                <p className="text-xs text-warning">Due Today</p>
             </div>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;
