import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserData } from '../../../types/auth';
import { RootState } from '../..';
import { UserState } from './types';

const initialState: UserState = {
    email: null,
    isAuthenticated: false,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<UserData>) => {
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },
        reset: () => initialState,
    },
});

export const { reset, set } = sessionSlice.actions;

export const userSel = (state: RootState) => state.user;

export default sessionSlice.reducer;
