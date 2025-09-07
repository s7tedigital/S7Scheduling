import React, { useState, useEffect } from 'react';
import { useScenes } from '../hooks/useMockData';
import { useAppContext } from '../context/AppContext';
import { Scene, SceneStatus } from '../types';
import Modal from '../components/ui/Modal';
import SceneForm, { SceneFormData } from '../components/scenes/SceneForm';
import Button from '../components/ui/Button';
import { EditIcon } from '../components/ui/Icon';

const sceneStatusColors: Record<SceneStatus, string> = {
  [SceneStatus.Scheduled]: 'border-blue-500',
  [SceneStatus.InProgress]: 'border-yellow-500',
  [SceneStatus.Completed]: 'border-green-500',
  [SceneStatus.Cancelled]: 'border-slate-500',
};

const SceneRow: React.FC<{ scene: Scene; onEdit: (scene: Scene) => void }> = ({ scene, onEdit }) => {
    const { setSelectedItem, selectedItem } = useAppContext();
    const isSelected = selectedItem?.id === scene.id;

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent row selection when clicking edit
        onEdit(scene);
    };

    return (
        <div
            onClick={() => setSelectedItem(scene)}
            className={`p-4 border-l-4 ${sceneStatusColors[scene.status]} bg-white dark:bg-slate-950 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all flex justify-between items-center ${isSelected ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-900' : ''}`}
        >
            <div className="flex-grow pr-4">
                <p className="font-bold text-slate-800 dark:text-white">Scene {scene.sceneNumber}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{scene.description.length > 70 ? `${scene.description.substring(0, 70)}...` : scene.description}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-4 hidden sm:block">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{scene.location}</p>
                <p className="text-xs text-slate-500">{scene.scheduledDate || 'Unscheduled'}</p>
            </div>
            <div className="flex-shrink-0 ml-4">
                 <Button variant="secondary" onClick={handleEditClick} className="p-2">
                    <EditIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};


const Scenes: React.FC = () => {
    const { data: initialScenes, loading } = useScenes('proj-1'); // for "Desert Bloom"
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingScene, setEditingScene] = useState<Scene | null>(null);

    useEffect(() => {
        setScenes(initialScenes);
    }, [initialScenes]);

    const handleOpenEditModal = (scene: Scene) => {
        setEditingScene(scene);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingScene(null);
    };

    const handleUpdateScene = (data: SceneFormData) => {
        if (!editingScene) return;

        const updatedScene: Scene = {
            ...editingScene,
            ...data,
            durationMinutes: Number(data.durationMinutes),
            // Convert comma-separated string back to array, trimming whitespace and removing empty strings
            equipment: data.equipment.split(',').map(item => item.trim()).filter(Boolean),
        };

        setScenes(currentScenes => 
            currentScenes.map(s => s.id === updatedScene.id ? updatedScene : s)
        );
        
        // If the updated scene is the currently selected one, update the selection as well
        const { selectedItem, setSelectedItem } = useAppContext();
        if (selectedItem && selectedItem.id === updatedScene.id) {
            setSelectedItem(updatedScene);
        }

        handleCloseModal();
    };


    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Edit Scene ${editingScene?.sceneNumber}`}>
                {editingScene && (
                    <SceneForm 
                        onSubmit={handleUpdateScene}
                        onCancel={handleCloseModal}
                        initialData={editingScene}
                    />
                )}
            </Modal>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Scenes for "Desert Bloom"</h1>
                
                {loading && scenes.length === 0 ? (
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-slate-950 p-4 rounded-lg shadow-sm animate-pulse">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2"></div>
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-48"></div>
                                    </div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                     <div className="space-y-3">
                        {scenes.map(scene => <SceneRow key={scene.id} scene={scene} onEdit={handleOpenEditModal} />)}
                    </div>
                )}
            </div>
        </>
    );
};

export default Scenes;