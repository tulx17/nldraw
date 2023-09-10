import { useEffect, useState } from "react";

type UseInitParams = {
  init: () => void | Promise<void>;
  cleanup?: () => void | Promise<void>;
};

export function useInit({ init, cleanup = () => {} }: UseInitParams) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve(init()).then(() => setMounted(true));

    return () => {
      Promise.resolve(cleanup()).then(() => setMounted(false));
    };
  }, []);

  return mounted;
}
