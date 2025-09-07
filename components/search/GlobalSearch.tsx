
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useProjects, useScenes, useCastAndCrew } from '../../hooks/useMockData';
import { Project, Scene, CastMember, SelectableItem } from '../../types';
import Modal from '../ui/Modal';
import { SearchIcon, ProjectsIcon, ScenesIcon, CastCrewIcon } from '../ui/Icon';

interface SearchResult {
  type: 'Project' | 'Scene' | 'Cast/Crew';
  item: Project | Scene | CastMember;
  path: string;
}

const GlobalSearch: React.FC = () => {
  const { isSearchOpen, toggleSearch, setSelectedItem } = useAppContext();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const navigate = useNavigate();

  const { data: projects } = useProjects();
  const { data: scenes } = useScenes();
  const { data: castAndCrew } = useCastAndCrew();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery) return [];

    const lowerCaseQuery = debouncedQuery.toLowerCase();
    const results: SearchResult[] = [];

    projects
      .filter(p =>
        p.name.toLowerCase().includes(lowerCaseQuery) ||
        p.description.toLowerCase().includes(lowerCaseQuery)
      )
      .forEach(item => results.push({ type: 'Project', item, path: '/projects' }));

    scenes
      .filter(s =>
        s.sceneNumber.toLowerCase().includes(lowerCaseQuery) ||
        s.description.toLowerCase().includes(lowerCaseQuery) ||
        s.location.toLowerCase().includes(lowerCaseQuery)
      )
      .forEach(item => results.push({ type: 'Scene', item, path: '/scenes' }));

    castAndCrew
      .filter(c =>
        c.name.toLowerCase().includes(lowerCaseQuery) ||
        c.role.toLowerCase().includes(lowerCaseQuery)
      )
      .forEach(item => results.push({ type: 'Cast/Crew', item, path: '/cast-crew' }));

    return results;
  }, [debouncedQuery, projects, scenes, castAndCrew]);

  const handleSelectResult = (result: SearchResult) => {
    setSelectedItem(result.item as SelectableItem);
    navigate(result.path);
    toggleSearch();
    setQuery('');
  };

  const ResultIcon = ({ type }: { type: SearchResult['type'] }) => {
    const className = "w-5 h-5 text-slate-500";
    switch(type) {
        case 'Project': return <ProjectsIcon className={className} />;
        case 'Scene': return <ScenesIcon className={className} />;
        case 'Cast/Crew': return <CastCrewIcon className={className} />;
        default: return null;
    }
  };

  const renderResultItem = (result: SearchResult) => {
    let title = '';
    let subtitle = '';

    if (result.type === 'Project') {
        const p = result.item as Project;
        title = p.name;
        subtitle = p.status;
    } else if (result.type === 'Scene') {
        const s = result.item as Scene;
        title = `Scene ${s.sceneNumber}`;
        subtitle = s.description;
    } else if (result.type === 'Cast/Crew') {
        const c = result.item as CastMember;
        title = c.name;
        subtitle = c.role;
    }

    return (
        <li key={result.item.id}>
            <button
                onClick={() => handleSelectResult(result)}
                className="w-full text-left p-3 flex items-center gap-4 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <ResultIcon type={result.type} />
                <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100">{title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{subtitle}</p>
                </div>
            </button>
        </li>
    );
  };
  
  const groupedResults = useMemo(() => {
      const groups: Record<string, SearchResult[]> = {};
      searchResults.forEach(result => {
          if (!groups[result.type]) {
              groups[result.type] = [];
          }
          groups[result.type].push(result);
      });
      return groups;
  }, [searchResults]);


  return (
    <Modal isOpen={isSearchOpen} onClose={toggleSearch} title="Global Search">
      <div className="flex flex-col h-[60vh]">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="search"
            placeholder="Search for projects, scenes, or people..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-base bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            autoFocus
          />
        </div>
        <div className="flex-grow overflow-y-auto -mr-6 pr-4">
          {debouncedQuery && searchResults.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-500 dark:text-slate-400">No results found for "{debouncedQuery}"</p>
            </div>
          )}
          {!debouncedQuery && (
             <div className="text-center py-10">
                <p className="text-slate-500 dark:text-slate-400">Start typing to search across the application.</p>
            </div>
          )}
          {Object.entries(groupedResults).map(([type, results]) => (
            <div key={type} className="mb-4">
                <h3 className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 px-3 py-2 border-b border-slate-200 dark:border-slate-800">{type}</h3>
                <ul className="mt-2">
                    {results.map(renderResultItem)}
                </ul>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default GlobalSearch;
