export function enableDarkMode() {
  document.documentElement.setAttribute("data-prefers-color-scheme", "dark");
}

export function disableDarkMode() {
  document.documentElement.setAttribute("data-prefers-color-scheme", "light");
}

export function toggleDarkMode(isDark?: boolean) {
  switch (isDark) {
    case true:
      disableDarkMode();
      break;

    // case false:
    //   enableDarkMode();
    //   break;

    default:
      enableDarkMode();
      break;
  }
}
