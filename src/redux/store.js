import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';

const store = configureStore({
  reducer: {
    login_user: loginSlice,
  },
});

export default store;
