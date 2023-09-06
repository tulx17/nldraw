import {
  Ellipsis as AntDEllipsis,
  EllipsisProps as AntDEllipsisProps,
} from "antd-mobile";

type EllipsisProps = AntDEllipsisProps;

export function Ellipsis(props: EllipsisProps) {
  return <AntDEllipsis {...props} />;
}
