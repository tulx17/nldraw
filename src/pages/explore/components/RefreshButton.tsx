import { Button, Ellipsis, Stack } from "@/components";
import { EMPTY_STRING } from "@/constants/primitive";
import { useExploreContext } from "@/hooks";
import { getSegments, readDir } from "@/utilities/filesystem";
import { RedoOutline } from "antd-mobile-icons";
import { useParams } from "react-router-dom";

export function RefreshButton() {
  const [, exploreDispatch] = useExploreContext();
  const { "*": directory = EMPTY_STRING } = useParams();

  async function handleClick() {
    const files = await readDir({ path: directory });
    exploreDispatch({ type: "files.reload", payload: new Set(files) });
  }

  return (
    <Button onClick={handleClick}>
      <Stack>
        <RedoOutline />
        {!!directory && (
          <Ellipsis
            direction={"start"}
            content={getSegments(directory, -1).replace(
              /\.group/g,
              EMPTY_STRING
            )}
          />
        )}
      </Stack>
    </Button>
  );
}
