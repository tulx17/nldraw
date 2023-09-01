import { ROUTER } from "@/constants/router";
import {
  RouterProvider as Provider,
  RouterProviderProps as ProviderProps,
} from "react-router-dom";

type RouterProviderProps = Omit<ProviderProps, "router">;

export function RouterProvider(props: RouterProviderProps) {
  return (
    <Provider
      router={ROUTER}
      {...props}
    />
  );
}
