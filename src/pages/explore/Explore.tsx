import { Button, List, ListItem, Stack, Swipe } from "@/components";
import { EMPTY_STRING, PATH_SEPARATOR } from "@/constants/primitive";
import { useInit } from "@/hooks";
import {
  handleCreateDirectory,
  handleCreateFile,
  handleRemoveDirectory,
  handleRemoveFile,
} from "@/pages/explore/Explore.module";
import { joinPath, readDir } from "@/utilities/filesystem";
import { getDecodedURIComponent } from "@/utilities/searchParams";
import { FileInfo } from "@capacitor/filesystem";
import {
  AddSquareOutline,
  FileOutline,
  FolderOutline,
  SetOutline,
} from "antd-mobile-icons";
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
        justify={"between"}
        align={"center"}
        style={{
          width: "100%",
        }}
      >
        <Stack>
          {getDecodedURIComponent({ from: query, name: "directory" })}
        </Stack>
        <Stack justify={"end"}>
          <Button
            onClick={async () =>
              await handleCreateFile(query, directoryContent, refreshDirectory)
            }
          >
            <Stack>
              <AddSquareOutline />
              <span>File</span>
            </Stack>
          </Button>
          <Button
            onClick={async () =>
              await handleCreateDirectory(
                query,
                directoryContent,
                refreshDirectory
              )
            }
          >
            <Stack>
              <AddSquareOutline />
              <span>Directory</span>
            </Stack>
          </Button>
          <Button onClick={() => navigate(joinPath("..", "preferences"))}>
            <SetOutline />
          </Button>
        </Stack>
      </Stack>
      <List>
        <ListItem
          clickable={!!query.get("directory")}
          disabled={!query.get("directory")}
          onClick={goToParentDirectory}
        >
          ..
        </ListItem>
        {!!directoryContent.length &&
          directoryContent.map(({ name, size, uri, type }) => {
            const isDirectory = type === "directory";

            const decodedDirectory = getDecodedURIComponent({
              from: query,
              name: "directory",
            });

            switch (isDirectory) {
              case true:
                const isContainer = /\.tldr/.test(name);
                return (
                  <Swipe
                    key={uri}
                    rightActions={[
                      {
                        key: "remove",
                        text: "Remove",
                        color: "danger",
                        async onClick() {
                          await handleRemoveDirectory(
                            decodedDirectory,
                            name,
                            refreshDirectory
                          );
                        },
                      },
                    ]}
                  >
                    <ListItem
                      description={[size, "B"].join(EMPTY_STRING)}
                      arrow={!isContainer}
                      prefix={isContainer ? <></> : <FolderOutline />}
                      onClick={() => {
                        if (!isContainer) {
                          setQuery((prev) => ({
                            ...prev,
                            directory: joinPath(decodedDirectory, name),
                          }));
                          return;
                        }

                        navigate(
                          joinPath(
                            "..",
                            "draw",
                            encodeURIComponent(
                              joinPath(decodedDirectory, name, "snapshot.tldr")
                            )
                          )
                        );
                      }}
                    >
                      {name}
                    </ListItem>
                  </Swipe>
                );

              default:
                return (
                  <Swipe
                    key={uri}
                    leftActions={[
                      {
                        key: "duplicate",
                        text: "Duplicate",
                      },
                    ]}
                    rightActions={[
                      {
                        key: "remove",
                        text: "Remove",
                        color: "danger",
                        async onClick() {
                          await handleRemoveFile(
                            decodedDirectory,
                            name,
                            refreshDirectory
                          );
                        },
                      },
                    ]}
                  >
                    <ListItem
                      description={[size, "B"].join(EMPTY_STRING)}
                      prefix={<FileOutline />}
                      arrow={false}
                      onClick={() => {
                        navigate(
                          joinPath(
                            "..",
                            "draw",
                            encodeURIComponent(joinPath(decodedDirectory, name))
                          )
                        );
                      }}
                    >
                      {name}
                    </ListItem>
                  </Swipe>
                );
            }
          })}
      </List>
    </Fragment>
  );
}
