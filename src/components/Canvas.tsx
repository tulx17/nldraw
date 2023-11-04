import { ENV_DEV } from "@/constants/env";
import { getAssetUrlsByMetaUrl } from "@tldraw/assets/urls";
import { Tldraw } from "@tldraw/tldraw";

type CanvasProps = Parameters<typeof Tldraw>[0];

export function Canvas(props: CanvasProps) {
  return (
    <div className="tldraw__editor">
      <Tldraw
        {...(!ENV_DEV ? {
          assetUrls: getAssetUrlsByMetaUrl()
        }: {})}
        autoFocus={true}
        {...props}
      />
    </div>
  );
}
