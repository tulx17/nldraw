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
      <List header={"Canvas default behavior"}>
        <ListItem
          arrow={false}
          onClick={() => preferencesDispatch({ type: "draw.darkMode.toggle" })}
          extra={<Switch checked={preferences.drawDarkMode} />}
        >
          Dark mode
        </ListItem>
        <ListItem
          arrow={false}
          onClick={() => preferencesDispatch({ type: "draw.focused.toggle" })}
          extra={<Switch checked={preferences.drawFocused} />}
        >
          Focus mode
        </ListItem>
        <ListItem
          arrow={false}
          onClick={() => preferencesDispatch({ type: "draw.gridBackground.toggle" })}
          extra={<Switch checked={preferences.drawGridBackground} />}
        >
          Grid background
        </ListItem>
        <ListItem
          arrow={false}
          onClick={() => preferencesDispatch({ type: "draw.snapShape.toggle" })}
          extra={<Switch checked={preferences.drawSnapShape} />}
        >
          Snap shape
        </ListItem>
        <ListItem
          arrow={false}
          onClick={() => preferencesDispatch({ type: "draw.toolLocked.toggle" })}
          extra={<Switch checked={preferences.drawToolLocked} />}
        >
          Tool locked
        </ListItem>
        <ListItem
          arrow={false}
          onClick={() => preferencesDispatch({ type: "draw.penOnly.toggle" })}
          extra={<Switch checked={preferences.drawPenOnly} />}
        >
          Pen only
        </ListItem>
      </List>
    </Fragment>
  );
}
