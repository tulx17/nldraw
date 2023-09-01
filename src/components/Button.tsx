import {
  Button as AntDButton,
  ButtonProps as AntDButtonProps,
} from "antd-mobile";

type ButtonProps = AntDButtonProps;

export function Button(props: ButtonProps) {
  return <AntDButton {...props} />;
}
