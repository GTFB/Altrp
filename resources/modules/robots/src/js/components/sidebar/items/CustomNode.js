import * as React from "react";
import { Begin } from "./Begin";
import { Condition } from "./Condition";
import { Loop } from "./Loop";
import { Action } from "./Action";

export default React.forwardRef(({ node, children, ...otherProps }, ref) => {
  switch (node.type) {
    case "end":
    case "begin":
      return (
        <Begin ref={ref} {...otherProps}>
          {children}
        </Begin>
      );
    case "condition":
      return (
        <Condition ref={ref} {...otherProps}>
          {children}
        </Condition>
      );
    case "loop":
      return (
        <Loop ref={ref} {...otherProps}>
          {children}
        </Loop>
      );
    case "action":
      return (
        <Action ref={ref} {...otherProps}>
          {children}
        </Action>
      );
  }
});
