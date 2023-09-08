import { DEFAULT_PREFERENCES } from "@/constants/default";
import { META_DIR, PREFERENCES_FILE } from "@/constants/primitive";
import {
  useInit,
  useMediaQuery,
  useNativeAppEvent,
  usePreferencesContext,
} from "@/hooks";
import { minimizeApp } from "@/utilities/app";
import { disableDarkScheme, enableDarkScheme } from "@/utilities/darkScheme";
import { joinPath, readFile, writeFile } from "@/utilities/filesystem";
import { setStatusBarDark, setStatusBarLight } from "@/utilities/statusBar";
import { SafeArea } from "antd-mobile";
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
      if (!canGoBack) {
        minimizeApp();
        return;
      }

      navigate(-1);
      return;
    },
  });

  const matchesDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (!initialized) return;

    switch (preferences.darkScheme) {
      case false:
        disableDark();
        break;

      case true:
        enableDark();
        break;

      default:
        switch (matchesDark) {
          case false:
            disableDark();
            break;

          case true:
            enableDark();
            break;
        }
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

  async function enableDark() {
    await writeFile({
      path: joinPath(META_DIR, PREFERENCES_FILE),
      data: JSON.stringify({ ...preferences, darkScheme: true }),
    })
      .then(async () => await setStatusBarDark())
      .then(async () => await enableDarkScheme());
  }

  async function disableDark() {
    await writeFile({
      path: joinPath(META_DIR, PREFERENCES_FILE),
      data: JSON.stringify({ ...preferences, darkScheme: false }),
    })
      .then(async () => await setStatusBarLight())
      .then(async () => await disableDarkScheme());
  }

  return (
    <Fragment>
      <SafeArea position="top" />
      <Outlet />
      <SafeArea position="bottom" />
    </Fragment>
  );
}
