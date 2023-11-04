import { EMPTY_ARRAY } from "@/constants/primitive";
import { readFile, writeFile } from "@/utilities/filesystem";
import {
  Editor,
  StoreSnapshot,
  TLRecord,
  TLStore,
  TLUiActionsContextType,
  TLUiMenuGroup,
  TLUiMenuSchema,
  TLUiToolbarSchemaContextType,
  TLUiToolsContextType,
} from "@tldraw/tldraw";

export async function loadSnapshot(params: { path: string; store: TLStore }) {
  const { path, store } = params;

  const jsonSnapshot = await readFile({ path });

  if (!jsonSnapshot) return;

  const snapshot = JSON.parse(jsonSnapshot) as StoreSnapshot<TLRecord>;

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

export function helpMenuOverrides(_editor: Editor, schema: TLUiMenuSchema) {
  const top = schema.find((item) => item.id === "top")! as TLUiMenuGroup;

  // remove keyboard shortcuts
  const topKeyboardShortcutsIndex = top.children.findIndex(
    (item) => item.id === "keyboard-shortcuts"
  );
  top.children.splice(topKeyboardShortcutsIndex, 1);

  return schema;
}

export function contextMenuOverrides(_editor: Editor, schema: TLUiMenuSchema) {
  // remove clipboard options
  const clipboardGroup = schema.findIndex(
    (item) => item.id === "clipboard-group"
  );
  schema.splice(clipboardGroup, 1);

  // remove conversion options
  const conversions = schema.findIndex((item) => item.id === "conversions");
  schema.splice(conversions, 1);

  return schema;
}

export function menuOverrides(_editor: Editor, schema: TLUiMenuSchema) {
  const menu = schema.find(
    (item) => item.id === "menu" && item.type === "group"
  )! as TLUiMenuGroup;

  //  remov file options (print)
  const menuFileIndex = menu.children.findIndex((item) => item.id === "file");
  menu.children.splice(menuFileIndex, 1);

  const menuEdit = menu.children.find(
    (item) => item.id === "edit"
  )! as TLUiMenuGroup;

  // remove conversion options (copy,paste,export)
  const editConversionsIndex = menuEdit.children.findIndex(
    (item) => item.id === "conversions"
  );
  menuEdit.children.splice(editConversionsIndex, 1);

  // remove clipboard options (cut,copy,paste)
  const editClipboardIndex = menuEdit.children.findIndex(
    (item) => item.id === "clipboard-actions"
  );
  menuEdit.children.splice(editClipboardIndex, 1);

  // remove extras options (insert embed and media)
  const extrasIndex = schema.findIndex((item) => item.id === "extras");
  schema.splice(extrasIndex, 1);

  return schema;
}

export function actionsOverrides(
  _editor: Editor,
  schema: TLUiActionsContextType
) {
  // remove unsupported actions
  // [
  //   "insert-embed",
  //   "insert-media",
  //   "export-as-svg",
  //   "export-as-png",
  //   "export-as-json",
  //   "copy-as-svg",
  //   "copy-as-png",
  //   "copy-as-json",
  //   "convert-to-bookmark",
  //   "convert-to-embed",
  //   "cut",
  //   "copy",
  //   "paste",
  //   "print",
  // ].forEach((id) => delete schema[id]);
  // logger.log(JSON.stringify(schema, null, 8));

  return schema;
}

export function actionsMenuOverrides(_editor: Editor, schema: TLUiMenuSchema) {
  return schema;
}

export function keyboardShortcutsMenuOverrides(
  // _editor: Editor,
  // _schema: TLUiMenuSchema
) {
  return EMPTY_ARRAY;
}

export function toolbarOverrides(
  _editor: Editor,
  schema: TLUiToolbarSchemaContextType
) {
  // remove asset
  const assetIndex = schema.findIndex((item) => item.id === "asset");
  schema.splice(assetIndex, 1);
  return schema;
}

export function toolsOverrides(_editor: Editor, schema: TLUiToolsContextType) {
  // ["asset", "embed"].forEach((id) => delete schema[id]);
  // logger.log(JSON.stringify(schema, null, 8));
  return schema;
}

export function onMount(editor: Editor) {
  editor.zoomToFit();
  editor.setCurrentTool("hand");
  return;
}
