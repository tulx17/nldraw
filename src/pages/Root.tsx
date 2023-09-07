import { DEFAULT_PREFERENCES } from "@/constants/default";
import { META_DIR, PREFERENCES_FILE } from "@/constants/primitive";
import { useInit, useNativeAppEvent, usePreferencesContext } from "@/hooks";
import { minimizeApp } from "@/utilities/app";
import { disableDarkScheme, enableDarkScheme } from "@/utilities/darkScheme";
import { joinPath, readFile, writeFile } from "@/utilities/filesystem";
import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function Root() {
  const navigate = useNavigate();
  const [preferences, preferencesDispatch] = usePreferencesContext();

  const initialized = useInit({
    async init() {
      await reloadPreferences();
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

  useEffect(() => {
    if (!initialized) return;

    switch (preferences.darkScheme) {
      case false:
        writeFile({
          path: joinPath(META_DIR, PREFERENCES_FILE),
          data: JSON.stringify({ ...preferences, darkScheme: false }),
        }).then(disableDarkScheme);
        break;

      default:
        writeFile({
          path: joinPath(META_DIR, PREFERENCES_FILE),
          data: JSON.stringify({ ...preferences, darkScheme: true }),
        }).then(enableDarkScheme);
        break;
    }
  }, [preferences]);

  async function reloadPreferences() {
    const savedPreferences = await readFile({
      path: joinPath(META_DIR, PREFERENCES_FILE),
    });

    if (!savedPreferences) {
      await writeFile({
        path: joinPath(META_DIR, PREFERENCES_FILE),
        data: JSON.stringify(DEFAULT_PREFERENCES),
      });
      return;
    }

    preferencesDispatch({
      type: "reload",
      payload: JSON.parse(savedPreferences),
    });
    return;
  }

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}
