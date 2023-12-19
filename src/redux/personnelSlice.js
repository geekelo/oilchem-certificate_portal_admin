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
      const response = await fetch('http://localhost:2000/api/v1/reservations', {
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

export const deleteReservation = createAsyncThunk(
  'items/deleteItem',
  async (payload, dispatch) => {
    const { id, token } = payload;

    try {
      const response = await fetch(`http://localhost:30001/api/v1/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // Include any necessary headers, such as authentication headers
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // If the request is successful, you may dispatch another action to update the Redux store
      // with the new state after deletion

      dispatch(displayReservations(token)); // Return the deleted item ID if needed
    } catch (error) {
      throw new Error('Something went wrong with deleting the item');
    }
  },
);

const personnelSlice = createSlice({
  name: 'display_reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(displayReservations.pending, (state) => ({
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
      .addCase(displayReservations.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default personnelSlice.reducer;
