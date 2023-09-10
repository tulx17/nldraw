import { Button, Form, FormItem, Input, Popup, Stack } from "@/components";
import {
  DRAW_REG_INDICATOR,
  EMPTY_STRING,
  GROUP_SUFFIX,
  JOINT_DATE_FORMAT,
  SPACE_SEPARATOR,
} from "@/constants/primitive";
import { useExploreContext, useForm } from "@/hooks";
import {
  createDir,
  joinFileName,
  joinPath,
  readDir,
} from "@/utilities/filesystem";
import { Toast } from "antd-mobile";
import { AddSquareOutline } from "antd-mobile-icons";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

export function CreateGroupButton() {
  const [form] = useForm();
  const [explore, exploreDispatch] = useExploreContext();
  const { "*": directory = EMPTY_STRING } = useParams();
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible(true);
  }

  function handleClose() {
    form.resetFields();
    setVisible(false);
  }

  async function handleSubmit() {
    const { name } = form.getFieldsValue();
    const result = await createDir({
      path: joinPath(directory, joinFileName(name, GROUP_SUFFIX)),
    });

    if (!result) {
      Toast.show({
        content: ["Failed to create group", name].join(SPACE_SEPARATOR),
      });
      return;
    }

    await reloadFiles()
      .then(() =>
        Toast.show({
          content: ["Group", name, "created"].join(SPACE_SEPARATOR),
        })
      )
      .then(handleClose);
  }

  async function reloadFiles() {
    const files = await readDir({ path: directory });
    exploreDispatch({ type: "files.reload", payload: new Set(files) });
  }

  return (
    <Fragment>
      <Button
        disabled={Array.from(explore.files).some((file) =>
          DRAW_REG_INDICATOR.test(file.name)
        )}
        onClick={handleClick}
      >
        <Stack>
          <AddSquareOutline />
          <span>Group</span>
        </Stack>
      </Button>
      <Popup
        position={"top"}
        visible={visible}
        onClose={handleClose}
      >
        <Form
          form={form}
          initialValues={{
            name: format(Date.now(), JOINT_DATE_FORMAT),
          }}
          footer={<Button onClick={handleSubmit}>Create</Button>}
        >
          <FormItem
            name={"name"}
            label={"Name of the new group"}
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
