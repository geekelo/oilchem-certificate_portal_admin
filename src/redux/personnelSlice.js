// personnelSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  loggedin: 'empty',
  status: 'idle',
  error: 'no errors yet',
};

export const displayPersonnel = createAsyncThunk(
  'user/display_personnel',
  async (token) => {
    try {
      const response = await fetch('http://localhost:2000/api/v1/trainingpersonnels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Something went wrong with creating the user');
    }
  },
);

export const addPersonnel = createAsyncThunk(
  'user/addPersonnel',
  async (payload, dispatch) => {
    console.log(payload);
    const { personnelData, token } = payload;
    console.log(personnelData);
    try {
      const response = await fetch('http://localhost:2000/api/v1/trainingpersonnels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trainingpersonnel: personnelData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      dispatch(displayPersonnel);
      return data;
    } catch (error) {
      throw new Error('Something went wrong with creating the user');
    }
  },
);

export const deletePersonnel = createAsyncThunk(
  'personnel/deletePersonnel',
  async (payload) => {
    const { id, token } = payload;

    try {
      const response = await fetch(
        `http://localhost:2000/api/v1/trainingpersonnels/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      throw new Error('Something went wrong with deleting the student');
    }
  },
);

const personnelSlice = createSlice({
  name: 'display_personnel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(displayPersonnel.pending, (state) => ({
        ...state,
        loggedin: 'false',
        status: 'loading',
      }))
      .addCase(displayPersonnel.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        loggedin: 'true',
        value: action.payload,
        status: 'done',
      }))
      .addCase(displayPersonnel.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default personnelSlice.reducer;
