import Close from "./../../../svgs/plus.svg";
import CssEditor from "./CssEditor";
import React from "react";

function CssEditorModal({toggleCssEditor}) {
  return (
    <div className="wrapper-css-editor" onClick={toggleCssEditor}>
      <div className="block-css-editor" onClick={(e) => e.stopPropagation()}>
        <Close onClick={toggleCssEditor} width={16} height={16} className="icon-css-editor"/>
        <CssEditor/>
      </div>
    </div>
  )
}

export default CssEditorModal;
