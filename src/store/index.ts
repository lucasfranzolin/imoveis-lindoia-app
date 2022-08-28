import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/session';

export const store = configureStore({
    reducer: {
        session: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
