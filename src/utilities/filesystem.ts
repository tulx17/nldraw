import {
  EMPTY_ARRAY,
  EMPTY_STRING,
  FS_DIRECTORY,
  FS_ENCODING,
  FS_RECURSIVE,
  PATH_SEPARATOR,
  WORK_DIR,
} from "@/constants/primitive";
import { fs } from "@/utilities/capacitor";

export async function createDir(params: { path: string }) {
  const { path = EMPTY_STRING } = { ...params };

  const target = await validatePath({ path });

  if (!!target) return target;

  const newPath = joinPath(WORK_DIR, path);

  const result = await fs
    .mkdir({
      path: newPath,
      directory: FS_DIRECTORY,
      recursive: FS_RECURSIVE,
    })
    .then(() => newPath)
    .catch(() => EMPTY_STRING);

  return result;
}

export async function readDir(params: { path: string }) {
  const { path = EMPTY_STRING } = { ...params };

  const target = await validatePath({ path });

  if (!target) return EMPTY_ARRAY;

  const { files = EMPTY_ARRAY } = await fs.readdir({
    path: target,
    directory: FS_DIRECTORY,
  });

  return files;
}

export async function removeDir(params: { path: string; forced?: boolean }) {
  const { path, forced = false } = { ...params };

  const target = await validatePath({ path });

  if (!target) return EMPTY_STRING;

  const result = await fs
    .rmdir({
      path: target,
      directory: FS_DIRECTORY,
      recursive: forced,
    })
    .then(() => target)
    .catch(() => EMPTY_STRING);

  return result;
}

export async function writeFile(params: { path: string; data?: string }) {
  const permissionsGranted = await isPermissionsGranted();

  if (!permissionsGranted) return EMPTY_STRING;

  const { path, data = EMPTY_STRING } = { ...params };

  const target = joinPath(WORK_DIR, path);

  const { uri = EMPTY_STRING } = await fs.writeFile({
    path: target,
    data,
    directory: FS_DIRECTORY,
    encoding: FS_ENCODING,
    recursive: FS_RECURSIVE,
  });

  if (!uri) return EMPTY_STRING;

  return target;
}

export async function readFile(params: { path: string }) {
  const { path } = { ...params };

  const target = await validatePath({ path });

  if (!target) return EMPTY_STRING;

  const { data = EMPTY_STRING } = await fs.readFile({
    path: target,
    directory: FS_DIRECTORY,
    encoding: FS_ENCODING,
  });

  return data.toString();
}

export async function removeFile(params: { path: string }) {
  const { path } = { ...params };

  const target = await validatePath({ path });

  if (!target) return EMPTY_STRING;

  const result = await fs
    .deleteFile({
      path: target,
      directory: FS_DIRECTORY,
    })
    .then(() => target)
    .catch(() => EMPTY_STRING);

  return result;
}

export async function validatePath(params: { path: string }) {
  const permissionsGranted = await isPermissionsGranted();

  if (!permissionsGranted) return EMPTY_STRING;

  const { path } = { ...params };

  const target = joinPath(WORK_DIR, path);

  const result = await fs
    .stat({
      path: target,
      directory: FS_DIRECTORY,
    })
    .then(() => target)
    .catch(() => EMPTY_STRING);

  return result;
}

export function joinPath(...paths: Array<string | undefined>) {
  const result = paths.filter(Boolean).join(PATH_SEPARATOR);
  return result;
}

async function isPermissionsGranted() {
  const result = (await fs.checkPermissions()).publicStorage === "granted";
  return result;
}
