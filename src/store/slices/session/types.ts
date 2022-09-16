export type SessionState = {
    email: string | null;
    roles: string[];
    isFinished: boolean;
    isLoading: boolean;
    error: string | null;
};
