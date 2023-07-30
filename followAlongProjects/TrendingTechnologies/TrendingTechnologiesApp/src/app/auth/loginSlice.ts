import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {loadUser, login, registerUser} from './authActions';

interface LoginState {
  loading: boolean;
  userData: any;
  error: any;
  loginSuccess: boolean | null
  registerSuccess: boolean | null
}

const initialState: LoginState = {
  loading: false,
  userData: {},
  error: null,
  loginSuccess: null,
  registerSuccess: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.userData = null;
        state.loginSuccess = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.loginSuccess = true
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.pending, (state, _) => {
        state.loading = true;
        state.registerSuccess = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerSuccess = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerSuccess = false;
        state.error = action.payload
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.loginSuccess = true
        console.log(JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loginSuccess = false;
      });
  },
});

export const loadingState = (state: RootState) =>
  state.rootReducer.auth.loading;
export const loginErrorState = (state: RootState) =>
  state.rootReducer.auth.error;
export const loginState = (state: RootState) => state.rootReducer.auth.loginSuccess
export const registerStatus = (state: RootState) => state.rootReducer.auth.registerSuccess
export default authSlice.reducer;
