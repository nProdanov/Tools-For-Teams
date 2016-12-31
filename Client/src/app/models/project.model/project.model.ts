import { Task } from '../task.model/task.model';

export interface Project {
    creator: string;
    name: string;
    description: string;
    tasks: Task[];
    projectMembers: any[];
    notes: any[];
};
