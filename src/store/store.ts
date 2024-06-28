import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import messagesReducer from './messagesSlice';
import userReducer from '../User/userSlice'; // Adjusted path

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

