import { Button, List, ListItem, Stack, Swipe } from "@/components";
import { EMPTY_STRING, PATH_SEPARATOR } from "@/constants/primitive";
import { useInit } from "@/hooks";
import {
  createDir,
  joinPath,
  readDir,
  removeDir,
  removeFile,
  writeFile,
} from "@/utilities/filesystem";
import { getDecodedComponent as getDecodedURIComponent } from "@/utilities/searchParams";
import { FileInfo } from "@capacitor/filesystem";
import { Toast } from "antd-mobile";
import {
  AddSquareOutline,
  FileOutline,
  FolderOutline,
  RedoOutline,
  SetOutline,
} from "antd-mobile-icons";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Explore() {
  // #region logic
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
  // #endregion
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
          <Button onClick={refreshDirectory}>
            <RedoOutline />
          </Button>
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
                      prefix={<FolderOutline />}
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

async function handleRemoveFile(
  decodedDirectory: string,
  name: string,
  refreshDirectory: () => void
) {
  const result = await removeFile({
    path: joinPath(decodedDirectory, name),
  });

  if (!result) {
    Toast.show("Failed");
    return;
  }

  Toast.show("Success");

  refreshDirectory();
}

async function handleRemoveDirectory(
  decodedDirectory: string,
  name: string,
  refreshDirectory: () => void
) {
  const result = await removeDir({
    path: joinPath(decodedDirectory, name),
    forced: true,
  });

  if (!result) {
    Toast.show("Failed");
    return;
  }

  Toast.show("Success");

  refreshDirectory();
}

async function handleCreateDirectory(
  query: URLSearchParams,
  directoryContent: FileInfo[],
  refreshDirectory: () => void
) {
  const folderName = [
    (
      directoryContent.filter(
        (entry) => entry.type === "directory" && !/\.tldr$/.test(entry.name)
      ).length + 1
    )
      .toString()
      .padStart(3, "0"),
  ].join(".");

  const result = await createDir({
    path: joinPath(
      getDecodedURIComponent({ from: query, name: "directory" }),
      folderName
    ),
  });

  if (!result) {
    Toast.show("Failed");
    return;
  }

  Toast.show({
    content: "Success",
    icon: <FolderOutline />,
  });

  refreshDirectory();
}

async function handleCreateFile(
  query: URLSearchParams,
  directoryContent: FileInfo[],
  refreshDirectory: () => void
) {
  const encodedDirectory = getDecodedURIComponent({
    from: query,
    name: "directory",
  });

  const fileName = [
    "draw",
    (
      directoryContent.filter(
        (entry) => entry.type === "directory" && /\.tldr$/.test(entry.name)
      ).length + 1
    )
      .toString()
      .padStart(6, "0"),
    "tldr",
  ].join(".");

  const path = joinPath(encodedDirectory, fileName);

  const container = await createDir({ path });

  if (!container) return;

  const file = await writeFile({
    path: joinPath(path, "snapshot.tldr"),
    data: fileName,
  });

  if (!file) {
    Toast.show("Failed");
    return;
  }

  Toast.show({
    content: "Success",
    icon: <FileOutline />,
  });

  refreshDirectory();
}
