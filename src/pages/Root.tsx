import { Stack } from "@/components";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <Fragment>
      <Stack
        style={{
          width: "100%",
        }}
        direction={"vertical"}
      >
        <Outlet />
      </Stack>
    </Fragment>
  );
}
