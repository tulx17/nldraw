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

  statusBar.hide();
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

export async function setStatusBarColor(color: string) {
  await statusBar.setColor({ color });
}

export async function setStatusBarDark() {
  await statusBar.setStyle({ style: Style.Dark });
  await statusBar.setColor({ color: "#242424" });
}

export async function setStatusBarLight() {
  await statusBar.setStyle({ style: Style.Light });
  await statusBar.setColor({ color: "#ffffffde" });
}
