import { useMediaQuery, useNativeAppEvent } from "@/hooks";
import { disableDarkScheme, enableDarkScheme } from "@/utilities/darkScheme";
import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function Root() {
  const navigate = useNavigate();

  useNativeAppEvent({
    backButton({ canGoBack }) {
      if (!canGoBack) return;
      navigate(-1);
    },
  });

  const matchesDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    switch (matchesDark) {
      case false:
        disableDarkScheme();
        break;

      default:
        enableDarkScheme();
        break;
    }
  }, [matchesDark]);

  return (
    <Fragment>
      {/* <Stack
        style={{
          width: "100%",
        }}
        direction={"vertical"}
      > */}
      <Outlet />
      {/* </Stack> */}
    </Fragment>
  );
}
