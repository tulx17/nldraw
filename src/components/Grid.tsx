import {
  Grid as AntDGrid,
  GridItemProps as AntDGridItemProps,
  GridProps as AntDGridProps,
} from "antd-mobile";

type GridProps = AntDGridProps;
type GridItemProps = AntDGridItemProps;

export function Grid(props: GridProps) {
  return (
    <AntDGrid
      gap={10}
      {...props}
    />
  );
}

export function GridItem(props: GridItemProps) {
  return <AntDGrid.Item {...props} />;
}
