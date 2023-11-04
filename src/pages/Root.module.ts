import { META_DIR, PREFERENCES_FILE } from "@/constants/primitive";
import { Preferences } from "@/providers";
import { disableDarkMode, enableDarkMode } from "@/utilities/darkMode";
import { joinPath, writeFile } from "@/utilities/filesystem";
// import _ from "lodash";

export async function enableDark(preferences: Preferences) {
  const updatedPreferences = { ...preferences, darkMode: true } as Preferences;

  // if (_.isEqual(preferences, updatedPreferences)) return;

  await writeFile({
    path: joinPath(META_DIR, PREFERENCES_FILE),
    data: JSON.stringify(updatedPreferences),
  }).then(enableDarkMode);
}

export async function disableDark(preferences: Preferences) {
  const updatedPreferences = { ...preferences, darkMode: false } as Preferences;

  // if (_.isEqual(preferences, updatedPreferences)) return;

  await writeFile({
    path: joinPath(META_DIR, PREFERENCES_FILE),
    data: JSON.stringify(updatedPreferences),
  }).then(disableDarkMode);
}


export async function switchDark(preferences: Preferences) {
  switch (preferences.darkMode) {
    case false:
      await disableDark(preferences);
      break;

    case true:
      await enableDark(preferences);
      break;
  }
}
