import { Canvas } from "@/components";
import { EMPTY_STRING, SPACE_SEPARATOR } from "@/constants/primitive";
import { useInit } from "@/hooks";
import { loadSnapshot, saveSnapshot } from "@/pages/draw/Draw.module";
import { TLStore, createTLStore, defaultShapeUtils } from "@tldraw/tldraw";
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
      <Canvas store={store} />
    </Fragment>
  );
}
