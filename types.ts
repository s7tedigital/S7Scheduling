
export enum ProjectStatus {
  Planning = 'Planning',
  InProduction = 'In Production',
  PostProduction = 'Post-Production',
  Completed = 'Completed',
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  director: string;
  producer: string;
}

export enum SceneStatus {
    Scheduled = 'Scheduled',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Cancelled = 'Cancelled'
}

export interface Scene {
    id: string;
    projectId: string;
    sceneNumber: string;
    description: string;
    location: string;
    scheduledDate: string | null;
    durationMinutes: number;
    equipment: string[];
    status: SceneStatus;
}

export interface CastMember {
    id: string;
    name: string;
    role: string;
    department: 'Cast' | 'Crew';
    contact: string;
    photoUrl: string;
    availability: string[];
}

export type SelectableItem = Project | Scene | CastMember | null;
