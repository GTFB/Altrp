const { connect } = window.reactRedux;
import AddIcon from "../../svgs/add.svg";
import DuplicateIcon from "../../svgs/duplicate.svg";
import CloseIcon from "../../svgs/close.svg";
import React from "react";
import {getEditor} from "../helpers";
import {contextMenu} from "react-contexify";
import EditIcon from "../../svgs/edit.svg";
import DotsIcon from "../../svgs/dots_section.svg";
import ColumnIcon from "../../svgs/columns.svg";

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.element = props.element
    this.state = {
      current:false
    }
  }

  deleteElement =(e)=> {
    e.stopPropagation();
    e.preventDefault();
    this.props.element.parent.deleteChild(this.props.element);
  }
  duplicateElement=(e)=>  {
    e.stopPropagation();
    e.preventDefault();
    this.props.element.duplicate();
  }
  showWidgetsPanel=(e)=>  {
    e.stopPropagation();
    e.preventDefault();
    getEditor().showWidgetsPanel();
  }

  chooseElement=(e)=> {
    e.stopPropagation();
    if (e.target.closest("button")) {
      e.preventDefault();
    }
    contextMenu.hideAll();

    this.props.element.setElementAsCurrent();
    getEditor().showSettingsPanel();


    if(this.props.element.getSettings("tooltip_show_type") === "click") {
      this.onClickTooltip()
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.currentElement === this.element){

    }
  }

  render() {

    let _EditIcon = EditIcon;

    switch (this.props.element.getType()) {
      case "section":
      {
        _EditIcon = DotsIcon;
      }
        break;
      case "column":
      {
        _EditIcon = ColumnIcon;
      }
        break;
    }
    let overlayClasses = `overlay`;
    let overlayStyles = { width: "100%" };

    if(this.element === this.props.currentElement){
      overlayClasses += ' overlay_active'
    }
    let editText = `Edit ${this.element.getTitle()}`;
    let duplicateText = `Duplicate ${this.element.getTitle()}`;
    let deleteText = `Delete ${this.element.getTitle()}`;
    return <div
      className={overlayClasses}
      id={"overlay" + this.props.element.getId()}
      style={overlayStyles}
    >
      <div className="overlay-settings">
        <button
          className="overlay-settings__button overlay-settings__button_add "
          title="Add Section"
        >
          <AddIcon className="icon" />
        </button>
        <button
          className="overlay-settings__button overlay-settings__button_edit "
          onClick={this.chooseElement}
          draggable="true"
          onDragStart={this.onDragStart}
          title={editText}
        >
          <_EditIcon className="icon" />
        </button>
        <button
          className="overlay-settings__button overlay-settings__button_duplicate "
          onClick={this.duplicateElement}
          title={duplicateText}
        >
          <DuplicateIcon className="icon" />
        </button>
        <button
          className="overlay-settings__button overlay-settings__button_delete "
          onClick={this.deleteElement}
          title={deleteText}
        >
          <CloseIcon className="icon" width="35" height="35" />
        </button>
      </div>
    </div>
  }

}
function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
  };
}

export default connect(mapStateToProps)(Overlay);
