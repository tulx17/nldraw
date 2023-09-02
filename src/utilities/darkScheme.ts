export function enableDarkScheme() {
  document.documentElement.setAttribute("data-prefers-color-scheme", "dark");
}

export function disableDarkScheme() {
  document.documentElement.setAttribute("data-prefers-color-scheme", "light");
}

export function toggleDarkScheme(isDark?: boolean) {
  switch (isDark) {
    case true:
      disableDarkScheme();
      break;

    // case false:
    //   enableDarkMode();
    //   break;

    default:
      enableDarkScheme();
      break;
  }
}
