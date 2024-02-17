import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

interface authType {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  } | null;
  loading: boolean;
  error: boolean;
}

const initialState: authType = {
  user: null,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state, action: PayloadAction<authType["user"]>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    signUpFailed: (state, action: PayloadAction<authType["error"]>) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<authType["user"]>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    signInFailed: (state, action: PayloadAction<authType["error"]>) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.error = false;
    },
    signOutFailed: (state, action: PayloadAction<authType["error"]>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signUpStart,
  signUpSuccess,
  signUpFailed,
  signInFailed,
  signInStart,
  signInSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
} = authSlice.actions;
export default authSlice.reducer;
