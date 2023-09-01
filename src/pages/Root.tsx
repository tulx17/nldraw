import { Fragment } from "react";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}
