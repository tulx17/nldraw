import { List, ListItem, Switch } from "@/components";
import { usePreferencesContext } from "@/hooks";
import { Fragment } from "react";

export function Preferences() {
  const [preferences, preferencesDispatch] = usePreferencesContext();

  return (
    <Fragment>
      <List header={"Preferences"}>
        <ListItem
          arrow={false}
          onClick={() => preferencesDispatch({ type: "darkMode.toggle" })}
          extra={<Switch checked={preferences.darkMode} />}
        >
          Dark mode
        </ListItem>
      </List>
    </Fragment>
  );
}
