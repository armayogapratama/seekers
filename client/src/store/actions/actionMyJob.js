import { createSlice } from "@reduxjs/toolkit";
import axios from "../../instances/instance";

const initialState = {
  data: [],
};

export const myJobSlice = createSlice({
  name: "myJob",
  initialState,
  reducers: {
    addMyJob: (state, action) => {
      state.data.push(action.payload);
    },
    jobsList: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export function postMyJob(jobDetail) {
  return async (dispatch) => {
    try {
      let { data } = await axios({
        method: "POST",
        url: "my-jobs/new-my-job",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
        data: jobDetail,
      });
      dispatch(addMyJob(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// Action creators are generated for each case reducer function
export const { addMyJob, jobsList } = myJobSlice.actions;
export default myJobSlice.reducer;
