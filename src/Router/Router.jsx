import { createBrowserRouter } from "react-router";
import Root from "../Components/Root/Root";
import HomeLayout from "../Components/HomeLayout/HomeLayout";
import LoginForm from "../Components/LoginForm/LoginForm";
import MyProfile from "../Components/MyProfile/MyProfile";
import PrivateRoute from "./PrivateRoute";
import MyCollection from "../Components/MyCollection/MyCollection";
import Register from "../Components/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        element: <HomeLayout></HomeLayout>,
      },
      {
        path: "/login",
        element: <LoginForm></LoginForm>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/mycollection",
        element: (
          <PrivateRoute>
            <MyCollection></MyCollection>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export { router };
