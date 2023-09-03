import { List, ListItem, Switch } from "@/components";
import { toggleDarkScheme } from "@/utilities/darkScheme";
import { Fragment, useEffect, useState } from "react";

export function Preferences() {
  const [darkScheme, setDarkScheme] = useState(
    !!document.querySelector("[data-prefers-color-scheme=dark]")
  );

  useEffect(() => {
    toggleDarkScheme(!darkScheme);
  }, [darkScheme]);

  return (
    <Fragment>
      <List header={"Preferences"}>
        <ListItem
          extra={
            <Switch
              checked={darkScheme}
              checkedText={"dark"}
              uncheckedText={"light"}
              onChange={() => setDarkScheme((prev) => !prev)}
            />
          }
        >
          Color scheme
        </ListItem>
      </List>
    </Fragment>
  );
}
