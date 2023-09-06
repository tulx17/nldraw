import { List, ListItem, Switch } from "@/components";
import { usePreferencesContext } from "@/hooks";
import { disableDarkScheme, enableDarkScheme } from "@/utilities/darkScheme";
import { SmileFill, SmileOutline } from "antd-mobile-icons";
import { Fragment, useEffect } from "react";

export function Preferences() {
  const [{ darkScheme }, preferencesDispatch] = usePreferencesContext();

  useEffect(() => {
    switch (darkScheme) {
      case false:
        disableDarkScheme();
        break;

      default:
        enableDarkScheme();
        break;
    }
  }, [darkScheme]);

  return (
    <Fragment>
      <List header={"Preferences"}>
        <ListItem
          arrow={false}
          onClick={() => preferencesDispatch({ type: "darkScheme.toggle" })}
          extra={
            <Switch
              checked={darkScheme}
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
