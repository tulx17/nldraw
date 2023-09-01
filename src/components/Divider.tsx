import {
  Divider as AntDDivider,
  DividerProps as AntDDividerProps,
} from "antd-mobile";

type DividerProps = AntDDividerProps;

export function Divider(props: DividerProps) {
  return <AntDDivider {...props} />;
}
