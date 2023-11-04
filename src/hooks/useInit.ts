import { useEffect, useState } from "react";

type UseInitParams = {
  init: () => void | Promise<void>;
  cleanup?: () => void | Promise<void>;
};

export function useInit({ init, cleanup = () => {} }: UseInitParams) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    void Promise.resolve(init()).then(() => setMounted(true)).catch();

    return () => {
      void Promise.resolve(cleanup()).then(() => setMounted(false)).catch();
    };
  }, []);

  return mounted;
}
