import { readFile, writeFile } from "@/utilities/filesystem";
import { TLStore } from "@tldraw/tldraw";

export async function loadSnapshot(params: { path: string; store: TLStore }) {
  const { path, store } = params;

  const jsonSnapshot = await readFile({ path });

  if (!jsonSnapshot) return;

  const snapshot = JSON.parse(jsonSnapshot);

  // const store = createTLStore({ shapeUtils: defaultShapeUtils });

  store.loadSnapshot(snapshot);

  return snapshot;
}

export async function saveSnapshot(params: { path: string; store: TLStore }) {
  const { path, store } = params;

  const snapshot = store.getSnapshot();

  const result = await writeFile({ path, data: JSON.stringify(snapshot) });

  return !!result;
}
