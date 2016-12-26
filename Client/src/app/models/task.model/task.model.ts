export interface Task {
    projectId: string;
    title: string;
    description: string;
    timeForExecution: string;
    cost: number;
    status: string;
    users: any[];
}
