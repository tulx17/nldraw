import {
  Button,
  Form,
  FormItem,
  Input,
  List,
  ListItem,
  Popup,
  Swipe,
} from "@/components";
import {
  BACK_SYMBOL,
  DATE_TIME_FORMAT,
  DRAW_FILE,
  DRAW_REG_INDICATOR,
  DRAW_SUFFIX,
  EMPTY_OBJECT,
  EMPTY_STRING,
  GROUP_REG_INDICATOR,
  GROUP_SUFFIX,
  META_DIR,
  PATH_DRAW,
  SPACE_SEPARATOR,
} from "@/constants/primitive";
import { useExploreContext, useForm } from "@/hooks";
import {
  getParentDirectory,
  joinFileName,
  joinPath,
  readDir,
  removeDir,
  rename,
  stripExtension,
} from "@/utilities/filesystem";
import { Toast } from "antd-mobile";
import { FileOutline, FolderOutline, LeftOutline } from "antd-mobile-icons";
import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EntryList() {
  const navigate = useNavigate();
  const { "*": directory = EMPTY_STRING } = useParams();
  const [explore, exploreDispatch] = useExploreContext();
  const [updateVisible, setUpdateVisible] = useState(false);
  const [renameForm] = useForm();

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

  function handleRenameClose() {
    renameForm.resetFields();
    setUpdateVisible(false);
  }

  async function handleRenameSubmit() {
    const { oldName, newName } = renameForm.getFieldsValue();
    const oldPath = joinPath(directory, oldName);

    const isGroup = GROUP_REG_INDICATOR.test(oldName);
    const isDraw = DRAW_REG_INDICATOR.test(oldName);

    let result = EMPTY_STRING;

    if (isGroup) {
      result = await rename({
        oldPath,
        newPath: joinPath(directory, joinFileName(newName, GROUP_SUFFIX)),
      });
    } else if (isDraw) {
      result = await rename({
        oldPath,
        newPath: joinPath(directory, joinFileName(newName, DRAW_SUFFIX)),
      });
    }

    if (!result) {
      Toast.show({
        content: ["Failed to rename", stripExtension(oldName)].join(
          SPACE_SEPARATOR
        ),
      });
      return;
    }

    await refreshFiles()
      .then(() =>
        Toast.show({
          content: ["Renamed", stripExtension(oldName), "to", newName].join(
            SPACE_SEPARATOR
          ),
        })
      )
      .then(handleRenameClose);
  }

  function handleRenameAction(name: string) {
    setUpdateVisible(true);
    renameForm.setFieldsValue({ oldName: name, newName: EMPTY_STRING });
  }

  async function handleRemoveAction(name: string) {
    const result = await removeDir({
      path: joinPath(directory, name),
      forced: true,
    });
    if (!result) {
      Toast.show({
        content: ["Failed to remove", stripExtension(name)].join(
          SPACE_SEPARATOR
        ),
      });
      return;
    }

    await refreshFiles().then(() =>
      Toast.show({
        content: ["Removed", stripExtension(name)].join(SPACE_SEPARATOR),
      })
    );
  }

  async function refreshFiles() {
    const files = await readDir({ path: directory });
    exploreDispatch({ type: "files.reload", payload: new Set(files) });
  }

  return (
    <Fragment>
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
          {getParentDirectory(directory) || BACK_SYMBOL}
        </ListItem>
        {Array.from(explore.files)
          .filter((directory) => directory.name !== META_DIR)
          .map((entry) => {
            const isGroup = GROUP_REG_INDICATOR.test(entry.name);
            const isDraw = DRAW_REG_INDICATOR.test(entry.name);

            return (
              <Swipe
                key={entry.uri}
                leftActions={[
                  {
                    key: "rename",
                    text: "Rename",
                    color: "primary",
                    onClick() {
                      handleRenameAction(entry.name);
                    },
                  },
                ]}
                rightActions={[
                  {
                    key: "remove",
                    text: "Remove",
                    color: "danger",
                    onClick() {
                      handleRemoveAction(entry.name);
                    },
                  },
                ]}
              >
                <ListItem
                  children={entry.name}
                  description={format(entry.mtime, DATE_TIME_FORMAT)}
                  {...(isGroup
                    ? {
                        arrow: true,
                        prefix: <FolderOutline />,
                        onClick: () => handleNavigateGroup(entry.name),
                      }
                    : isDraw
                    ? {
                        arrow: false,
                        prefix: <FileOutline />,
                        onClick: () => handleNavigateDraw(entry.name),
                      }
                    : EMPTY_OBJECT)}
                />
              </Swipe>
            );
          })}
      </List>
      <Popup
        position={"top"}
        visible={updateVisible}
        onClose={handleRenameClose}
      >
        <Form
          form={renameForm}
          footer={<Button onClick={handleRenameSubmit}>Update</Button>}
        >
          <FormItem
            name={"oldName"}
            hidden={true}
          >
            <Input />
          </FormItem>
          <FormItem
            name={"newName"}
            label={[
              "New name for",
              stripExtension(String(renameForm.getFieldValue("oldName"))),
            ].join(SPACE_SEPARATOR)}
            required={true}
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem>
        </Form>
      </Popup>
    </Fragment>
  );
}
