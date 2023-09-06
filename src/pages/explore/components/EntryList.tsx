import { List, ListItem } from "@/components";
import {
  BACK_SYMBOL,
  DATE_TIME_FORMAT,
  DRAW_FILE,
  DRAW_REG_INDICATOR,
  EMPTY_OBJECT,
  EMPTY_STRING,
  GROUP_REG_INDICATOR,
  META_DIR,
  PATH_DRAW,
} from "@/constants/primitive";
import { useExploreContext } from "@/hooks";
import { getParentDirectory, joinPath, readDir } from "@/utilities/filesystem";
import { FileOutline, FolderOutline, LeftOutline } from "antd-mobile-icons";
import { format } from "date-fns";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EntryList() {
  const navigate = useNavigate();
  const { "*": directory = EMPTY_STRING } = useParams();
  const [explore, exploreDispatch] = useExploreContext();

  // useInit({
  //   async init() {
  //     await refreshFiles();
  //   },
  // });

  useEffect(() => {
    refreshFiles();
  }, [directory]);

  async function handleNavigateGroup(name: string) {
    navigate(joinPath(directory, name));
    return;
  }

  function handleNavigateDraw(name: string) {
    navigate(
      joinPath(
        BACK_SYMBOL,
        PATH_DRAW,
        encodeURIComponent(joinPath(directory, name, DRAW_FILE))
      )
    );
    return;
  }

  async function handleNavigateBack() {
    navigate(getParentDirectory(directory));
    return;
  }

  async function refreshFiles() {
    const files = await readDir({ path: directory });
    exploreDispatch({ type: "files.reload", payload: new Set(files) });
  }

  return (
    <List>
      <ListItem
        arrow={false}
        disabled={true}
        {...(!!directory && {
          disabled: false,
          onClick: handleNavigateBack,
          prefix: <LeftOutline />,
        })}
      >
        {getParentDirectory(directory).replace(
          GROUP_REG_INDICATOR,
          EMPTY_STRING
        ) || BACK_SYMBOL}
      </ListItem>
      {Array.from(explore.files)
        .filter((directory) => directory.name !== META_DIR)
        .map((entry) => {
          const isGroup = GROUP_REG_INDICATOR.test(entry.name);
          const isDraw = DRAW_REG_INDICATOR.test(entry.name);

          return (
            <ListItem
              description={format(entry.mtime, DATE_TIME_FORMAT)}
              {...(isGroup
                ? {
                    children: entry.name.replace(
                      GROUP_REG_INDICATOR,
                      EMPTY_STRING
                    ),
                    arrow: true,
                    prefix: <FolderOutline />,
                    onClick: () => handleNavigateGroup(entry.name),
                  }
                : isDraw
                ? {
                    children: entry.name.replace(
                      DRAW_REG_INDICATOR,
                      EMPTY_STRING
                    ),
                    arrow: false,
                    prefix: <FileOutline />,
                    onClick: () => handleNavigateDraw(entry.name),
                  }
                : EMPTY_OBJECT)}
            />
          );
        })}
    </List>
  );
}
