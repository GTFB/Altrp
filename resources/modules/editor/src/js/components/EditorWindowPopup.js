import CloseModal from "./../../svgs/clear_black.svg";
import "./../../sass/EditorWindowPopup.scss";


function EditorWindowPopup(props) {


  return (
    <div className={props.activeMode ? "editor-window__popup editor-window__popup-active" : "editor-window__popup"} onClick={props.toggleModalWindow}>
      <div className="editor-window__popup-content" onClick={(e) => e.stopPropagation()}>
        <CloseModal className="editor-icon_modal" onClick={props.toggleModalWindow}/>
        <div className="editor-window__popup-content-wrapper">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default EditorWindowPopup;
