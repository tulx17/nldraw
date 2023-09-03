import { List, ListItem, Stack } from "@/components";
import { EMPTY_STRING, PATH_SEPARATOR } from "@/constants/primitive";
import { useInit } from "@/hooks";
import { Actions, DirectoryEntry } from "@/pages/explore/components";
import { joinPath, readDir } from "@/utilities/filesystem";
import { getDecodedURIComponent } from "@/utilities/searchParams";
import { FileInfo } from "@capacitor/filesystem";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Explore() {
  const navigate = useNavigate();

  const [query, setQuery] = useSearchParams({ directory: EMPTY_STRING });
  const [directoryContent, setDirectoryContent] = useState<Array<FileInfo>>([]);

  useInit({
    init() {
      refreshDirectory();
    },
  });

  useEffect(() => {
    refreshDirectory();
  }, [query]);

  function refreshDirectory() {
    readDir({
      path: getDecodedURIComponent({ from: query, name: "directory" }),
    }).then(setDirectoryContent);
  }

  function goToParentDirectory() {
    const segments = getDecodedURIComponent({
      from: query,
      name: "directory",
    })
      .split(PATH_SEPARATOR)
      .filter(Boolean);

    if (segments.length <= 1) {
      setQuery((prev) => ({ ...prev, directory: EMPTY_STRING }));
      return;
    }

    setQuery((prev) => ({
      ...prev,
      directory: joinPath(...segments.slice(0, -1)),
    }));
  }

  return (
    <Fragment>
      <Stack
        justify={"end"}
        align={"center"}
        style={{
          width: "100%",
        }}
      >
        <Actions
          query={query}
          navigate={navigate}
          refreshDirectory={refreshDirectory}
        />
      </Stack>
      <List>
        <ListItem
          disabled={!query.get("directory")}
          onClick={goToParentDirectory}
        >
          ..
        </ListItem>
        {!!directoryContent.length &&
          directoryContent.map(({ name, uri }) => {
            const isDraw = /\.tldr$/.test(name);

            const decodedDirectory = getDecodedURIComponent({
              from: query,
              name: "directory",
            });

            return (
              <DirectoryEntry
                key={uri}
                decodedDirectory={decodedDirectory}
                entryName={name}
                entryURI={uri}
                isDraw={isDraw}
                navigate={navigate}
                refreshDirectory={refreshDirectory}
                setQuery={setQuery}
              />
            );
          })}
      </List>
    </Fragment>
  );
}
