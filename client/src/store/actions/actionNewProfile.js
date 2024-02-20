import { createSlice } from "@reduxjs/toolkit";
const { id } = useParams();
import MessageAlert from "../../ErrorHandlers/errorHandle";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  data: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    newProfile: (state, { payload }) => {
      state.newData = payload;
    },
    profile: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export function fetchUser() {
  const token = localStorage.getItem("access_token");
  return async (dispacth) => {
    try {
      const { data } = await axios.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispacth(profile(data.users));
    } catch (error) {
      MessageAlert(error);
    }
  };
}
// Action creators are generated for each case reducer function
export const { newProfile, profile } = counterSlice.actions;

export default counterSlice.reducer;
