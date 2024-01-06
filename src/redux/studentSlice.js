// displayStudentsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  student: {},
  loggedin: 'empty',
  status: 'idle',
  error: 'no errors yet',
};

export const displayStudents = createAsyncThunk('user/display_students', async (token) => {
  try {
<<<<<<< HEAD
    const response = await fetch('https://oilchem-api-prod.onrender.com/api/v1/students', {
=======
    const response = await fetch('https://oilchem-api.onrender.com/api/v1/students', {
>>>>>>> dev-deploy
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
});

export const displayStudent = createAsyncThunk(
  'user/display_student',
  async (payload) => {
    const { studentId, token } = payload;
    try {
<<<<<<< HEAD
      const response = await fetch(`https://oilchem-api-prod.onrender.com/api/v1/students/${studentId}`, {
=======
      const response = await fetch(`https://oilchem-api.onrender.com/api/v1/students/${studentId}`, {
>>>>>>> dev-deploy
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

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (payload) => {
    const { id, token } = payload;

    try {
      const response = await fetch(
<<<<<<< HEAD
        `https://oilchem-api-prod.onrender.com/api/v1/students/${id}`,
=======
        `https://oilchem-api.onrender.com/api/v1/students/${id}`,
>>>>>>> dev-deploy
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
    try {
<<<<<<< HEAD
      const response = await fetch('https://oilchem-api-prod.onrender.com/api/v1/students', {
=======
      const response = await fetch('https://oilchem-api.onrender.com/api/v1/students', {
>>>>>>> dev-deploy
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

export const editStudent = createAsyncThunk(
  'user/editStudent',
  async (payload, { dispatch }) => {
    const { studentId, studentData, token } = payload;
    try {
<<<<<<< HEAD
      const response = await fetch(`https://oilchem-api-prod.onrender.com/api/v1/students/${studentId}`, {
=======
      const response = await fetch(`https://oilchem-api.onrender.com/api/v1/students/${studentId}`, {
>>>>>>> dev-deploy
        method: 'PATCH', // Use PATCH for update/edit requests
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
      dispatch(displayStudents());
      return data;
    } catch (error) {
      throw new Error('Something went wrong with updating the student');
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
      }))
      // extra reducers for display tudent
      .addCase(displayStudent.pending, (state) => ({
        ...state,
        loggedin: 'false',
        status: 'loading',
      }))
      .addCase(displayStudent.fulfilled, (state, action) => ({
        ...state,
        loggedin: 'true',
        student: action.payload,
        status: 'done',
      }))
      .addCase(displayStudent.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default displayStudentsSlice.reducer;
