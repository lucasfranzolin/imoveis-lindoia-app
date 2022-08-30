export type SessionState = {
    email: string | null;
    roles: Array<string>;
    isFinished: boolean;
    isLoading: boolean;
    error: string | null;
};
