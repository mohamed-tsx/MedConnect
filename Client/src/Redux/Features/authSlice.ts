import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

interface authType {
  user: {
    username: string;
    email: string;
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
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<authType["user"]>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    sigInFailed: (state, action: PayloadAction<authType["error"]>) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, sigInFailed } = authSlice.actions;
export default authSlice.reducer;
