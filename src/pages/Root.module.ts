import { disableDarkMode, enableDarkMode } from "@/utilities/darkMode";
// import _ from "lodash";

export async function switchDark(darkMode: boolean) {
  switch (darkMode) {
    case false:
      await disableDarkMode().catch();
      break;

    case true:
      await enableDarkMode().catch();
      break;
  }
}
