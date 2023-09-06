import { Stack } from "@/components";
import { EMPTY_STRING, GROUP_REG_INDICATOR } from "@/constants/primitive";
import {
  CreateDrawButton,
  CreateGroupButton,
  EntryList,
  RefreshButton,
} from "@/pages/explore/components";
import { ExploreProvider } from "@/providers";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

export function Explore() {
  const { "*": directory = EMPTY_STRING } = useParams();

  return (
    <Fragment>
      <ExploreProvider>
        <Stack
          justify={"between"}
          align={"baseline"}
          style={{ width: "100%" }}
        >
          <span>{directory.replace(GROUP_REG_INDICATOR, EMPTY_STRING)}</span>
          <Stack
            justify={"end"}
            align={"center"}
          >
            <RefreshButton />
            <CreateDrawButton />
            <CreateGroupButton />
          </Stack>
        </Stack>
        <EntryList />
      </ExploreProvider>
    </Fragment>
  );
}
