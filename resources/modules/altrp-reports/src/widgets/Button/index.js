import React from "react";
import { Button } from "react-bootstrap";

const ButtonTag = (props) => {
  return <Button {...props}>{props.text}</Button>;
};

export default ButtonTag;
