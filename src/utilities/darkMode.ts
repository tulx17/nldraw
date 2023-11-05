import { setStatusBarDark, setStatusBarLight } from "@/utilities/statusBar";

export async function enableDarkMode() {
  await setStatusBarDark().catch();
  document.documentElement.setAttribute("data-prefers-color-scheme", "dark")
}

export async function disableDarkMode() {
  await setStatusBarLight().catch();
  document.documentElement.setAttribute("data-prefers-color-scheme", "light")
}

export function toggleDarkMode(isDark?: boolean) {
  switch (isDark) {
    case true:
      void disableDarkMode().catch();
      break;

    case false:
      void enableDarkMode().catch();
      break;
  }
}
