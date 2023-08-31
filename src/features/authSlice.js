import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: localStorage.getItem("dudsaa_user")
    ? JSON.parse(localStorage.getItem("dudsaa_user"))
    : null,

  token: Cookies.get("dudsaa_token")
    ? Cookies.get("dudsaa_token")
    : null,
  role: localStorage.getItem("dudsaa_user_role")
    ? JSON.parse(localStorage.getItem("dudsaa_user_role"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authToken: (state, action) => {
      Cookies.set("dudsaa_token", action.payload, { expires: 2 });
    },

    authUser: (state, action) => {
      localStorage.setItem("dudsaa_user", JSON.stringify(action.payload));
    },

    userRole: (state, action) => {
      localStorage.setItem("dudsaa_user_role", JSON.stringify(action.payload));
    },




    logout: (state) => {
      Cookies.remove("dudsaa_token");
      localStorage.removeItem("dudsaa_user");
      localStorage.removeItem("dudsaa_user_role");
      

      state.user = null;
      state.token = null;
      state.role = null;

    },
  },
});

export const { authUser, userRole, authToken, logout } =
  authSlice.actions;
export default authSlice.reducer;
