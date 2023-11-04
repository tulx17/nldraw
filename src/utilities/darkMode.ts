import { setStatusBarDark, setStatusBarLight } from "@/utilities/statusBar";

export function enableDarkMode() {
  void setStatusBarDark().then(() =>
    document.documentElement.setAttribute("data-prefers-color-scheme", "dark")
  ).catch();
}

export function disableDarkMode() {
  void setStatusBarLight().then(() =>
    document.documentElement.setAttribute("data-prefers-color-scheme", "light")
  ).catch();
}

export function toggleDarkMode(isDark?: boolean) {
  switch (isDark) {
    case true:
      disableDarkMode();
      break;

    case false:
      enableDarkMode();
      break;
  }
}
