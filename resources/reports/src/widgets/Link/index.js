import React from "react";

const Link = (props) => {
  return (
    <a
      className={props.isButton ? "btn btn-primary" : ""}
      href={props.url}
      target={props.target}
    >
      {props.text}
    </a>
  );
};

export default Link;
