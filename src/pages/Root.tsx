import { Loading } from "@/components";
import { DEFAULT_PREFERENCES } from "@/constants/default";
import { META_DIR, PREFERENCES_FILE } from "@/constants/primitive";
import { useInit, useNativeAppEvent, usePreferencesContext } from "@/hooks";
import { switchDark } from "@/pages/Root.module";
import { Preferences } from "@/providers";
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
        void minimizeApp();
        return;
      }

      navigate(-1);
      return;
    },
  });

  useEffect(() => {
    if (!initialized) return;

    void switchDark(preferences).catch();
  }, [initialized, preferences]);

  async function reloadPreferences() {
    let savedPreferencesString = await readFile({
      path: joinPath(META_DIR, PREFERENCES_FILE),
    });

    if (!savedPreferencesString) {
      savedPreferencesString = JSON.stringify(DEFAULT_PREFERENCES);

      await writeFile({
        path: joinPath(META_DIR, PREFERENCES_FILE),
        data: savedPreferencesString,
      });
    }

    const savedPreferences = JSON.parse(savedPreferencesString) as Preferences;

    preferencesDispatch({
      type: "reload",
      payload: savedPreferences,
    });

    void switchDark(savedPreferences);

    return;
  }

  if (!initialized) return <Loading />;

  return (
    <Fragment>
      <div style={{ background: "var(--bg)" }}>
        <SafeArea position="top" />
      </div>
      <Outlet />
      <div style={{ background: "var(--bg)" }}>
        <SafeArea position="bottom" />
      </div>
    </Fragment>
  );
}
