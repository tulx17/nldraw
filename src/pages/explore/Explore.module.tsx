import {
  createDir,
  joinPath,
  removeDir,
  removeFile,
  writeFile,
} from "@/utilities/filesystem";
import { getDecodedURIComponent } from "@/utilities/searchParams";
import { FileInfo } from "@capacitor/filesystem";
import { Toast } from "antd-mobile";
import { FileOutline, FolderOutline } from "antd-mobile-icons";

export async function handleRemoveFile(
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

export async function handleRemoveDirectory(
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

export async function handleCreateDirectory(
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

export async function handleCreateFile(
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
