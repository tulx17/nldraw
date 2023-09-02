import { init } from "@/App.module";
import { useInit } from "@/hooks";
import { RouterProvider } from "@/providers";
import { Fragment } from "react";

export function App() {
  useInit({
    init,
  });

  return (
    <Fragment>
      <RouterProvider />
    </Fragment>
  );
}
