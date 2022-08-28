import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { SessionData } from '../../../types/auth';
import { RootState } from '../..';
import { SessionState } from './types';

export const fetchSession = createAsyncThunk(
    'session/fetchSession',
    async (client: AxiosInstance) => {
        const { data } = await client.get<SessionData>('/api/auth/session');
        return data;
    }
);

const initialState: SessionState = {
    email: null,
    isAuthenticated: false,
    isFinished: true,
    isLoading: false,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSession.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(
            fetchSession.fulfilled,
            (state, action: PayloadAction<SessionData>) => {
                state.email = action.payload.email;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.isFinished = true;
            }
        );
        builder.addCase(fetchSession.rejected, (state) => {
            state.isLoading = false;
            state.isFinished = true;
        });
    },
});

export const { reset } = sessionSlice.actions;

export const sessionSel = (state: RootState) => state.session;

export default sessionSlice.reducer;
