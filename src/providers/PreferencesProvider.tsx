import { DEFAULT_PREFERENCES } from "@/constants/default";
import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

export type Preferences = {
  darkMode: boolean;
  drawDarkMode: boolean;
  drawSnapShape: boolean;
  drawGridBackground: boolean;
  drawPenOnly: boolean;
  drawToolLocked: boolean;
  drawFocused: boolean;
};

type PreferencesAction =
  | { type: "reload"; payload: Preferences }
  | { type: "reset" }
  | { type: "darkMode.toggle" }
  | { type: "draw.darkMode.toggle" }
  | { type: "draw.snapShape.toggle" }
  | { type: "draw.gridBackground.toggle" }
  | { type: "draw.penOnly.toggle" }
  | { type: "draw.toolLocked.toggle" }
  | { type: "draw.focused.toggle" };


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
    case "draw.darkMode.toggle":
      return { ...state, drawDarkMode: !state.drawDarkMode };
    case "draw.gridBackground.toggle":
      return { ...state, drawGridBackground: !state.drawGridBackground };
    case "draw.penOnly.toggle":
      return { ...state, drawPenOnly: !state.drawPenOnly };
    case "draw.snapShape.toggle":
      return { ...state, drawSnapShape: !state.drawSnapShape };
    case "draw.toolLocked.toggle":
      return { ...state, drawToolLocked: !state.drawToolLocked };
    case "draw.focused.toggle":
      return { ...state, drawFocused: !state.drawFocused };
    default:
      return { ...state };
  }
}
