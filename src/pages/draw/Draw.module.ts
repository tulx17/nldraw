import { readFile, writeFile } from "@/utilities/filesystem";
import { TLStore } from "@tldraw/tldraw";

export async function loadSnapshot(params: { path: string; store: TLStore }) {
  const { path, store } = params;

  const jsonSnapshot = await readFile({ path });

  if (!jsonSnapshot) return;

  const snapshot = JSON.parse(jsonSnapshot);

  store.loadSnapshot(snapshot);
}

export async function saveSnapshot(params: { path: string; store: TLStore }) {
  const { path, store } = params;

  const snapshot = store.getSnapshot();

  await writeFile({ path, data: JSON.stringify(snapshot) });
}
