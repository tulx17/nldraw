import {
  Form as AntDForm,
  FormItemProps as AntDFormItemProps,
  FormProps as AntDFormProps,
} from "antd-mobile";
import { PropsWithChildren } from "react";

type FormProps = AntDFormProps;
type FormItemProps = AntDFormItemProps;
type FormHeaderProps = PropsWithChildren;

export function Form(props: FormProps) {
  return <AntDForm {...props} />;
}

export function FormItem(props: FormItemProps) {
  return <AntDForm.Item {...props} />;
}

export function FormHeader(props: FormHeaderProps) {
  return <AntDForm.Header {...props} />;
}
