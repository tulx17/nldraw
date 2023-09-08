import { Directory, Encoding } from "@capacitor/filesystem";

export const FS_RECURSIVE = true;
export const FS_DIRECTORY = Directory.Documents;
export const FS_ENCODING = Encoding.UTF8;
export const WORK_DIR = "Nldraw";
export const META_DIR = ".meta";
export const PREFERENCES_FILE = "preferences.json";
export const DRAW_META_FILE = "draw.meta.json";
export const GROUP_META_FILE = "group.meta.json";
export const DRAW_FILE = "snapshot.tldr";
export const EMPTY_STRING = "";
export const EMPTY_OBJECT = {};
export const EMPTY_ARRAY = [];
export const PATH_SEPARATOR = "/";
export const PIPE_SEPARATOR = " | ";
export const SPACE_SEPARATOR = " ";
export const DOT_SEPARATOR = ".";
export const BACK_SYMBOL = "..";
export const DRAW_SUFFIX = "draw";
export const GROUP_SUFFIX = "group";
export const DRAW_REG_INDICATOR = /\.draw$/;
export const GROUP_REG_INDICATOR = /\.group$/;
export const EXTENSION_REG_INDICATOR = /\.\w+$/;
export const JOINT_DATE_TIME_FORMAT = "yyyyMMdd'T'HHmmss";
export const JOINT_DATE_FORMAT = "yyyyMMdd";
export const DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
export const DATE_FORMAT = "yyyy-MM-dd";
export const PATH_ROOT = "/";
export const PATH_EXPLORE = "explore";
export const PATH_DRAW = "draw";
export const PATH_PREFERENCES = "preferences";
export const COLOR_BG = "#ffffff";
export const COLOR_FG = "#333333";
export const COLOR_BG_DARK = "#1a1a1a";
export const COLOR_FG_DARK = "#e6e6e6";
