// signupSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  status: 'idle',
  error: 'no errors yet',
};

export const loginUser = createAsyncThunk(
  'user/login_user',
  async (userData) => {
    try {
      const response = await fetch('https://oilchem-api.onrender.com/api/v1/login', {
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

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { dispatch }) => {
    try {
      const response = await fetch('https://oilchem-api.onrender.com/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin: userData }), // Wrap userData in a "user" key
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.removeItem('oilchemAdmin');
      const loginData = {
        email: userData.email,
        password: userData.password,
      };
      dispatch(loginUser(loginData));
      return data; // You might want to adjust this based on your API response structure
    } catch (error) {
      throw new Error('Something went wrong with creating the user');
    }
  },
);

const signupSlice = createSlice({
  name: 'signup_admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(createUser.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        value: action.payload,
        status: 'done',
      }))
      .addCase(createUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default signupSlice.reducer;
