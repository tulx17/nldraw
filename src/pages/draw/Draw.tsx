import { Canvas } from "@/components";
import { EMPTY_STRING, SPACE_SEPARATOR } from "@/constants/primitive";
import { useInit } from "@/hooks";
import { loadSnapshot, saveSnapshot } from "@/pages/draw/Draw.module";
import {
  TLStore,
  TLUiMenuGroup,
  createTLStore,
  defaultShapeUtils,
} from "@tldraw/tldraw";
import { Toast } from "antd-mobile";
import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Draw() {
  const navigate = useNavigate();
  const { path = EMPTY_STRING } = useParams();

  if (!path) {
    Toast.show({ content: "Draw not found" });
    navigate(-1);
    return;
  }

  const [store] = useState<TLStore>(
    createTLStore({
      shapeUtils: defaultShapeUtils,
    })
  );

  useInit({
    async init() {
      const snapshot = await loadSnapshot({ path, store });

      if (!snapshot) {
        Toast.show({
          content: ["Failed to load draw from", path].join(SPACE_SEPARATOR),
        });
        return;
      }

      Toast.show({
        content: ["Loaded draw from", path].join(SPACE_SEPARATOR),
      });
    },
    async cleanup() {
      if (!store) return;

      const result = await saveSnapshot({ path, store });

      if (!result) {
        Toast.show({
          content: ["Failed to save draw to", path].join(SPACE_SEPARATOR),
        });
        return;
      }

      Toast.show({
        content: ["Saved draw to", path].join(SPACE_SEPARATOR),
      });
    },
  });

  return (
    <Fragment>
      <Canvas
        store={store}
        overrides={{
          helpMenu(_editor, schema, _helpers) {
            const top = schema.find(
              (item) => item.id === "top"
            )! as TLUiMenuGroup;

            // remove keyboard shortcuts
            const topKeyboardShortcutsIndex = top.children.findIndex(
              (item) => item.id === "keyboard-shortcuts"
            );
            top.children.splice(topKeyboardShortcutsIndex, 1);

            return schema;
          },
          actions(_editor, actions, _helpers) {
            return actions;
          },
          contextMenu(_editor, schema, _helpers) {
            // remove clipboard options
            const clipboardGroup = schema.findIndex(
              (item) => item.id === "clipboard-group"
            );
            schema.splice(clipboardGroup, 1);

            // remove conversion options
            const conversions = schema.findIndex(
              (item) => item.id === "conversions"
            );
            schema.splice(conversions, 1);

            return schema;
          },
          menu(_editor, schema, _helpers) {
            const menu = schema.find(
              (item) => item.id === "menu" && item.type === "group"
            )! as TLUiMenuGroup;

            //  remov file options (print)
            const menuFileIndex = menu.children.findIndex(
              (item) => item.id === "file"
            );
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
            const extrasIndex = schema.findIndex(
              (item) => item.id === "extras"
            );
            schema.splice(extrasIndex, 1);

            return schema;
          },
        }}
      />
    </Fragment>
  );
}
