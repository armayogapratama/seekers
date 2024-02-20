import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../layouts/layout";
import LoginView from "../components/UserViews/LoginViews/LoginView";
import RegisterView from "../components/UserViews/RegisterViews/registerView";
import HomeView from "../components/HomeViews/homeView";
import NewProfileView from "../components/ProfileViews/NewProfileViews/newProfileView";
import UserView from "../components/UserViews/UserViews/userView";
import ProfileDetailView from "../components/ProfileViews/ProfileDetailViews/profileDetail";
import UpdateProfileView from "../components/ProfileViews/UpdateProfileViews/updateProfileView";
import UploadImageView from "../components/ProfileViews/UploadViews/uploadView";
import MyJobView from "../components/MyJobViews/myJobView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/login",
        element: <LoginView />,
        loader: () => {
          if (localStorage.access_token) {
            return redirect("/");
          }
          return null;
        },
      },
      {
        path: "/register",
        element: <RegisterView />,
      },
      {
        path: "/users",
        element: <UserView />,
      },
      {
        path: "/profiles/:id",
        element: <ProfileDetailView />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/profiles/:id/new-profiles",
        element: <NewProfileView />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/profiles/:id/update-profile",
        element: <UpdateProfileView />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/profiles/:id/upload-image",
        element: <UploadImageView />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/my-jobs",
        element: <MyJobView />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
