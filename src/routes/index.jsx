import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import ErrorPage from "../error-pages/ErrorPage";
import Home, { loader as homeLoader } from "./Home";
import FilmDetailPage, {
  loader as FilmDetailPageLoader,
} from "./FilmDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "movie/:id",
        element: <FilmDetailPage />,
        loader: FilmDetailPageLoader,
      },
    ],
  },
]);
export default router;
