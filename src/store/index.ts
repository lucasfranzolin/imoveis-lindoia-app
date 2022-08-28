import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './slices/session';

export const store = configureStore({
    reducer: {
        session: sessionReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
