import { EMPTY_STRING } from "@/constants/primitive";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

export function Draw() {
  const { name = EMPTY_STRING } = useParams();

  return <Fragment>Draw {decodeURIComponent(name)}</Fragment>;
}
