import { configureStore } from "@reduxjs/toolkit";
import actionMyJob from "./actions/actionMyJob";
import actionUser from "./actions/actionUser";
// import actionNewProfile from "./actions/actionNewProfile";
import actionAddUser from "./actions/actionAddUser";
import actionLogin from "./actions/actionLogin";
import actionProfileDetail from "./actions/actionProfileDetail";
import actionDelete from "./actions/actionDelete";

export const store = configureStore({
  reducer: {
    myJob: actionMyJob,
    users: actionUser,
    // profiles: actionNewProfile,
    newUser: actionAddUser,
    login: actionLogin,
    profiles: actionProfileDetail,
    deleteMyJob: actionDelete,
  },
});
