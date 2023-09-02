import { EMPTY_STRING } from "@/constants/primitive";

export function getDecodedComponent(params: {
  name: string;
  from: URLSearchParams;
}) {
  const { name = EMPTY_STRING, from: source } = { ...params };

  const result = decodeURIComponent(source.get(name) || EMPTY_STRING);

  return result;
}
