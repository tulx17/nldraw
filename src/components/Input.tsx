import { Input as AntDInput, InputProps as AntDInputProps } from "antd-mobile";

type InputProps = AntDInputProps;

export function Input(props: InputProps) {
  return <AntDInput {...props} />;
}
