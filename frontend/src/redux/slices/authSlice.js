import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// async thunks for signup and login (adjust URLs/port if needed)
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5003/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);
      return data; // expected { token, user, message }
    } catch (err) {
      return rejectWithValue({ message: err.message || 'Network error' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5003/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);
      return data;
    } catch (err) {
      return rejectWithValue({ message: err.message || 'Network error' });
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
      })      
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Signup failed';
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      });
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;