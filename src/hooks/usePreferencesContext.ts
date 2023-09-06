import { PreferencesContext } from "@/providers";
import { useContext } from "react";

export function usePreferencesContext() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error(
      "usePreferencesContext must be used within a PreferencesProvider"
    );
  }

  return context;
}
