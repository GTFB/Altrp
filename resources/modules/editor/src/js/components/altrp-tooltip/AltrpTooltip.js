import React from 'react';

function AltrpTooltip(props) {
  return <div className={`altrp-tooltip altrp-tooltip--${props.position}`}>
    {props.children}
  </div>;
}

export default AltrpTooltip;
