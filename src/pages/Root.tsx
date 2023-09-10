import { Loading } from "@/components";
import { DEFAULT_PREFERENCES } from "@/constants/default";
import { META_DIR, PREFERENCES_FILE } from "@/constants/primitive";
import { useInit, useNativeAppEvent, usePreferencesContext } from "@/hooks";
import { switchDark } from "@/pages/Root.module";
import { minimizeApp } from "@/utilities/app";
import { joinPath, readFile, writeFile } from "@/utilities/filesystem";
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

  useEffect(() => {
    if (!initialized) return;

    switchDark(preferences);
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

      switchDark(DEFAULT_PREFERENCES);

      return;
    }

    const savedPreferences = JSON.parse(savedPreferencesString);

    preferencesDispatch({
      type: "reload",
      payload: savedPreferences,
    });

    switchDark(savedPreferences);

    return;
  }

  if (!initialized) return <Loading />;

  return (
    <Fragment>
      <SafeArea position="top" />
      <Outlet />
      <SafeArea position="bottom" />
    </Fragment>
  );
}
