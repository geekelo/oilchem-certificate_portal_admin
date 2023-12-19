import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import signupSlice from './signupSlice';

const store = configureStore({
  reducer: {
    login_user: loginSlice,
    signup_admin: signupSlice,
  },
});

export default store;
