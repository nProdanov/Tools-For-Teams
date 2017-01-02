import { Task } from './task';

export interface Project {
    creator: string;
    name: string;
    description: string;
    tasks: Task[];
    projectMembers: any[];
    notes: any[];
};
