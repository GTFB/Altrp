import React from 'react';
let Tooltip2;

if(window.altrpLibs) {
  Tooltip2 = window.altrpLibs.Tooltip2;
}

function offset(slider) {
  if(!slider) {
    slider = {size: null}
  } else if(!slider.size) {
    slider = {size: null, ...slider }
  }

  if(slider.size === 0) {
    return { size: null }
  }

  return slider
}

function AltrpTooltip(props) {
  const state = props.state || "never";
  const minimal = props.minimal || false;
  const position = props.position || "bottom";

  let horizontal = offset(props.horizontal);
  let vertical = offset(props.vertical);
  let offsetArray = [parseInt(horizontal.size|| 0), parseInt(vertical.size|| 10)];

  switch (position) {
    case "left":
      offsetArray = [parseInt(vertical.size), parseInt(horizontal.size|| 10)];
      break;
    case "right":
      offsetArray = [parseInt(vertical.size), parseInt(horizontal.size|| 10)];
      break;
  }

  
  if(Tooltip2 && props.children && !_.isString(props.children)) {
    return <Tooltip2
      content={props.text}
      popoverClassName={`altrp-tooltip-popover altrp-tooltip${props.id}`}
      isOpen={state === "always" ? true : null}
      interactionKind={state !== "always" ? state : null }
      placement={position}
      minimal={minimal}
      modifiers={{
        offset: {
          enabled: true,
          options: {
            offset: offsetArray
          }
        },
      }}
    >
      {
        React.cloneElement(props.children, {
          // onClick: state === "click" ? () => {
          //   console.log('ea')
          // } : null
        })
      }
    </Tooltip2>
  } else {
    return props.children
  }
}

export default AltrpTooltip;
