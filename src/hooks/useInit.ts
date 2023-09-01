import { useEffect, useState } from "react";

type UseInitParams = {
  init: () => void;
  cleanup?: () => void;
};

export function useInit({ init, cleanup = () => {} }: UseInitParams) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    init();
    setMounted(true);

    return () => {
      cleanup();
      setMounted(false);
    };
  }, []);

  return mounted;
}
