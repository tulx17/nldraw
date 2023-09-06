import { Stack } from "@/components";
import {
  CreateDrawButton,
  CreateGroupButton,
  EntryList,
  RefreshButton,
} from "@/pages/explore/components";
import { ExploreProvider } from "@/providers";
import { Fragment } from "react";

export function Explore() {
  return (
    <Fragment>
      <ExploreProvider>
        <Stack
          justify={"end"}
          align={"center"}
          style={{ width: "100%" }}
        >
          <RefreshButton />
          <CreateDrawButton />
          <CreateGroupButton />
        </Stack>
        <EntryList />
      </ExploreProvider>
    </Fragment>
  );
}
