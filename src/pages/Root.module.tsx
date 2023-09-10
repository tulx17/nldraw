import { META_DIR, PREFERENCES_FILE } from "@/constants/primitive";
import { Preferences } from "@/providers";
import { disableDarkMode, enableDarkMode } from "@/utilities/darkMode";
import { joinPath, writeFile } from "@/utilities/filesystem";

export async function enableDark(preferences: Preferences) {
  await writeFile({
    path: joinPath(META_DIR, PREFERENCES_FILE),
    data: JSON.stringify({ ...preferences, darkMode: true }),
  }).then(enableDarkMode);
}

export async function disableDark(preferences: Preferences) {
  await writeFile({
    path: joinPath(META_DIR, PREFERENCES_FILE),
    data: JSON.stringify({ ...preferences, darkMode: false }),
  }).then(disableDarkMode);
}

export async function switchDark(preferences: Preferences) {
  switch (preferences.darkMode) {
    case false:
      disableDark(preferences);
      break;

    case true:
      enableDark(preferences);
      break;
  }
}
