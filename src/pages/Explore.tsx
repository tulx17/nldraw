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
import { FileInfo } from "@capacitor/filesystem";
import {
  AddSquareOutline,
  FileOutline,
  FolderOutline,
  RedoOutline,
  SetOutline,
} from "antd-mobile-icons";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Explore() {
  const navigate = useNavigate();

  const [directory, setDirectory] = useState(EMPTY_STRING);
  const [directoryContent, setDirectoryContent] = useState<Array<FileInfo>>([]);

  useInit({
    init() {
      refreshDirectory();
    },
  });

  useEffect(() => {
    refreshDirectory();
  }, [directory]);

  function refreshDirectory() {
    readDir({ path: directory }).then(setDirectoryContent);
  }

  function toParentDirectory() {
    const segments = directory.split(PATH_SEPARATOR).filter(Boolean);

    if (segments.length <= 1) {
      setDirectory(EMPTY_STRING);
      return;
    }

    setDirectory(joinPath(...segments.slice(0, -1)));
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
        <Stack>Directory</Stack>
        <Stack justify={"end"}>
          <Button onClick={refreshDirectory}>
            <RedoOutline />
          </Button>
          <Button
            onClick={() => {
              writeFile({
                path: joinPath(
                  directory,
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
                  directory,
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
          clickable={!!directory}
          disabled={!directory}
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
                      switch (isDirectory) {
                        case true:
                          removeDir({
                            path: joinPath(directory, name),
                          }).then(refreshDirectory);
                          break;

                        default:
                          removeFile({
                            path: joinPath(directory, name),
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
                        setDirectory((prev) => joinPath(prev, name));
                        break;

                      default:
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
