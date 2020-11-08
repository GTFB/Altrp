import React, {useEffect, useRef, useState} from "react";
import {usePopper} from "react-popper";

export default function AltrpPopper(props) {
  const object = useRef();
  const [placement, setPlacement] = useState(props.settings.placement);
  const [updateSettings, setUpdateSettings] = useState(props.settings.updateSettings || {});

  const {styles, attributes, forceUpdate} = usePopper(props.target.current, object.current, {
    placement: placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: props.settings.offset
        }
      },
    ]
  });

  useEffect(() => {
    if (placement !== props.settings.placement) {
      setPlacement(props.settings.placement);
      forceUpdate()
    }

    if (Object.keys(updateSettings).length !== 0) {
      if (JSON.stringify(updateSettings) !== JSON.stringify(props.settings.updateSettings)) {
        setUpdateSettings(props.settings.updateSettings);
        forceUpdate()
      }
    }
  });

  return React.cloneElement(props.children, {
    ref: object,
    style: styles.popper,
    ...attributes.popper,
  })
}
