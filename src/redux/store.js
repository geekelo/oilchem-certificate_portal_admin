import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import signupSlice from './signupSlice';
import studentsSlice from './studentSlice';
import personnelSlice from './personnelSlice';
import certificateSlice from './certificateSlice';
import batchSlice from './batchSlice';

const store = configureStore({
  reducer: {
    login_user: loginSlice,
    signup_admin: signupSlice,
    display_students: studentsSlice,
    display_personnel: personnelSlice,
    display_certificates: certificateSlice,
    display_batches: batchSlice,
  },
});

export default store;
