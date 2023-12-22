// displayStudentsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  loggedin: 'empty',
  status: 'idle',
  error: 'no errors yet',
};

export const displayStudents = createAsyncThunk('user/display_students', async (token) => {
  try {
    const response = await fetch('http://localhost:2000/api/v1/students', {
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
    console.log(data);
    return data;
  } catch (error) {
    throw new Error('Something went wrong with creating the user');
  }
});

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (payload) => {
    const { id, token } = payload;

    try {
      const response = await fetch(
        `http://localhost:2000/api/v1/students/${id}`,
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

export const addStudent = createAsyncThunk(
  'user/addStudent',
  async (payload, dispatch) => {
    const { studentData, token } = payload;
    console.log(studentData);
    try {
      const response = await fetch('http://localhost:2000/api/v1/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ student: studentData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      dispatch(displayStudents);
      return data;
    } catch (error) {
      throw new Error('Something went wrong with creating the user');
    }
  },
);

const displayStudentsSlice = createSlice({
  name: 'display_students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(displayStudents.pending, (state) => ({
        ...state,
        loggedin: 'false',
        status: 'loading',
      }))
      .addCase(displayStudents.fulfilled, (state, action) => ({
        ...state,
        loggedin: 'true',
        value: action.payload,
        status: 'done',
      }))
      .addCase(displayStudents.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default displayStudentsSlice.reducer;
