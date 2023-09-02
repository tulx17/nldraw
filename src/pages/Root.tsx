import { Stack } from "@/components";
import { useNativeAppEvent } from "@/hooks";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { disableDarkMode, enableDarkMode } from "@/utilities/darkMode";
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
        disableDarkMode();
        break;

      default:
        enableDarkMode();
        break;
    }
  }, [matchesDark]);

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
