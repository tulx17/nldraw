import { DEFAULT_EXPLORE } from "@/constants/default";
import { FileInfo } from "@capacitor/filesystem";
import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

type ExploreProviderProps = PropsWithChildren;

export type Explore = {
  files: Set<FileInfo>;
};

type ExploreAction = { type: "files.reload"; payload: Set<FileInfo> };

export const ExploreContext = createContext<
  [Explore, Dispatch<ExploreAction>] | null
>(null);

export function ExploreProvider(props: ExploreProviderProps) {
  const [state, dispatch] = useReducer(exploreReducer, DEFAULT_EXPLORE);

  return (
    <ExploreContext.Provider
      value={[state, dispatch]}
      {...props}
    />
  );
}

function exploreReducer(state: Explore, action: ExploreAction) {
  switch (action.type) {
    case "files.reload":
      return { ...state, files: new Set(action.payload) };
    default:
      return { ...state };
  }
}
