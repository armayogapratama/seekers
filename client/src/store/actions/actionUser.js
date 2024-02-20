import { createSlice } from "@reduxjs/toolkit";
import axios from "../../instances/instance";
import MessageAlert from "../../ErrorHandlers/errorHandle";

const initialState = {
  data: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userList: (state, { payload }) => {
      state.data = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export function fetchUsers() {
  const token = localStorage.getItem("access_token");

  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(userList(data.users));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    } catch (error) {
      MessageAlert(error);
    }
  };
}

export const { userList, setLoading } = userSlice.actions;
export default userSlice.reducer;
