import { Fragment } from "react";
import { Link } from "react-router-dom";

export function Explore() {
  return (
    <Fragment>
      <div>Explore</div>
      <div>
        <Link to={"../preferences"}>Preferences</Link>
      </div>
      <div>
        <Link to={"../draw/123"}>Draw 123</Link>
      </div>
    </Fragment>
  );
}
