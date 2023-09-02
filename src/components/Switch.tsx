import {
  Switch as AntDSwitch,
  SwitchProps as AntDSwitchProps,
} from "antd-mobile";

type SwitchProps = AntDSwitchProps;

export function Switch(props: SwitchProps) {
  return <AntDSwitch {...props} />;
}
