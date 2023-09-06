import { useInit, useNativeAppEvent, usePreferencesContext } from "@/hooks";
import { minimizeApp } from "@/utilities/app";
import { disableDarkScheme, enableDarkScheme } from "@/utilities/darkScheme";
import { Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function Root() {
  const navigate = useNavigate();
  const [{ darkScheme }, preferencesDispatch] = usePreferencesContext();

  useInit({
    init() {
      switch (darkScheme) {
        case false:
          disableDarkScheme();
          break;

        default:
          enableDarkScheme();
          preferencesDispatch({ type: "darkScheme.enable" });
          break;
      }
    },
  });

  useNativeAppEvent({
    backButton: ({ canGoBack }) => {
      if (canGoBack) {
        navigate(-1);
        return;
      }

      minimizeApp();
    },
  });

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}
