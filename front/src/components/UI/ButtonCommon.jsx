import React from "react";
import { Link } from "react-router-dom";

const ButtonCommon = (props) =>
  !props.link ? (
    <button
      className={["button", `button--${props.design}`].join(" ")}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      type={props.type}
    >
      {props.loading ? "Loading..." : props.children}
    </button>
  ) : (
    <Link
      className={["button", `button--${props.design}`].join(" ")}
      to={props.link}
    >
      {props.children}
    </Link>
  );

export default ButtonCommon;
