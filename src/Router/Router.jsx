import { createBrowserRouter } from "react-router";
import Root from "../Components/Root/Root";
import HomeLayout from "../Components/HomeLayout/HomeLayout";
import LoginForm from "../Components/LoginForm/LoginForm";
import MyProfile from "../Components/MyProfile/MyProfile";

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
        path: "/profile",
        element: <MyProfile></MyProfile>,
      },
    ],
  },
]);

export { router };
