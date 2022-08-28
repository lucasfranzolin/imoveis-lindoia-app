export type SessionState = {
    email: string | null;
    isAuthenticated: boolean;
    isFinished: boolean;
    isLoading: boolean;
    error: string | null;
};
