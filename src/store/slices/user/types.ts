import { User } from '../../../types/auth';

export type UserState = {
    value: User | null;
    isAuthenticated: boolean;
};
