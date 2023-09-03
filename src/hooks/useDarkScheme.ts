import { toggleDarkScheme } from "@/utilities/darkScheme";
import { useEffect, useState } from "react";

export function useDarkScheme() {
  const [isDarkScheme, setIsDarkScheme] = useState(
    !!document.querySelector("[data-prefers-color-scheme=dark]")
  );

  useEffect(() => {
    toggleDarkScheme(!isDarkScheme);
  }, [isDarkScheme]);

  return {
    isDarkScheme,
    toggle() {
      setIsDarkScheme((prev) => !prev);
    },
    enable() {
      setIsDarkScheme(true);
    },
    disable() {
      setIsDarkScheme(false);
    },
  };
}
