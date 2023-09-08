import { DEFAULT_PREFERENCES } from "@/constants/default";
import { META_DIR, PREFERENCES_FILE } from "@/constants/primitive";
import {
  useInit,
  useMediaQuery,
  useNativeAppEvent,
  usePreferencesContext,
} from "@/hooks";
import { minimizeApp } from "@/utilities/app";
import { disableDarkMode, enableDarkMode } from "@/utilities/darkMode";
import { joinPath, readFile, writeFile } from "@/utilities/filesystem";
import { SafeArea } from "antd-mobile";
import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function Root() {
  const navigate = useNavigate();
  const [preferences, preferencesDispatch] = usePreferencesContext();
  const matchesDark = useMediaQuery("(prefers-color-scheme: dark)");

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

  useEffect(() => {
    if (!initialized) return;

    switchDark(preferences.darkMode);
  }, [preferences]);

  async function reloadPreferences() {
    const savedPreferencesString = await readFile({
      path: joinPath(META_DIR, PREFERENCES_FILE),
    });

    if (!savedPreferencesString) {
      await writeFile({
        path: joinPath(META_DIR, PREFERENCES_FILE),
        data: JSON.stringify(DEFAULT_PREFERENCES),
      });

      switchDark(DEFAULT_PREFERENCES.darkMode);

      return;
    }

    const savedPreferences = JSON.parse(savedPreferencesString);

    preferencesDispatch({
      type: "reload",
      payload: savedPreferences,
    });

    switchDark(savedPreferences.darkMode);

    return;
  }

  async function switchDark(isDark?: boolean) {
    switch (isDark) {
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
  }

  async function enableDark() {
    await writeFile({
      path: joinPath(META_DIR, PREFERENCES_FILE),
      data: JSON.stringify({ ...preferences, darkMode: true }),
    }).then(enableDarkMode);
  }

  async function disableDark() {
    await writeFile({
      path: joinPath(META_DIR, PREFERENCES_FILE),
      data: JSON.stringify({ ...preferences, darkMode: false }),
    }).then(disableDarkMode);
  }

  return (
    <Fragment>
      <SafeArea position="top" />
      <Outlet />
      <SafeArea position="bottom" />
    </Fragment>
  );
}
