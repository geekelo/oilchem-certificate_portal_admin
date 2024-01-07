// personnelSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  certificate: {},
  loggedin: 'empty',
  status: 'idle',
  error: 'no errors yet',
};

export const displayCertificates = createAsyncThunk(
  'user/display_certificates',
  async (token) => {
    try {
      const response = await fetch('https://oilchem-api.onrender.com/api/v1/certificates', {
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

export const displayCertificate = createAsyncThunk(
  'user/display_certificate',
  async (payload) => {
    const { certificateId, token } = payload;
    try {
      const response = await fetch(`https://oilchem-api.onrender.com/api/v1/certificates/${certificateId}`, {
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

export const deleteCertificate = createAsyncThunk(
  'students/deleteCertificate',
  async (payload) => {
    const { id, token } = payload;

    try {
      const response = await fetch(
        `hhttps://oilchem-api.onrender.com/api/v1/certificates/${id}`,
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

export const addCertificate = createAsyncThunk(
  'certificate/addCertificate',
  async (payload) => {
    const { certificateData, token } = payload;
    try {
      const response = await fetch('https://oilchem-api.onrender.com/api/v1/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ certificate: certificateData }),
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

export const editCertificate = createAsyncThunk(
  'certificate/editCertificate',
  async (payload) => {
    const { certificateId, certificateData, token } = payload;
    try {
      const response = await fetch(`https://oilchem-api.onrender.com/api/v1/certificates/${certificateId}`, {
        method: 'PATCH', // Use PATCH for update/edit requests
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ certificate: certificateData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Something went wrong with updating the certificate');
    }
  },
);

const certificatesSlice = createSlice({
  name: 'display_certificates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(displayCertificates.pending, (state) => ({
        ...state,
        loggedin: 'false',
        status: 'loading',
      }))
      .addCase(displayCertificates.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        loggedin: 'true',
        value: action.payload,
        status: 'done',
      }))
      .addCase(displayCertificates.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }))
      // extra reducers for displaybatch
      .addCase(displayCertificate.pending, (state) => ({
        ...state,
        loggedin: 'false',
        status: 'loading',
      }))
      .addCase(displayCertificate.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        loggedin: 'true',
        certificate: action.payload,
        status: 'done',
      }))
      .addCase(displayCertificate.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default certificatesSlice.reducer;
