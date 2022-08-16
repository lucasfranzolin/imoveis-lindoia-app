import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../../types/auth';
import { RootState } from '../..';
import { UserState } from './types';

const initialState: UserState = {
    value: null,
    isAuthenticated: false,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<User>) => {
            state.value = action.payload;
            state.isAuthenticated = true;
        },
        reset: () => initialState,
    },
});

export const { reset, set } = sessionSlice.actions;

export const userSel = (state: RootState) => state.user;

export default sessionSlice.reducer;
