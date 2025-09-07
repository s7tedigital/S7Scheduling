
import React from 'react';
import Card from '../components/ui/Card';

const CastAndCrew: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Cast & Crew</h1>
      <Card className="p-10 text-center">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-slate-500 dark:text-slate-400">
          This section will allow for complete cast and crew registration with photos, contact info, availability calendars, and a skills tagging system.
        </p>
      </Card>
    </div>
  );
};

export default CastAndCrew;
