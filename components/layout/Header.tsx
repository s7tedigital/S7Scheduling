
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Breadcrumb Placeholder */}
      <div>
        <span className="text-sm text-slate-500">Pages / </span>
        <span className="text-sm font-semibold text-slate-800 dark:text-white">Dashboard</span>
      </div>

      {/* Contextual Actions Placeholder */}
      <div className="flex items-center space-x-4">
        <input
          type="search"
          placeholder="Search..."
          className="px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
        />
        <button className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition shadow">
          New Project
        </button>
      </div>
    </header>
  );
};

export default Header;
