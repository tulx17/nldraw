import { Canvas } from "@/components";
import { EMPTY_STRING } from "@/constants/primitive";
import { loadSnapshot, saveSnapshot } from "@/pages/Draw.module";
import { createTLStore, defaultShapes } from "@tldraw/tldraw";
import { Toast } from "antd-mobile";
import { DownlandOutline, UploadOutline } from "antd-mobile-icons";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Draw() {
  const { name = EMPTY_STRING } = useParams();
  const [path] = useState(decodeURIComponent(name));
  const [store] = useState(createTLStore({ shapes: defaultShapes }));

  useEffect(() => {
    loadSnapshot({ path, store })
      .then(() => {
        Toast.show({
          content: ["Loaded", path].join(" "),
          icon: <UploadOutline />,
        });
      })
      .catch();

    return () => {
      saveSnapshot({ path, store })
        .then(() =>
          Toast.show({
            content: ["Saved", path].join(" "),
            icon: <DownlandOutline />,
          })
        )
        .catch();
    };
  }, []);

  return (
    <Fragment>
      <Canvas
        store={store}
        autoFocus={true}
      />
    </Fragment>
  );
}
