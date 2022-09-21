import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { SessionData } from '../../../types/auth';
import { RootState } from '../..';
import { SessionState } from './types';

export const fetchSession = createAsyncThunk(
    'session/fetchSession',
    async (http: AxiosInstance) => {
        const { data } = await http.get<SessionData>('/api/auth/session');
        return data;
    }
);

const initialState: SessionState = {
    email: null,
    roles: [],
    error: null,
    isFinished: false,
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
            state.email = initialState.email;
            state.roles = initialState.roles;
            state.error = initialState.error;
            state.isFinished = initialState.isFinished;
            state.isLoading = initialState.isLoading;
        });
        builder.addCase(
            fetchSession.fulfilled,
            (state, action: PayloadAction<SessionData>) => {
                state.email = action.payload.email;
                state.roles = action.payload.roles;
                state.isFinished = true;
                state.isLoading = false;
            }
        );
        builder.addCase(fetchSession.rejected, (state, action) => {
            state.error = action.error.message || 'Problema de sessão.';
            state.isFinished = true;
            state.isLoading = false;
        });
    },
});

export const { reset } = sessionSlice.actions;

export const sessionSel = (state: RootState) => state.session;

export default sessionSlice.reducer;
