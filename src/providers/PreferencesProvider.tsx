import { DEFAULT_PREFERENCES } from "@/constants/default";
import { META_DIR, PREFERENCES_FILE } from "@/constants/primitive";
import { joinPath, readFile, writeFile } from "@/utilities/filesystem";
import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

export type Preferences = {
  darkScheme: boolean;
};

type PreferencesAction =
  | { type: "reload"; payload: Preferences }
  | { type: "reset" }
  | { type: "darkScheme.toggle" }
  | { type: "darkScheme.enable" }
  | { type: "darkScheme.disable" };

type PreferencesProviderProps = PropsWithChildren;

export const PreferencesContext = createContext<
  [Preferences, Dispatch<PreferencesAction>] | null
>(null);

export function PreferencesProvider(props: PreferencesProviderProps) {
  const [preferences, dispatch] = useReducer(
    preferencesReducer,
    DEFAULT_PREFERENCES,
    preferencesInitializer
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
    case "darkScheme.toggle":
      return { ...state, darkScheme: !state.darkScheme };
    case "darkScheme.enable":
      return { ...state, darkScheme: true };
    case "darkScheme.disable":
      return { ...state, darkScheme: false };
    default:
      return { ...state };
  }
}

function preferencesInitializer() {
  let result = DEFAULT_PREFERENCES;

  readFile({
    path: joinPath(META_DIR, PREFERENCES_FILE),
  })
    .then((data) => (result = JSON.parse(data)))
    .catch(() =>
      writeFile({
        path: joinPath(META_DIR, PREFERENCES_FILE),
        data: JSON.stringify(result),
      }).catch()
    );

  return result;
}
