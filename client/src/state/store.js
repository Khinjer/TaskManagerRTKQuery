import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from '../features/todos/todosApi';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
