import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "./Home";
import ErrorPage from "../error-pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
export default router;
