import { Dispatch, useEffect, useState } from "react";

export function useDebounce<T>(params: {
  callback: (value?: T) => void;
  initialValue?: T;
  delay?: number;
}) {
  const { callback = () => {}, delay = 500, initialValue } = { ...params };

  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      callback(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return [[value, debouncedValue], setValue] as [[T, T], Dispatch<T>];
}
