// batchSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  batch: {},
  loggedin: 'empty',
  status: 'idle',
  error: 'no errors yet',
};

export const displayBatches = createAsyncThunk(
  'user/display_batches',
  async (token) => {
    try {
      const response = await fetch('https://oilchem-api-pro.onrender.com/api/v1/batches', {
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

export const displayBatch = createAsyncThunk(
  'user/display_batch',
  async (payload) => {
    const { batchId, token } = payload;
    try {
      const response = await fetch(`https://oilchem-api.onrender.com/api/v1/batches/${batchId}`, {
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

export const deleteBatch = createAsyncThunk(
  'students/deleteBatch',
  async (payload) => {
    const { id, token } = payload;

    try {
      const response = await fetch(
        `https://oilchem-api.onrender.com/api/v1/batches/${id}`,
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

export const addBatch = createAsyncThunk(
  'certificate/addBatch',
  async (payload) => {
    const { batchData, token } = payload;
    try {
      const response = await fetch('https://oilchem-api.onrender.com/api/v1/batches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ batch: batchData }),
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

export const editBatch = createAsyncThunk(
  'certificate/editBatch',
  async (payload) => {
    const { batchId, batchData, token } = payload;
    try {
      const response = await fetch(`https://oilchem-api.onrender.com/api/v1/batches/${batchId}`, {
        method: 'PATCH', // Use PATCH for update/edit requests
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ batch: batchData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Something went wrong with updating the batch');
    }
  },
);

const batchSlice = createSlice({
  name: 'display_batches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(displayBatches.pending, (state) => ({
        ...state,
        loggedin: 'false',
        status: 'loading',
      }))
      .addCase(displayBatches.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        loggedin: 'true',
        value: action.payload,
        status: 'done',
      }))
      .addCase(displayBatches.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }))
      // extra reducers for displaybatch
      .addCase(displayBatch.pending, (state) => ({
        ...state,
        loggedin: 'false',
        status: 'loading',
      }))
      .addCase(displayBatch.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        loggedin: 'true',
        batch: action.payload,
        status: 'done',
      }))
      .addCase(displayBatch.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default batchSlice.reducer;
