import { status } from "@/utilities/capacitor";

export async function showStatusBar() {
  const { visible } = await getStatusBarInfo();

  if (visible) return;

  await status.show();
}

export async function hideStatusBar() {
  const { visible } = await getStatusBarInfo();

  if (!visible) return;

  status.hide();
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
