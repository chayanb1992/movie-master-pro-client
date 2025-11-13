import { createBrowserRouter } from "react-router";
import Root from "../Components/Root/Root";
import HomeLayout from "../Components/HomeLayout/HomeLayout";
import LoginForm from "../Components/LoginForm/LoginForm";
import MyProfile from "../Components/MyProfile/MyProfile";
import PrivateRoute from "./PrivateRoute";
import Register from "../Components/Register/Register";
import AllMovies from "../Pages/AllMovies";
import AddMovie from "../Pages/AddMovie/AddMovie";
import MyCollection from "../Pages/AddMovie/MyCollection/MyCollection";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";
import Update from "../Pages/Update/Update";
import Watchlist from "../Pages/WatchList/WatchList";

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
        path: "/movies",
        loader: () => fetch("http://localhost:3000/allmovies"),
        element: <AllMovies></AllMovies>,
      },
      {
        path: "/movies/add",
        element: <AddMovie></AddMovie>,
      },

      {
        path: "/movies/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movies/${params.id}`),
        element: <MovieDetails></MovieDetails>,
      },
      {
        path: "/update/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/update/${params.id}`),
        element: <Update></Update>,
      },
      {
        path: "/my-collection",
        element: (
          <PrivateRoute>
            <MyCollection></MyCollection>
          </PrivateRoute>
        ),
      },
      {
        path: "/watchlist",
        element: <Watchlist></Watchlist>,
      },
    ],
  },
]);

export { router };
