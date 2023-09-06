import {
  CenterPopup as AntDCenterPopup,
  CenterPopupProps as AntDCenterPopupProps,
  Popup as AntDPopup,
  PopupProps as AntDPopupProps,
} from "antd-mobile";

type PopupProps = AntDPopupProps;
type CenterPopupProps = AntDCenterPopupProps;

export function Popup(props: PopupProps) {
  return (
    <AntDPopup
      closeOnSwipe={true}
      {...props}
    />
  );
}

export function CenterPopup(props: CenterPopupProps) {
  return <AntDCenterPopup {...props} />;
}
