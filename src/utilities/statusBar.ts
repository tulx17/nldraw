import { COLOR_BG, COLOR_BG_DARK } from "@/constants/primitive";
import { statusBar } from "@/utilities/capacitor";
import { Style } from "@capacitor/status-bar";

export async function showStatusBar() {
  const { visible } = await getStatusBarInfo();

  if (visible) return;

  await statusBar.show();
}

export async function hideStatusBar() {
  const { visible } = await getStatusBarInfo();

  if (!visible) return;

  void statusBar.hide().catch();
}

export async function toggleStatusBar() {
  const { visible } = await getStatusBarInfo();

  switch (visible) {
    case false:
      await statusBar.show();
      break;

    default:
      await statusBar.hide();
      break;
  }
}

async function getStatusBarInfo() {
  const info = await statusBar.getInfo();

  return info;
}

export async function setStatusBarOverlay() {
  await statusBar.setOverlay({ overlay: true });
}

export async function setStatusBarBgColor(color: string) {
  await statusBar.setBgColor({ color }).catch();
}

export async function setStatusBarDark() {
  await statusBar.setStyle({ style: Style.Dark }).catch();
  await setStatusBarBgColor(COLOR_BG_DARK).catch();
}

export async function setStatusBarLight() {
  await statusBar.setStyle({ style: Style.Light }).catch();
  await setStatusBarBgColor(COLOR_BG).catch();
}
