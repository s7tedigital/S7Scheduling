
import React, { useState, useCallback } from 'react';
import Card from '../components/ui/Card';
import { useScenes, useProjects } from '../hooks/useMockData';
import { generateScheduleSuggestion, ScheduleSuggestion } from '../services/geminiService';

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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
          {isLoading ? 'Generating...' : '✨ Generate AI Suggestion'}
        </button>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Schedule for "Desert Bloom"</h2>
        {error && <div className="text-center p-4 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 rounded-md">{error}</div>}
        
        {!suggestion && !isLoading && !error && (
            <div className="text-center py-10">
                <p className="text-slate-500 dark:text-slate-400">Click the button to generate an optimized schedule suggestion for unscheduled scenes.</p>
            </div>
        )}

        {isLoading && <div className="text-center py-10 text-primary-500">Thinking... Please wait a moment.</div>}
        
        {suggestion && suggestion.length > 0 && (
          <div className="space-y-6">
            {suggestion.map((day, index) => (
              <div key={index} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-primary-700 dark:text-primary-300">{day.day}</h3>
                    <span className="font-mono text-sm text-slate-600 dark:text-slate-400">{day.date}</span>
                </div>
                <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-4">{day.notes}</p>
                <div className="space-y-2">
                    {day.scenes.map((scene, sceneIndex) => (
                        <div key={sceneIndex} className="p-3 bg-white dark:bg-slate-800 rounded-md flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Scene {scene.sceneNumber}</p>
                                <p className="text-xs text-slate-500">{scene.location}</p>
                            </div>
                            <span className="text-sm font-medium">{scene.estimatedTime}</span>
                        </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
         {suggestion && suggestion.length === 0 && (
            <div className="text-center py-10">
                <p className="text-slate-500 dark:text-slate-400">All scenes for this project are already scheduled.</p>
            </div>
        )}
      </Card>
    </div>
  );
};

export default Schedule;
