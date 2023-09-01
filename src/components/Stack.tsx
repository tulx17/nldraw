import { Space as AntDSpace, SpaceProps as AntDSpaceProps } from "antd-mobile";

type StackProps = AntDSpaceProps;

export function Stack(props: StackProps) {
  return (
    <AntDSpace
      wrap={true}
      {...props}
    />
  );
}
