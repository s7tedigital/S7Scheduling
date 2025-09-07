
import React from 'react';
import { useProjectTemplates } from '../hooks/useMockData';
import TemplateCard from '../components/projects/TemplateCard';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

const Templates: React.FC = () => {
    const { data: templates, loading } = useProjectTemplates();
    const { setSelectedItem } = useAppContext();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Project Templates</h1>
                <Button disabled>New Template</Button>
            </div>

            {loading && templates.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white dark:bg-slate-950 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 p-5 animate-pulse">
                            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-6"></div>
                            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {templates.map(template => (
                        <TemplateCard 
                            key={template.id} 
                            template={template} 
                            onClick={() => setSelectedItem(template)} 
                        />
                    ))}
                </div>
            )}

            {templates.length === 0 && !loading && (
                <div className="text-center py-12 bg-white dark:bg-slate-950 rounded-lg">
                    <p className="text-slate-500 dark:text-slate-400">No project templates found.</p>
                </div>
            )}
        </div>
    );
};

export default Templates;
