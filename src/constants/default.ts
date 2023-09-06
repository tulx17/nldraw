import { EMPTY_STRING } from "@/constants/primitive";
import { Explore, Preferences } from "@/providers";

export const DEFAULT_PREFERENCES = {
  darkScheme: true,
  biometricAuth: false,
  privacyScreen: false,
} as Preferences;

export const DEFAULT_EXPLORE = {
  files: new Set(),
} as Explore;

export const DEFAULT_EXPLORE_QUERY = {
  directory: EMPTY_STRING,
};
