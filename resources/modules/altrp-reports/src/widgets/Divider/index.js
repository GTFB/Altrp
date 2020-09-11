import React from "react";

const Divider = (props) => {
  return (
    <hr
      style={{
        borderTopWidth: parseInt(props.size) || 2,
        borderTopColor: props.color,
        breakAfter: props.breakAfter,
      }}
    />
  );
};

export default Divider;
