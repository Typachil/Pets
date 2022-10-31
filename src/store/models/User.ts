export interface User{
    name?: string;
    email: string;
    token: string;
    id: string;
}

export interface userGoals{
    id: number;
    name: string;
    status: 'cancel' | 'complete' | 'half-complete' | 'in-progress';
}