import { getMatchesMedia } from "@/utilities/window";
import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(getMatchesMedia(query).matches);

  function handleChange() {
    setMatches(getMatchesMedia(query).matches);
  }

  useEffect(() => {
    const matchMedia = getMatchesMedia(query);

    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
