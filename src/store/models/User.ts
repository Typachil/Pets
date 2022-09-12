export interface User{
    name: string;
    email: string;
    password: string;
}

export interface userGoals{
    id: number;
    name: string;
    status: 'cancel' | 'complete' | 'half-complete' | 'in-progress';
}