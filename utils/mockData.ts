import { Project, ProjectStatus, Scene, SceneStatus, CastMember, ProjectTemplate } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: '"Desert Bloom" Feature Film',
    description: 'A sci-fi epic set on a distant desert planet.',
    status: ProjectStatus.InProduction,
    startDate: '2024-08-01',
    endDate: '2024-11-30',
    budget: 5000000,
    director: 'Ava Chen',
    producer: 'Leo Ramirez',
  },
  {
    id: 'proj-2',
    name: '"Cybernetic Dreams" Series',
    description: 'An episodic series exploring the future of AI.',
    status: ProjectStatus.Planning,
    startDate: '2024-10-15',
    endDate: '2025-03-01',
    budget: 2500000,
    director: 'Kenji Tanaka',
    producer: 'Sofia Rossi',
  },
  {
    id: 'proj-3',
    name: '"Coastal Whispers" Documentary',
    description: 'Exploring the delicate ecosystem of the northern coastline.',
    status: ProjectStatus.PostProduction,
    startDate: '2024-05-10',
    endDate: '2024-07-20',
    budget: 750000,
    director: 'Maria Garcia',
    producer: 'David Lee',
  },
  {
    id: 'proj-4',
    name: '"Momentum" Commercial Spot',
    description: 'High-energy sports drink commercial.',
    status: ProjectStatus.Completed,
    startDate: '2024-06-20',
    endDate: '2024-06-25',
    budget: 300000,
    director: 'Jack Miller',
    producer: 'Chloe Kim',
  },
];

export const mockScenes: Scene[] = [
  { id: 'scn-1', projectId: 'proj-1', sceneNumber: '1A', description: 'Opening shot, panoramic view of the twin suns setting over the crimson desert.', location: 'Red Rock Canyon', scheduledDate: '2024-08-15', durationMinutes: 120, equipment: ['Drone', '8K Camera'], status: SceneStatus.Completed },
  { id: 'scn-2', projectId: 'proj-1', sceneNumber: '2B', description: 'Protagonist discovers the hidden oasis.', location: 'Zion National Park', scheduledDate: '2024-08-16', durationMinutes: 240, equipment: ['Steadicam', 'Underwater Housing'], status: SceneStatus.Scheduled },
  { id: 'scn-3', projectId: 'proj-1', sceneNumber: '15', description: 'Interior dialogue scene in the Nomad\'s tent.', location: 'Studio B', scheduledDate: '2024-08-18', durationMinutes: 180, equipment: ['LED Panels', 'Boom Mic'], status: SceneStatus.Scheduled },
  { id: 'scn-4', projectId: 'proj-1', sceneNumber: '21C', description: 'High-speed chase across the salt flats.', location: 'Bonneville Salt Flats', scheduledDate: null, durationMinutes: 360, equipment: ['Camera Car', 'Gimbals'], status: SceneStatus.Scheduled },
  { id: 'scn-5', projectId: 'proj-2', sceneNumber: '1-01', description: 'Introduction to Neo-Kyoto in 2088.', location: 'Downtown LA (VFX)', scheduledDate: null, durationMinutes: 120, equipment: ['Greenscreen', 'Motion Capture'], status: SceneStatus.Scheduled },
];

export const mockCastAndCrew: CastMember[] = [
    { id: 'cc-1', name: 'Anya Petrova', role: 'Lead Actress', department: 'Cast', contact: 'anya.p@example.com', photoUrl: 'https://picsum.photos/id/1027/200/200', availability: [] },
    { id: 'cc-2', name: 'Ben Carter', role: 'Lead Actor', department: 'Cast', contact: 'ben.c@example.com', photoUrl: 'https://picsum.photos/id/1005/200/200', availability: [] },
    { id: 'cc-3', name: 'Carlos Vega', role: 'Director of Photography', department: 'Crew', contact: 'carlos.v@example.com', photoUrl: 'https://picsum.photos/id/1011/200/200', availability: [] },
    { id: 'cc-4', name: 'Diana Prince', role: 'Stunt Coordinator', department: 'Crew', contact: 'diana.p@example.com', photoUrl: 'https://picsum.photos/id/1012/200/200', availability: [] },
    { id: 'cc-5', name: 'Ethan Hunt', role: 'Gaffer', department: 'Crew', contact: 'ethan.h@example.com', photoUrl: 'https://picsum.photos/id/1013/200/200', availability: [] },
    { id: 'cc-6', name: 'Fiona Glenanne', role: 'Costume Designer', department: 'Crew', contact: 'fiona.g@example.com', photoUrl: 'https://picsum.photos/id/1014/200/200', availability: [] },
];

export const mockProjectTemplates: ProjectTemplate[] = [
    {
        id: 'tmpl-1',
        name: 'Feature Film',
        description: 'A standard 90-120 minute film structure. Includes typical departments and a multi-month schedule.',
        defaultData: {
            name: 'Untitled Feature Film',
            description: 'A feature-length film project.',
            status: ProjectStatus.Planning,
        }
    },
    {
        id: 'tmpl-2',
        name: 'Commercial',
        description: 'A short-form project for advertising. Optimized for a quick turnaround of 1-2 weeks.',
        defaultData: {
            name: 'Untitled Commercial Spot',
            description: 'A 30-second commercial spot.',
            status: ProjectStatus.Planning,
            budget: 50000,
        }
    },
    {
        id: 'tmpl-3',
        name: 'Documentary',
        description: 'An unscripted project focused on real-life subjects. Flexible schedule for interviews and b-roll.',
        defaultData: {
            name: 'Untitled Documentary',
            description: 'A documentary project exploring a specific subject.',
            status: ProjectStatus.Planning,
        }
    }
];