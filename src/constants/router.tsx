import {
  PATH_DRAW,
  PATH_EXPLORE,
  PATH_PREFERENCES,
} from "@/constants/primitive";
import { Draw, Explore, Preferences, Root } from "@/pages";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const ROUTER = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to={PATH_EXPLORE}
            replace={true}
          />
        ),
      },
      {
        path: `${PATH_EXPLORE}/*`,
        element: <Explore />,
      },
      {
        path: PATH_PREFERENCES,
        element: <Preferences />,
      },
      {
        path: `${PATH_DRAW}/:path`,
        element: <Draw />,
      },
    ],
  },
]);
