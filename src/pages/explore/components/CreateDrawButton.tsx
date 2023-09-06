import { Button, Form, FormItem, Input, Popup, Stack } from "@/components";
import {
  DRAW_FILE,
  DRAW_SUFFIX,
  EMPTY_OBJECT,
  EMPTY_STRING,
  GROUP_REG_INDICATOR,
  JOINT_DATE_TIME_FORMAT,
  SPACE_SEPARATOR,
} from "@/constants/primitive";
import { useExploreContext, useForm } from "@/hooks";
import {
  joinFileName,
  joinPath,
  readDir,
  writeFile,
} from "@/utilities/filesystem";
import { Toast } from "antd-mobile";
import { FileOutline } from "antd-mobile-icons";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

export function CreateDrawButton() {
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
    const result = await writeFile({
      path: joinPath(directory, joinFileName(name, DRAW_SUFFIX), DRAW_FILE),
      data: JSON.stringify(EMPTY_OBJECT),
    });

    if (!result) {
      Toast.show({
        content: ["Failed to create draw", name].join(SPACE_SEPARATOR),
      });
      return;
    }

    await reloadFiles()
      .then(() =>
        Toast.show({
          content: ["Draw", name, "created"].join(SPACE_SEPARATOR),
        })
      )
      .then(handleClose);
  }

  async function reloadFiles() {
    const files = await readDir({ path: directory });
    exploreDispatch({
      type: "files.reload",
      payload: new Set(files),
    });
  }

  return (
    <Fragment>
      <Button
        disabled={Array.from(explore.files).some((file) =>
          GROUP_REG_INDICATOR.test(file.name)
        )}
        onClick={handleClick}
      >
        <Stack>
          <FileOutline />
          <span>Add Draw</span>
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
            name: format(Date.now(), JOINT_DATE_TIME_FORMAT),
          }}
          footer={<Button onClick={handleSubmit}>Create</Button>}
        >
          <FormItem
            name={"name"}
            label={"Name of the new draw"}
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
