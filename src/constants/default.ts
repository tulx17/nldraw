import { Explore, Preferences } from "@/providers";
import { createTLStore, defaultShapeUtils } from "@tldraw/tldraw";

export const DEFAULT_PREFERENCES = {
  darkMode: false,
} as Preferences;

export const DEFAULT_EXPLORE = {
  files: new Set(),
} as Explore;

export const DEFAULT_STORE = createTLStore({ shapeUtils: defaultShapeUtils });
