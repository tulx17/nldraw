import { Button, Stack } from "@/components";
import { BACK_SYMBOL, PATH_PREFERENCES } from "@/constants/primitive";
import { joinPath } from "@/utilities/filesystem";
import { SetOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

export function PreferencesButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(joinPath(BACK_SYMBOL, PATH_PREFERENCES));
    return;
  }

  return (
    <Button onClick={handleClick}>
      <Stack>
        <SetOutline />
        <span>Preferences</span>
      </Stack>
    </Button>
  );
}
