import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {login, registerUser} from './authActions';

interface LoginState {
  loading: boolean;
  userData: any;
  error: any;
}

const initialState: LoginState = {
  loading: false,
  userData: {},
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        console.log(JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const loadingState = (state: RootState) =>
  state.rootReducer.auth.loading;
export default authSlice.reducer;
