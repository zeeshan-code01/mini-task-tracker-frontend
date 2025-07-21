// src/redux/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
  token: string | null;
  user: any; // You can define a proper type if needed
}

const initialState: AuthState = {
  token: sessionStorage.getItem("token"),
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: any }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      // Persist to sessionStorage
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      sessionStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
