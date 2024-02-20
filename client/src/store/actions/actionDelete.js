import { createSlice } from "@reduxjs/toolkit";
import MessageAlert from "../../ErrorHandlers/errorHandle";
import axios from "../../instances/instance";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    handleError: (state, { payload }) => {
      state.isError = payload;
    },
    handleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    handleSuccess: (state, { payload }) => {
      state.isSuccess = payload;
    },
  },
});

export function handleOnDelete(myJobId) {
  // console.log(myJobId);
  const token = localStorage.getItem("access_token");

  return async (dispatch) => {
    dispatch(handleLoading(true));
    dispatch(handleSuccess(false));
    try {
      await axios.delete(`/my-jobs/${myJobId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(handleLoading(false));
      dispatch(handleSuccess(true));
    } catch (error) {
      dispatch(handleError(true));
      MessageAlert(error);
    }
  };
}

export const { handleError, handleLoading, handleSuccess } =
  counterSlice.actions;

export default counterSlice.reducer;
