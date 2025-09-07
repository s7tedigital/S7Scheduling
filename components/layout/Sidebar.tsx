
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  DashboardIcon,
  ProjectsIcon,
  ScenesIcon,
  CastCrewIcon,
  ScheduleIcon,
  LogoutIcon,
} from '../ui/Icon';

const navItems = [
  { path: '/', name: 'Dashboard', icon: DashboardIcon },
  { path: '/projects', name: 'Projects', icon: ProjectsIcon },
  { path: '/scenes', name: 'Scenes', icon: ScenesIcon },
  { path: '/cast-crew', name: 'Cast & Crew', icon: CastCrewIcon },
  { path: '/schedule', name: 'Schedule', icon: ScheduleIcon },
];

const Sidebar: React.FC = () => {
  const baseLinkClasses = "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200";
  const inactiveLinkClasses = "text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800";
  const activeLinkClasses = "bg-primary-600 text-white shadow-lg";

  return (
    <nav className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col p-4 shadow-md">
      <div className="flex items-center space-x-2 px-4 mb-8">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
          S7
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">S7Scheduling</h1>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div>
           {/* Active Project Indicator Placeholder */}
           <div className="px-4 py-2 my-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400">Active Project</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">"Desert Bloom" Feature Film</p>
           </div>
          <button className={`${baseLinkClasses} ${inactiveLinkClasses} w-full`}>
            <LogoutIcon className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
