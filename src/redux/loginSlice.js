// personnelSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  loggedin: 'empty',
  status: 'idle',
  error: 'no errors yet',
};

export const loginUser = createAsyncThunk(
  'user/login_user',
  async (userData) => {
    try {
      const response = await fetch('http://localhost:2000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin: userData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const extractedUserData = {
        id: data.admin.id,
        email: data.admin.email,
        username: data.admin.username,
        token: data.token,
      };

      // Store the data along with a timestamp
      const expirationTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 24 hours
      const dataToStore = {
        extractedUserData,
        expirationTime,
      };

      localStorage.setItem('oilchemAdmin', JSON.stringify(dataToStore));
      return data;
    } catch (error) {
      throw new Error('Something went wrong with creating the user');
    }
  },
);

const loginSlice = createSlice({
  name: 'login_user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        loggedin: 'false',
        status: 'loading',
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        loggedin: 'true',
        value: action.payload,
        status: 'done',
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default loginSlice.reducer;
