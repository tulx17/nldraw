import { setStatusBarDark, setStatusBarLight } from "@/utilities/statusBar";

export function enableDarkMode() {
  setStatusBarDark().then(() =>
    document.documentElement.setAttribute("data-prefers-color-scheme", "dark")
  );
}

export function disableDarkMode() {
  setStatusBarLight().then(() =>
    document.documentElement.setAttribute("data-prefers-color-scheme", "light")
  );
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
