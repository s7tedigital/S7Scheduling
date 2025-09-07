
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DetailsPanel from './components/layout/DetailsPanel';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Scenes from './pages/Scenes';
import CastAndCrew from './pages/CastAndCrew';
import Schedule from './pages/Schedule';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-slate-900 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/scenes" element={<Scenes />} />
                <Route path="/cast-crew" element={<CastAndCrew />} />
                <Route path="/schedule" element={<Schedule />} />
                {/* Add other routes here */}
              </Routes>
            </main>
          </div>
          <DetailsPanel />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
