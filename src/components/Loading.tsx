import {
  DotLoading as AntDLoading,
  DotLoadingProps as AntDLoadingProps,
} from "antd-mobile";

type LoadingProps = AntDLoadingProps;

export function Loading(props: LoadingProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <AntDLoading {...props} />
    </div>
  );
}
