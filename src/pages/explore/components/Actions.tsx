import { Stack } from "@/components";
import {
  handleCreateDraw,
  handleCreateGroup,
} from "@/pages/explore/Explore.module";
import { joinPath } from "@/utilities/filesystem";
import { Button } from "antd-mobile";
import { AddSquareOutline, SetOutline } from "antd-mobile-icons";
import { NavigateFunction } from "react-router-dom";

type ActionProps = {
  query: URLSearchParams;
  refreshDirectory: () => void;
  navigate: NavigateFunction;
};

export function Actions({ query, refreshDirectory, navigate }: ActionProps) {
  return (
    <Stack justify={"end"}>
      <Button
        onClick={async () => await handleCreateDraw(query, refreshDirectory)}
      >
        <Stack>
          <AddSquareOutline />
          <span>Draw</span>
        </Stack>
      </Button>
      <Button
        onClick={async () => await handleCreateGroup(query, refreshDirectory)}
      >
        <Stack>
          <AddSquareOutline />
          <span>Group</span>
        </Stack>
      </Button>
      <Button onClick={() => navigate(joinPath("..", "preferences"))}>
        <SetOutline />
      </Button>
    </Stack>
  );
}
