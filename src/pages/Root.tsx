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

  // side-effect when app preferences changed
  useEffect(() => {
    if (!initialized) return;

    void writePreferences().catch();

    void switchDark(preferences.darkMode).catch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences]);

  async function reloadPreferences() {
    let savedPreferencesString = await readFile({
      path: joinPath(META_DIR, PREFERENCES_FILE),
    });

    if (!savedPreferencesString) {
      savedPreferencesString = JSON.stringify(DEFAULT_PREFERENCES);

      await writePreferences(DEFAULT_PREFERENCES);
    }

    let savedPreferences = JSON.parse(savedPreferencesString) as Preferences;

    if (Object.keys(savedPreferences).length !== Object.keys(DEFAULT_PREFERENCES).length) {
      savedPreferences = { ...DEFAULT_PREFERENCES, ...savedPreferences };

      await writePreferences(savedPreferences);
    }

    preferencesDispatch({
      type: "reload",
      payload: savedPreferences,
    });

    await switchDark(savedPreferences.darkMode);
  }

  async function writePreferences(newPreferences?: Preferences) {
    newPreferences ??= preferences;
    await writeFile({
      path: joinPath(META_DIR, PREFERENCES_FILE),
      data: JSON.stringify(newPreferences),
    })

    return newPreferences;
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
