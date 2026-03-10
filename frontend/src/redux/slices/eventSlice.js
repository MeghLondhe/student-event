import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
 
export const getEvents = createAsyncThunk(
  'students/events',
  async (_, { rejectWithValue, getState }) => {
    try {
      // try to get token first from redux state, fallback to localStorage
      const token = getState()?.auth?.token || localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get('http://localhost:5003/api/student/events', { headers });
      return res.data;
    } catch (err) {
      // normalize error payload
      const payload = err.response?.data || err.message || 'API Error';
      return rejectWithValue(payload);
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    data: [],
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];  // ensure array fallback
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load events';
      });
  }
});

export default eventSlice.reducer;
