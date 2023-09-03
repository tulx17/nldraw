import { List, ListItem, Switch } from "@/components";
import { useDarkScheme } from "@/hooks";
import { SmileFill, SmileOutline } from "antd-mobile-icons";
import { Fragment } from "react";

export function Preferences() {
  const { isDarkScheme, toggle } = useDarkScheme();

  return (
    <Fragment>
      <List header={"Preferences"}>
        <ListItem
          arrow={false}
          onClick={toggle}
          extra={
            <Switch
              // defaultChecked={isDarkScheme}
              checked={isDarkScheme}
              checkedText={<SmileFill />}
              uncheckedText={<SmileOutline />}
            />
          }
        >
          Color scheme
        </ListItem>
      </List>
    </Fragment>
  );
}
