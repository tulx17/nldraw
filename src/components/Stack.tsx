import { Space as AntDSpace, SpaceProps as AntDSpaceProps } from "antd-mobile";

type StackProps = AntDSpaceProps;

export function Stack({ style, ...otherProps }: StackProps) {
  return (
    <AntDSpace
      wrap={true}
      style={{ width: "100%", ...style }}
      {...otherProps}
    />
  );
}
