import { EMPTY_ARRAY } from "@/constants/primitive";
import { app } from "@/utilities/capacitor";
import { BackButtonListener } from "@capacitor/app";
import { PluginListenerHandle } from "@capacitor/core";
import { useEffect } from "react";

type ListenerEventParams = Parameters<(typeof app)["addListener"]>;

type UseNativeAppEventParams = Partial<{
  backButton: BackButtonListener;
}>;

export function useNativeAppEvent(params: UseNativeAppEventParams) {
  useEffect(() => {
    const listenedEvents = EMPTY_ARRAY as Array<PluginListenerHandle>;

    Object.entries(params).forEach(async ([name, handler]) => {
      const listener = await app.addListener(
        name as ListenerEventParams[0],
        handler 
      );

      listenedEvents.push(listener);
    });

    return () =>
      listenedEvents.forEach(async (listener) => await listener.remove());
  }, []);
}
