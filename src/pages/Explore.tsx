import { Button, List, ListItem, Stack, Swipe } from "@/components";
import { EMPTY_STRING, PATH_SEPARATOR } from "@/constants/primitive";
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
  const navigate = useNavigate();

  const [query, setQuery] = useSearchParams({ directory: EMPTY_STRING });
  const [directoryContent, setDirectoryContent] = useState<Array<FileInfo>>([]);

  useEffect(() => {
    refreshDirectory();
  }, [query]);

  function refreshDirectory() {
    readDir({
      path: getDecodedURIComponent({
        from: query,
        name: "directory",
      }),
    }).then(setDirectoryContent);
  }

  function toParentDirectory() {
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
        <Stack>{query.toString()}</Stack>
        <Stack justify={"end"}>
          <Button onClick={refreshDirectory}>
            <RedoOutline />
          </Button>
          <Button
            onClick={() => {
              writeFile({
                path: joinPath(
                  getDecodedURIComponent({
                    from: query,
                    name: "directory",
                  }),
                  [
                    "tmp",
                    (
                      directoryContent.filter((entry) => entry.type === "file")
                        .length + 1
                    )
                      .toString()
                      .padStart(2, "0"),
                    "txt",
                  ].join(".")
                ),
              }).then(refreshDirectory);
            }}
          >
            <Stack>
              <AddSquareOutline />
              <span>File</span>
            </Stack>
          </Button>
          <Button
            onClick={() => {
              createDir({
                path: joinPath(
                  getDecodedURIComponent({
                    from: query,
                    name: "directory",
                  }),
                  [
                    "tmp",
                    (
                      directoryContent.filter(
                        (entry) => entry.type === "directory"
                      ).length + 1
                    )
                      .toString()
                      .padStart(2, "0"),
                  ].join(".")
                ),
              }).then(refreshDirectory);
            }}
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
          onClick={toParentDirectory}
        >
          ..
        </ListItem>
        {!!directoryContent.length &&
          directoryContent.map(({ name, size, uri, type }) => {
            const isDirectory = type === "directory";

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
                    onClick() {
                      const decodedDirectory = getDecodedURIComponent({
                        from: query,
                        name: "directory",
                      });
                      switch (isDirectory) {
                        case true:
                          removeDir({
                            path: joinPath(decodedDirectory, name),
                          }).then(refreshDirectory);
                          break;

                        default:
                          removeFile({
                            path: joinPath(decodedDirectory, name),
                          }).then(refreshDirectory);
                          break;
                      }
                    },
                  },
                ]}
              >
                <ListItem
                  description={[size, "B"].join(EMPTY_STRING)}
                  arrow={isDirectory}
                  prefix={isDirectory ? <FolderOutline /> : <FileOutline />}
                  onClick={() => {
                    switch (isDirectory) {
                      case true:
                        // setDirectory((prev) => joinPath(prev, name));
                        setQuery((prev) => ({
                          ...prev,
                          directory: joinPath(
                            getDecodedURIComponent({
                              from: query,
                              name: "directory",
                            }),
                            name
                          ),
                        }));
                        break;

                      default:
                        navigate(
                          joinPath(
                            "..",
                            "draw",
                            encodeURIComponent(
                              joinPath(
                                getDecodedURIComponent({
                                  from: query,
                                  name: "directory",
                                }),
                                name
                              )
                            )
                          )
                        );
                        break;
                    }
                  }}
                >
                  {name}
                </ListItem>
              </Swipe>
            );
          })}
      </List>
    </Fragment>
  );
}
