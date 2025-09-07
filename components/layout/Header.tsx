
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { SearchIcon } from '../ui/Icon';

const Header: React.FC = () => {
  const { toggleSearch } = useAppContext();

  return (
    <header className="flex-shrink-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Breadcrumb Placeholder */}
      <div>
        <span className="text-sm text-slate-500">Pages / </span>
        <span className="text-sm font-semibold text-slate-800 dark:text-white">Dashboard</span>
      </div>

      {/* Contextual Actions */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSearch}
          className="flex items-center px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          aria-label="Open search"
        >
          <SearchIcon className="w-4 h-4 mr-2" />
          <span>Search...</span>
        </button>
        <button className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition shadow">
          New Project
        </button>
      </div>
    </header>
  );
};

export default Header;
