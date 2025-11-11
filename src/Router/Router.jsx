import { createBrowserRouter } from "react-router";
import Root from "../Components/Root/Root";
import HomeLayout from "../Components/HomeLayout/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        element: <HomeLayout></HomeLayout>,
      },
    ],
  },
]);

export { router };
