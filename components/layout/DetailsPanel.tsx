import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Project, Scene, CastMember, SceneStatus, ProjectTemplate } from '../../types';
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
    if ('department' in selectedItem) { // It's a CastMember
        const member = selectedItem as CastMember;
        return (
            <div className="p-6 space-y-4">
                <div className="flex flex-col items-center text-center">
                    <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"
                    />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">{member.name}</h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{member.role}</p>
                </div>

                <div className="space-y-4 pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                    <div>
                        <span className="text-xs font-semibold uppercase text-slate-500">Department</span>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{member.department}</p>
                    </div>
                    <div>
                        <span className="text-xs font-semibold uppercase text-slate-500">Contact</span>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 hover:text-primary-600">
                            <a href={`mailto:${member.contact}`}>{member.contact}</a>
                        </p>
                    </div>
                    <div>
                        <span className="text-xs font-semibold uppercase text-slate-500">Availability</span>
                        {member.availability.length > 0 ? (
                             <div className="flex flex-wrap gap-2 mt-2">
                                {member.availability.map(date => (
                                    <span key={date} className="px-2.5 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full">{date}</span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 dark:text-slate-400 italic">No availability specified.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
     if ('defaultData' in selectedItem) { // It's a ProjectTemplate
      const template = selectedItem as ProjectTemplate;
      return (
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{template.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{template.description}</p>
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase text-slate-500">Default Project Data</span>
            <div className="mt-2 space-y-2 text-sm">
                {Object.entries(template.defaultData).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-2 bg-slate-100 dark:bg-slate-800/50 rounded-md">
                        <span className="capitalize font-medium text-slate-600 dark:text-slate-300">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-slate-800 dark:text-slate-100">{String(value)}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      );
    }
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
        aria-label={isDetailsPanelOpen ? 'Close details panel' : 'Open details panel'}
      >
        {isDetailsPanelOpen ? <ChevronRightIcon className="w-5 h-5 text-slate-600 dark:text-slate-300"/> : <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />}
      </button>
    </>
  );
};

export default DetailsPanel;
