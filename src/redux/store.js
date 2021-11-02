import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { contactApi } from './contacts/contactSlice';
import { noteApi } from './notes/noteSlice';
import { weatherApi } from './weather/weatherSlice';

export const store = configureStore({
  reducer: {
    [contactApi.reducerPath]: contactApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactApi.middleware,
    noteApi.middleware,
    weatherApi.middleware,
  ],
});

setupListeners(store.dispatch);
