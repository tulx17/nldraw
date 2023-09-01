import { useEffect } from "react";

type UseInitParams = {
  init: () => void;
  cleanup?: () => void;
};

export default function useInit({ init, cleanup = () => {} }: UseInitParams) {
  useEffect(() => {
    init();
    return cleanup;
  }, []);
}
