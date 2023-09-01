import { Fragment } from "react";
import { useParams } from "react-router-dom";

export function Draw() {
  const { name } = useParams();

  return <Fragment>Draw {name}</Fragment>;
}
