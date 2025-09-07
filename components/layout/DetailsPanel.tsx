import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Project, Scene, CastMember, SceneStatus } from '../../types';
import { ChevronLeftIcon, ChevronRightIcon } from '../ui/Icon';

const sceneStatusColors: Record<SceneStatus, string> = {
  [SceneStatus.Scheduled]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  [SceneStatus.InProgress]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  [SceneStatus.Completed]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  [SceneStatus.Cancelled]: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
};

const DetailsPanel: React.FC = () => {
  const { selectedItem, isDetailsPanelOpen, toggleDetailsPanel } = useAppContext();

  const renderDetails = () => {
    if (!selectedItem) {
      return (
        <div className="text-center p-6">
          <p className="text-slate-500 dark:text-slate-400">Select an item to see details.</p>
        </div>
      );
    }
    if ('budget' in selectedItem) { // It's a Project
      const project = selectedItem as Project;
      return (
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{project.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500">Status</span>
            <p className="text-sm font-medium">{project.status}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500">Dates</span>
            <p className="text-sm font-medium">{project.startDate} to {project.endDate}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500">Budget</span>
            <p className="text-sm font-medium">${project.budget.toLocaleString()}</p>
          </div>
        </div>
      );
    }
    if ('sceneNumber' in selectedItem) { // It's a Scene
      const scene = selectedItem as Scene;
      return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scene {scene.sceneNumber}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${sceneStatusColors[scene.status]}`}>
                    {scene.status}
                </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{scene.description}</p>
            
            <div className="space-y-4">
              <div>
                  <span className="text-xs font-semibold uppercase text-slate-500">Location</span>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{scene.location}</p>
              </div>
              
              <div>
                  <span className="text-xs font-semibold uppercase text-slate-500">Scheduled Date</span>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{scene.scheduledDate || 'Not scheduled'}</p>
              </div>
  
              <div>
                  <span className="text-xs font-semibold uppercase text-slate-500">Duration</span>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{scene.durationMinutes} minutes</p>
              </div>
  
              <div>
                  <span className="text-xs font-semibold uppercase text-slate-500">Equipment</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                      {scene.equipment.map(item => (
                          <span key={item} className="px-2.5 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full">{item}</span>
                      ))}
                  </div>
              </div>
            </div>
        </div>
      );
    }
    // Add similar checks and renderers for CastMember
    return <p className="p-6 text-slate-500">Details for this item type are not implemented yet.</p>;
  };

  return (
    <>
      <div className={`relative transition-all duration-300 ease-in-out ${isDetailsPanelOpen ? 'w-80' : 'w-0'}`}>
        <aside className={`w-80 h-full bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-lg overflow-y-auto`}>
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Details</h2>
          </div>
          {renderDetails()}
        </aside>
      </div>
      <button 
        onClick={toggleDetailsPanel} 
        className="absolute top-1/2 -mt-8 bg-white dark:bg-slate-800 p-1 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-700 shadow-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        style={{ right: isDetailsPanelOpen ? '20rem' : '0' }}
      >
        {isDetailsPanelOpen ? <ChevronRightIcon className="w-5 h-5 text-slate-600 dark:text-slate-300"/> : <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />}
      </button>
    </>
  );
};

export default DetailsPanel;