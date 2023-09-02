import { getAssetUrlsByMetaUrl } from "@tldraw/assets/urls";
import { Tldraw } from "@tldraw/tldraw";

type CanvasProps = Parameters<typeof Tldraw>[0];

const assets = getAssetUrlsByMetaUrl();

export function Canvas(props: CanvasProps) {
  return (
    <div className="tldraw__editor">
      <Tldraw
        assetUrls={assets}
        {...props}
      />
    </div>
  );
}
