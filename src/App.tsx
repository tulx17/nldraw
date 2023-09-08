import { AntDProvider, PreferencesProvider, RouterProvider } from "@/providers";
import { Fragment } from "react";

export function App() {
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
