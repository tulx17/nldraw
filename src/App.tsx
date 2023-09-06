import { init } from "@/App.module";
import { useInit } from "@/hooks";
import { AntDProvider, PreferencesProvider, RouterProvider } from "@/providers";
import { Fragment } from "react";

export function App() {
  useInit({
    init,
  });

  return (
    <Fragment>
      <PreferencesProvider>
        <AntDProvider>
          <RouterProvider />
        </AntDProvider>
      </PreferencesProvider>
    </Fragment>
  );
}
