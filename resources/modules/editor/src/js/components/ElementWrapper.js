import React, {Component} from "react";
import {connect} from "react-redux";
import {editorSetCurrentElement, getEditor, getFactory} from "../helpers";
import EditIcon from '../../svgs/edit.svg';
import DeleteIcon from '../../svgs/delete.svg';
import DotsIcon from '../../svgs/dots_section.svg';
import ColumnIcon from '../../svgs/columns.svg';
import AddIcon from '../../svgs/add.svg';
import DuplicateIcon from '../../svgs/duplicate.svg';

class ElementWrapper extends Component {
  constructor(props){
    super(props);
    this.chooseElement = this.chooseElement.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.duplicateElement = this.duplicateElement.bind(this);
  }

  render() {
    let classes = `altrp-element ${this.props.element.getSelector()} altrp-element_${this.props.element.getType()}`;
    let overlayClasses = `overlay`;
    if (this.props.currentElement === this.props.element) {
      classes += ' altrp-element_current';
    }
    let editText = `Edit ${this.props.element.getTitle()}`;
    let duplicateText = `Duplicate ${this.props.element.getTitle()}`;
    let deleteText = `Delete ${this.props.element.getTitle()}`;
    let _EditIcon = EditIcon;
    switch (this.props.element.getType()){
      case 'section':{
        _EditIcon = DotsIcon;
      }
      break;
      case 'column':{
        _EditIcon = ColumnIcon;
      }
      break;
    }
    return <div className={classes}>
      <div className={overlayClasses}>
        <div className="overlay-settings">
          <button className="overlay-settings__button overlay-settings__button_add " title="Add Section">
            <AddIcon className="icon"/>
          </button>
          <button className="overlay-settings__button overlay-settings__button_edit "
                  onClick={this.chooseElement}
                  title={editText}>
            <_EditIcon className="icon"/>
          </button>
          <button className="overlay-settings__button overlay-settings__button_duplicate "
                  onClick={this.duplicateElement}
                  title={duplicateText}>
            <DuplicateIcon className="icon"/>
          </button>
          <button className="overlay-settings__button overlay-settings__button_delete "
                  onClick={this.deleteElement}
                  title={deleteText}>
            <DeleteIcon className="icon"/>
          </button>
        </div>
      </div>
      {
        React.createElement(this.props.component, {
          element: this.props.element,
          children: this.props.element.getChildren(),
        })
      }
    </div>

  }

  chooseElement() {
    this.props.element.setElementAsCurrent();
    getEditor().showSettingsPanel();
  }

  deleteElement() {
    this.props.element.parent.deleteChild(this.props.element);
  }

  duplicateElement(){
    let factory = getFactory();
    console.log(factory);
    console.log(this.props.element.parent);
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement
  };
}

export default connect(mapStateToProps)(ElementWrapper);
