import { EMPTY_STRING } from "@/constants/primitive";

export function getDecodedURIComponent(
  params:
    | {
        name?: string;
        from: URLSearchParams;
      }
    | string
    | undefined
) {
  if (!params) return EMPTY_STRING;

  if (typeof params === "string") return decodeURIComponent(params);

  const { name = EMPTY_STRING, from: source } = { ...params };

  const result = decodeURIComponent(source.get(name) || EMPTY_STRING);

  return result;
}
