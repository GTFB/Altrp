import React, {useEffect, useRef, useState, useMemo} from "react";
import ReactDOM from "react-dom";
import {usePopper} from "react-popper";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import { usePrevious } from "../../../../../front-app/src/js/helpers/react";

export default function AltrpPopper(props) {
  const object = useRef();
  const [updateSettings, setUpdateSettings] = useState(props.settings.updateSettings || {});
  const [getTargetRef, setGetTargetRef] = useState(false);
  const prevUpdateToken = usePrevious(props.updateToken);

  let body = document.body;

  if(!props.editor) {
    body = useMemo(() => {
      return isEditor() ?
        document.getElementById("editorContent").contentWindow.document.body
        :
        document.body
    });
  }

  let placement = props.settings.placement;
  const variantPlace = [
    "bottom-start",
    "bottom",
    "bottom-end",
    "top-start",
    "top",
    "top-end",
    "left-start",
    "left",
    "left-end",
    "right-start",
    "right",
    "right-end"
  ];

  if(variantPlace.indexOf(placement) === -1) {
    placement = variantPlace[0]
  }
  const {styles, attributes, forceUpdate, update} = usePopper(props.target.current, object.current, {
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
    if(props.updateToken !== prevUpdateToken) {
      forceUpdate();
      const event = new Event("resize", {bubbles : true, cancelable : true});
      if(isEditor()) {
        // altrpEditorContent.editorWindow.current.dispatchEvent(event)
        update();
      } else {
        console.log();
        // window.dispatchEvent(event)
        update();
      }
    }

    if (Object.keys(updateSettings).length !== 0) {
      if (JSON.stringify(updateSettings) !== JSON.stringify(props.settings.updateSettings)) {
        setUpdateSettings(props.settings.updateSettings);
        forceUpdate()
      }
    }

    if(!getTargetRef && props.target.current) {
      setGetTargetRef(true)
    }


  }, [props.children, placement, props.target, props.updateToken]);

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
