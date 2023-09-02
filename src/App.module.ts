import { EMPTY_STRING } from "@/constants/primitive";
import { disableDarkMode, enableDarkMode } from "@/utilities/darkMode";
import { createDir } from "@/utilities/filesystem";
import { logger } from "@/utilities/logger";
import { hideStatusBar } from "@/utilities/statusBar";
import { getMatchesMedia } from "@/utilities/window";

export async function init() {
  // #region hide status bar
  await hideStatusBar();
  logger.log("status bar SHOULD hidden");
  // #endregion

  // #region init WORK_DIR
  await createDir({ path: EMPTY_STRING });
  logger.log("working directory SHOULD be created");
  // #endregion

  // #region enable dark mode
  const matchesDark = getMatchesMedia("(prefers-color-scheme: dark)").matches;
  switch (matchesDark) {
    case false:
      disableDarkMode();
      break;

    default:
      enableDarkMode();
      break;
  }
  // #endregion
}
