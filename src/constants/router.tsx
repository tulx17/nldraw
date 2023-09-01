import { Draw, Explore, Preferences, Root } from "@/pages";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to={"explore"}
            replace={true}
          />
        ),
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "preferences",
        element: <Preferences />,
      },
      {
        path: "draw/:name",
        element: <Draw />,
      },
    ],
  },
]);
