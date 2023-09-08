import { DEFAULT_PREFERENCES } from "@/constants/default";
import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

export type Preferences = {
  darkMode: boolean;
};

type PreferencesAction =
  | { type: "reload"; payload: Preferences }
  | { type: "reset" }
  | { type: "darkMode.toggle" }
  | { type: "darkMode.enable" }
  | { type: "darkMode.disable" };

type PreferencesProviderProps = PropsWithChildren;

export const PreferencesContext = createContext<
  [Preferences, Dispatch<PreferencesAction>] | null
>(null);

export function PreferencesProvider(props: PreferencesProviderProps) {
  const [preferences, dispatch] = useReducer(
    preferencesReducer,
    DEFAULT_PREFERENCES
  );

  return (
    <PreferencesContext.Provider
      value={[preferences, dispatch]}
      {...props}
    />
  );
}

function preferencesReducer(state: Preferences, action: PreferencesAction) {
  switch (action.type) {
    case "reload":
      return { ...action.payload };
    case "darkMode.toggle":
      return { ...state, darkMode: !state.darkMode };
    case "darkMode.enable":
      return { ...state, darkMode: true };
    case "darkMode.disable":
      return { ...state, darkMode: false };
    default:
      return { ...state };
  }
}
