import { Canvas } from "@/components";
import { EMPTY_STRING } from "@/constants/primitive";
import { readFile, writeFile } from "@/utilities/filesystem";
import { TLStore, createTLStore, defaultShapes } from "@tldraw/tldraw";
import { Toast } from "antd-mobile";
import { DownlandOutline, UploadOutline } from "antd-mobile-icons";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Draw() {
  const { name = EMPTY_STRING } = useParams();
  const [path] = useState(decodeURIComponent(name));
  const [store] = useState(createTLStore({ shapes: defaultShapes }));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);
    loadSnapshot({ path, store })
      .then(() => {
        Toast.show({
          content: ["Loaded", path].join(" "),
          icon: <UploadOutline />,
        });
      })
      .catch()
      .finally(() => setLoading(false));

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
      {!loading && (
        <Canvas
          store={store}
          autoFocus={true}
        />
      )}
    </Fragment>
  );
}

async function loadSnapshot(params: { path: string; store: TLStore }) {
  const { path, store } = params;

  const jsonSnapshot = await readFile({ path });

  if (!jsonSnapshot) return;

  const snapshot = JSON.parse(jsonSnapshot);

  store.loadSnapshot(snapshot);
}

async function saveSnapshot(params: { path: string; store: TLStore }) {
  const { path, store } = params;

  const snapshot = store.getSnapshot();

  await writeFile({ path, data: JSON.stringify(snapshot) });
}
