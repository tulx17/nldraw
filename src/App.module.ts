import { createDir } from "@/utilities/filesystem";
import { logger } from "@/utilities/logger";
import { hideStatusBar } from "@/utilities/statusBar";

export async function init() {
  // #region hide status bar
  await hideStatusBar();
  logger.log("status bar SHOULD hidden");
  // #endregion

  // #region init WORK_DIR
  await createDir({ path: "" });
  logger.log("working directory SHOULD be created");
  // #endregion
}