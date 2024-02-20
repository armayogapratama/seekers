import { createSlice } from "@reduxjs/toolkit";
import axios from "../../instances/instance";
import MessageAlert from "../../ErrorHandlers/errorHandle";

const initialState = {
  login: [],
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.login.push(payload);
    },
  },
});

export const { login } = loginSlice.actions;

export function isLogin(login) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/users/login", login);

      const token = data.access_token;
      const isToken = localStorage.setItem("access_token", token);

      dispatch(login(isToken));
    } catch (error) {
      MessageAlert(error);
    }
  };
}

export default loginSlice.reducer;
