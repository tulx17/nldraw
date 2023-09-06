import { useInit, useNativeAppEvent, usePreferencesContext } from "@/hooks";
import { minimizeApp } from "@/utilities/app";
import { disableDarkScheme, enableDarkScheme } from "@/utilities/darkScheme";
import { Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function Root() {
  const navigate = useNavigate();
  const [preferences, preferencesDispatch] = usePreferencesContext();

  useInit({
    init() {
      // const savedPreferences = await readFile({
      //   path: joinPath(META_DIR, PREFERENCES_FILE),
      // });

      // if (!savedPreferences) {
      //   await writeFile({
      //     path: joinPath(META_DIR, PREFERENCES_FILE),
      //     data: JSON.stringify(DEFAULT_PREFERENCES),
      //   });
      //   preferencesDispatch({ type: "reload", payload: DEFAULT_PREFERENCES });
      // }

      switch (preferences.darkScheme) {
        case false:
          disableDarkScheme();
          preferencesDispatch({ type: "darkScheme.disable" });
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
