import { ListItem, Swipe } from "@/components";
import { handleRemoveDirectory } from "@/pages/explore/Explore.module";
import { joinPath } from "@/utilities/filesystem";
import { ContentOutline, FolderOutline } from "antd-mobile-icons";
import { NavigateFunction, SetURLSearchParams } from "react-router-dom";

type DirectoryEntryProps = {
  decodedDirectory: string;
  entryName: string;
  entryURI: string;
  isDraw: boolean;
  refreshDirectory: () => void;
  setQuery: SetURLSearchParams;
  navigate: NavigateFunction;
};

export function DirectoryEntry({
  decodedDirectory,
  entryName,
  entryURI,
  refreshDirectory,
  isDraw,
  setQuery,
  navigate,
}: DirectoryEntryProps) {
  return (
    <Swipe
      key={entryURI}
      rightActions={[
        {
          key: "remove",
          text: "Remove",
          color: "danger",
          async onClick() {
            await handleRemoveDirectory(
              decodedDirectory,
              entryName,
              refreshDirectory
            );
          },
        },
      ]}
    >
      <ListItem
        arrow={!isDraw}
        prefix={isDraw ? <ContentOutline /> : <FolderOutline />}
        onClick={() => {
          if (!isDraw) {
            setQuery((prev) => ({
              ...prev,
              directory: joinPath(decodedDirectory, entryName),
            }));
            return;
          }

          navigate(
            joinPath(
              "..",
              "draw",
              encodeURIComponent(
                joinPath(decodedDirectory, entryName, "snapshot.tldr")
              )
            )
          );
        }}
      >
        {entryName}
      </ListItem>
    </Swipe>
  );
}
