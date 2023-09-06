import { ExploreContext } from "@/providers";
import { useContext } from "react";

export function useExploreContext() {
  const context = useContext(ExploreContext);

  if (!context) {
    throw new Error("useExploreContext must be used within a ExploreProvider");
  }

  return context;
}
