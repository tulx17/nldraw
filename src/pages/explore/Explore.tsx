import { Stack } from "@/components";
import {
  CreateDrawButton,
  CreateGroupButton,
  EntryList,
  PreferencesButton,
} from "@/pages/explore/components";
import { ExploreProvider } from "@/providers";
import { Fragment } from "react";

export function Explore() {
  return (
    <Fragment>
      <ExploreProvider>
        <Stack direction={"vertical"}>
          <Stack
            justify={"end"}
            align={"center"}
          >
            <CreateDrawButton />
            <CreateGroupButton />
            <PreferencesButton />
          </Stack>
          <EntryList />
        </Stack>
      </ExploreProvider>
    </Fragment>
  );
}
