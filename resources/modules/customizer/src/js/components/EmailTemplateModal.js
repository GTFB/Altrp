import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/webpack-resolver';
import React, {useCallback, useRef, useState} from "react";
import Close from "./../../../../editor/src/svgs/plus.svg";
import EmailEditor, {EditorRef, EmailEditorProps} from 'react-email-editor';

/**
 *
 * @param {function} toggleModal
 * @param  {function} onSave
 * @param  {object|null}  defaultDesign
 * @param  {string}  defaultValue
 * @param  {boolean} show
 * @returns {{children: *, implementation: *, containerInfo: *, $$typeof: *, key: null|string} | string}
 * @constructor
 */
function ModalCustomizerCode(
  {
    toggleModal,
    onSave,
    defaultValue,
    defaultDesign,
    show
  }
) {

  const [showButton,updateShowButton] = useState(false)

  const onReady = useCallback((unlayer) => {

    // console.log(unlayer.registerCallback('designerOpened', (...e)=>{
    //   console.log(e)
    // }))
    // unlayer.addEventListener('update', (...e)=>{
    //   console.log(e)
    // })
    updateShowButton(true)
//     unlayer.init({
//         customCSS: `
// .blockbuilder-branding{
//   display: none;
// }
//         `
//       });

    // if(defaultValue){
    //   console.log(defaultValue)
    //   unlayer.exportHtml(defaultValue)
    // }
    if(defaultDesign){
      unlayer.loadDesign(defaultDesign)
    }
  }, [defaultValue])


  const exportHtml = useCallback(() => {
    const unlayer = emailEditorRef.current?.editor;



    unlayer?.exportHtml((data) => {
      const {design, html} = data;
      onSave(html, design)
    });
  }, [defaultValue])

  const emailEditorRef = useRef(null);


  return (
    ReactDOM.createPortal(
      <div className="modal-code modal-code_email"
      style={{
        display: show ? 'flex' : 'none'
      }}>
        <div className="modal-code__container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-code__header">
            <h1 className="model-code__title">Robotizer Email Template Editor</h1>
            <Close onClick={toggleModal} width={28} height={28} className="modal-code-icon__close"/>
          </div>
          <div className="modal-code__content">
            <EmailEditor ref={emailEditorRef} onReady={onReady}/>
            {showButton&&<div className="email-button-wrapper">
              <button className="btn font_montserrat font_500 btn_active btn_grey"  onClick={exportHtml}>SAVE</button>
            </div>}
          </div>
        </div>
      </div>,
      document.body
    )
  )
}

export default ModalCustomizerCode;
