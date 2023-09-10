import {
  PullToRefresh as AntDPullToRefresh,
  PullToRefreshProps as AntDPullToRefreshProps,
} from "antd-mobile";

type PullRefreshProps = AntDPullToRefreshProps;

export function PullRefresh(props: PullRefreshProps) {
  return <AntDPullToRefresh {...props} />;
}
