import {
  createDir,
  joinPath,
  removeDir,
  removeFile,
  writeFile,
} from "@/utilities/filesystem";
import { getDecodedURIComponent } from "@/utilities/searchParams";
import { Toast } from "antd-mobile";
import { FileOutline, FolderOutline } from "antd-mobile-icons";
import { format } from "date-fns";

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

export async function handleCreateGroup(
  query: URLSearchParams,
  refreshDirectory: () => void,
  name?: string
) {
  const folderName = name || format(Date.now(), "yyyy-MM-dd");

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

export async function handleCreateDraw(
  query: URLSearchParams,
  refreshDirectory: () => void,
  name?: string
) {
  const encodedDirectory = getDecodedURIComponent({
    from: query,
    name: "directory",
  });

  const fileName =
    name ||
    ["draw", format(Date.now(), "yyyy-MM-dd'T'HHmmss"), "tldr"].join(".");

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
