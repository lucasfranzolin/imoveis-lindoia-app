import { UserData } from '../../../types/auth';

export type UserState = {
    value: UserData | null;
    isAuthenticated: boolean;
};
