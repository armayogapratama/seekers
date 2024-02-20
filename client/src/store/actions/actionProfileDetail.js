import { createSlice } from "@reduxjs/toolkit";
import axios from "../../instances/instance";
import MessageAlert from "../../ErrorHandlers/errorHandle";
import { setLoading } from "./actionUser";

const initialState = {
  data: [],
  loading: false,
};

export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    profileList: (state, { payload }) => {
      state.data = payload;
    },
    loading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export function fetchProfile(id) {
  const token = localStorage.getItem("access_token");
  return async (dispatch) => {
    dispatch(loading(true));
    try {
      const { data } = await axios.get(`/profiles/${id}/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data.profile);
      dispatch(profileList(data.profile));

      setTimeout(() => {
        dispatch(loading(false));
      }, 1000);
    } catch (error) {
      MessageAlert(error);
    }
  };
}

export const { profileList, loading } = profileSlice.actions;
export default profileSlice.reducer;
