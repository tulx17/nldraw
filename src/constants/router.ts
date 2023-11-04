import {
  PATH_DRAW,
  PATH_EXPLORE,
  PATH_PREFERENCES,
} from "@/constants/primitive";
import { Draw, Explore, Preferences, Root } from "@/pages";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const ROUTER = createBrowserRouter([
  {
    Component: Root,
    children: [
      {
        index: true,
        Component: () => Navigate({ to: PATH_EXPLORE, replace: true })
      },
      {
        path: `${PATH_EXPLORE}/*`,
        Component: Explore
      },
      {
        path: PATH_PREFERENCES,
        Component: Preferences
      },
      {
        path: `${PATH_DRAW}/:path`,
        Component: Draw
      },
    ],
  },
]);
