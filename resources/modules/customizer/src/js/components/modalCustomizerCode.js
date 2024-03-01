import ReactDOM from "react-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/webpack-resolver';
import React from "react";
import Close from "./../../../../editor/src/svgs/plus.svg";
import jsCompleter from "../helpers/jsCompleter";



let langTools =  window.ace.require('ace/ext/language_tools');
console.log(langTools)
let completer = {
  getCompletions: jsCompleter
};

langTools.addCompleter(completer);



function ModalCustomizerCode({path, placeholder, value, onChange, toggleModal}) {
  return (
    ReactDOM.createPortal(
      <div className="modal-code" onClick={toggleModal}>
        <div className="modal-code__container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-code__header">
            <h1 className="model-code__title">Robotizer code editor</h1>
            <Close onClick={toggleModal} width={28} height={28} className="modal-code-icon__close"/>
          </div>
          <div className="modal-code__content">
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={onChange}
              width="100%"
              height="100%"
              placeholder={placeholder}
              fontSize={14}
              name={"aceJsCustomizerEditor_" + path + "_modal"}
              value={value}
              setOptions={{
                enableLiveAutocompletion: true,
                useWorker: false
              }}
            />
          </div>
        </div>
      </div>,
      document.body
    )
  )
}

export default ModalCustomizerCode;
