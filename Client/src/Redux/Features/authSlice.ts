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
  },
});

export const { signUpStart, signUpSuccess, signUpFailed } = authSlice.actions;
export default authSlice.reducer;
