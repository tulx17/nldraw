import { ConfigProvider, ConfigProviderProps } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";

type AntDProviderProps = Omit<ConfigProviderProps, "locale">;

export function AntDProvider(props: AntDProviderProps) {
  return (
    <ConfigProvider
      locale={enUS}
      {...props}
    />
  );
}
