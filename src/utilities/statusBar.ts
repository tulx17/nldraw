import { statusBar } from "@/utilities/capacitor";

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
