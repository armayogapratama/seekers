import { createSlice } from "@reduxjs/toolkit";
import MessageAlert from "../../ErrorHandlers/errorHandle";
import axios from "../../instances/instance";

const initialState = {
  addNewUser: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    register: (state, { payload }) => {
      state.addNewUser.push(payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { register } = counterSlice.actions;

export function addUser(newUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/users/register", newUser);
      dispatch(register(data.user));
    } catch (error) {
      MessageAlert(error);
    }
  };
}

export default counterSlice.reducer;
