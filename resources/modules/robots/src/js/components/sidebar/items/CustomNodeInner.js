import * as React from "react";

export default ({ node, config }) => {
  return <p className="node__inner">{node.properties.body}</p>;
};
