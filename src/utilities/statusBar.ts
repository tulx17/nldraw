import { status } from "@/utilities/capacitor";

export async function showStatusBar() {
  const { visible } = await getStatusBarInfo();

  if (!visible) status.show();
}

export async function hideStatusBar() {
  const { visible } = await getStatusBarInfo();

  if (visible) status.hide();
}

export async function toggleStatusBar() {
  const { visible } = await getStatusBarInfo();

  switch (visible) {
    case false:
      await status.show();
      break;

    default:
      await status.hide();
      break;
  }
}

async function getStatusBarInfo() {
  const info = await status.getInfo();

  return info;
}
