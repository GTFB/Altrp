import React, {useEffect, useRef, useState, useMemo} from "react";
import ReactDOM from "react-dom";
import {usePopper} from "react-popper";
import {isEditor} from "../../../../../front-app/src/js/helpers";

export default function AltrpPopper(props) {
  const object = useRef();
  const [updateSettings, setUpdateSettings] = useState(props.settings.updateSettings || {});
  const body = useMemo(() => {
    return isEditor() ?
      document.getElementById("editorContent").contentWindow.document.body
      :
      document.body
  });
  const placement = props.settings.placement;
  console.log(placement)
  const {styles, attributes, forceUpdate} = usePopper(props.target.current, object.current, {
    placement,
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

    if (Object.keys(updateSettings).length !== 0) {
      if (JSON.stringify(updateSettings) !== JSON.stringify(props.settings.updateSettings)) {
        setUpdateSettings(props.settings.updateSettings);
        forceUpdate()
      }
    }
  }, [props.children, props.settings.placement]);

  if(props.portal) {
    return ReactDOM.createPortal((
      React.cloneElement(props.children, {
        ref: object,
        style: styles.popper,
        ...attributes.popper,
      })
    ),
      body
    )
  }
  return React.cloneElement(props.children, {
    ref: object,
    style: styles.popper,
    ...attributes.popper,
  })
}
