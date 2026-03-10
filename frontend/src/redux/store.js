import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import eventsReducer from './slices/eventSlice'

export const store = configureStore({
  reducer: {
    events:eventsReducer,
    auth: authReducer
  }
});
