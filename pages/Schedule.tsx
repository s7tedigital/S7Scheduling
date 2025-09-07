import React, { useState, useCallback } from 'react';
import Card from '../components/ui/Card';
import { useScenes, useProjects } from '../hooks/useMockData';
import { generateScheduleSuggestion, ScheduleSuggestion } from '../services/geminiService';
import GanttChart from '../components/schedule/GanttChart';

const Schedule: React.FC = () => {
  const { data: scenes } = useScenes('proj-1'); // Hardcoding project for demo
  const { data: projects } = useProjects();
  const [suggestion, setSuggestion] = useState<ScheduleSuggestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSchedule = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const currentProject = projects.find(p => p.id === 'proj-1');
    if (!currentProject) {
        setError("Could not find project context.");
        setIsLoading(false);
        return;
    }

    try {
      const result = await generateScheduleSuggestion(scenes, currentProject.description);
      setSuggestion(result.schedule);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [scenes, projects]);
  
  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center p-6 text-primary-500">Thinking... Please wait a moment while the AI generates a schedule.</div>;
    }
    if (error) {
       return <div className="text-center p-4 m-6 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 rounded-md">{error}</div>;
    }
    if (suggestion) {
        if (suggestion.length > 0) {
            return <GanttChart schedule={suggestion} />;
        }
        return (
            <div className="text-center p-6">
                <p className="text-slate-500 dark:text-slate-400">All scenes for this project are already scheduled.</p>
            </div>
        );
    }
    return (
        <div className="text-center p-6">
            <p className="text-slate-500 dark:text-slate-400">Click the button to generate an optimized schedule suggestion for unscheduled scenes.</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">A visual Gantt chart will be displayed here.</p>
        </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Smart Schedule</h1>
        <button
          onClick={handleGenerateSchedule}
          disabled={isLoading}
          className="px-4 py-2 font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition shadow disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isLoading ? 'Generating...' : '✨ Generate AI Schedule'}
        </button>
      </div>

      <Card>
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Schedule Timeline for "Desert Bloom"</h2>
        </div>
        {renderContent()}
      </Card>
    </div>
  );
};

export default Schedule;
