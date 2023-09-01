import { useEffect, useRef } from "react";

type UseDelayParams<T> = {
  callback?: () => void | Promise<void>;
  delay?: number;
  target?: Array<T>;
};

export function useDelay<T>(params?: UseDelayParams<T>) {
  const { delay = 500, callback = () => {}, target = [] } = { ...params };

  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) return;

    const timeout = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(timeout);
  }, [delay, target]);
}
