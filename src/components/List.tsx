import {
  List as AntDList,
  ListItemProps as AntDListItemProps,
  ListProps as AntDListProps,
  SwipeAction as AntDSwipeAction,
  SwipeActionProps as AntDSwipeActionProps,
} from "antd-mobile";

type ListProps = AntDListProps;
type ListItemProps = AntDListItemProps;
type SwipeItemProps = AntDSwipeActionProps;

export function List(props: ListProps) {
  return <AntDList {...props} />;
}

export function ListItem(props: ListItemProps) {
  return <AntDList.Item {...props} />;
}

export function Swipe(props: SwipeItemProps) {
  return <AntDSwipeAction {...props} />;
}
