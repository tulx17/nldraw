import { List, ListItem, Switch } from "@/components";
import { usePreferencesContext } from "@/hooks";
import { SmileFill, SmileOutline } from "antd-mobile-icons";
import { Fragment } from "react";

export function Preferences() {
  const [preferences, preferencesDispatch] = usePreferencesContext();

  return (
    <Fragment>
      <List header={"Preferences"}>
        <ListItem
          arrow={false}
          onClick={() => preferencesDispatch({ type: "darkMode.toggle" })}
          extra={
            <Switch
              checked={preferences.darkMode}
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
