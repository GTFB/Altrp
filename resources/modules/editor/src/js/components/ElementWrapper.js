import React, {Component} from "react";
import {connect} from "react-redux";
import {editorSetCurrentElement, getEditor, getFactory, getTemplateDataStorage, topOrBottomHover} from "../helpers";
import EditIcon from '../../svgs/edit.svg';
import DeleteIcon from '../../svgs/delete.svg';
import DotsIcon from '../../svgs/dots_section.svg';
import ColumnIcon from '../../svgs/columns.svg';
import AddIcon from '../../svgs/add.svg';
import DuplicateIcon from '../../svgs/duplicate.svg';
import store from '../store/store'
import {START_DRAG, startDrag} from "../store/element-drag/actions";
import {setCurrentElement} from "../store/current-element/actions";

class ElementWrapper extends Component {
  constructor(props){
    super(props);
    this.chooseElement = this.chooseElement.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.duplicateElement = this.duplicateElement.bind(this);
    this.state = {
      children: this.props.element.getChildren(),
      dragOver: false,
      isDrag: false,
    };
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.wrapper = React.createRef();
  }
  onDragLeave(e){
    this.setState(state => {
      return {...state, dragOver: false, cursorPos: false}}
    );
  }
  onDragOver(e) {
    // console.log('over');
    let draggableElement = store.getState().elementDrag.element;
    e.preventDefault();
    let cursorPos = topOrBottomHover(e, this.wrapper.current);
    //если перетаскивается уже созданный элемент
    if(draggableElement && typeof draggableElement.getType === 'function'){
      //перетаскивание секции в секцию не всплывает
      if(draggableElement.getType() === 'section' && this.props.element.getType() === 'section'){
        e.stopPropagation();
      }
      //перетаскивание виджета в колонку не всплывает
      if(draggableElement.getType() === 'widget' && this.props.element.getType() === 'column'){
        e.stopPropagation();
      }
    }
    //если перетаскивается из панели вджетов, то не всплываем
    if(! draggableElement){
      e.stopPropagation();
    }
    this.setState(state => {
      return {...state, dragOver: true, cursorPos}}
    );
    return false;
  }

  onDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  onDrop(e) {
    /**
     * @member {HTMLElement} target
     * @member {ElementsManger} elementsManager
     * */
    // e.stopPropagation();
    let newWidgetName = e.dataTransfer.getData('text/plain');
    if(newWidgetName){
      e.stopPropagation();
      let newElement = new (elementsManager.getElementClass(newWidgetName));
      if(this.props.element.getType() === 'widget'){
        switch (this.state.cursorPos) {
          case 'top':{
            this.props.element.insertSiblingBefore(newElement);
          }break;
          case 'bottom':{
            this.props.element.insertSiblingAfter(newElement);
          }break;
        }
      }
      if(this.props.element.getType() === 'column'){
        this.props.element.appendChild(newElement);
      }
    }
    /**
     * @member {BaseElement} draggableElement
     * */
    let draggableElement = store.getState().elementDrag.element;
    if(draggableElement && typeof draggableElement.getType === 'function'){
      if(this.props.element.getType() === 'widget' && draggableElement.getType() === 'widget') {
        draggableElement.insertAfter(this.props.element);
        e.stopPropagation();
      }else
      if(this.props.element.getType() === 'column' && draggableElement.getType() === 'widget') {
        this.props.element.appendChild(draggableElement);
        e.stopPropagation();
      } else
      if(this.props.element.getType() === 'section' && draggableElement.getType() === 'section') {
        draggableElement.insertAfter(this.props.element);
        e.stopPropagation();
      }
    }
    this.setState(state => {
      return {...state, dragOver: false, cursorPos:false, isDrag:false}}
    );
    // e.preventDefault();
    // e.stopPropagation();
    // getEditor().modules.templateDataStorage.addWidgetInSection(newWidgetName);
    return false;
  }
  onDragStart(e){
    store.dispatch(startDrag(this.props.element));
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData('altrp-element', this.props.element);
    this.setState(state=>{
      return{...state, isDrag:true};
    });
  }
  onDragEnd(){
    this.stopDrag();
  }
  stopDrag(){
    this.setState(state=>{
      return{...state, isDrag:false,dragOver: false, cursorPos: false};
    });
  }
  getClasses(){
    let classes = '';
    let draggableElement = store.getState().elementDrag.element;
    // console.log(draggableElement);
    if(this.state.isDrag){
      classes += ' altrp-element_is-drag';
      console.log(classes);
      return classes;
    }
    if(this.state.dragOver){
      if(draggableElement && typeof draggableElement.getType === 'function'){
        if(this.props.element.getType() === 'section' && draggableElement.getType() === 'section'){
          classes += ' altrp-element_drag-over';
        }
        if( draggableElement.getType() === 'widget'){
          classes += ' altrp-element_drag-over';
        }
      }
      if(!draggableElement){
        classes += ' altrp-element_drag-over';
      }
    }
    if(this.state.cursorPos){
      classes += ` altrp-element_drag-${this.state.cursorPos}`;
    }
    return classes;
  }

  render() {
    let classes = `altrp-element ${this.props.element.getSelector().replace('.','')} altrp-element_${this.props.element.getType()}`;
    let overlayClasses = `overlay`;
    if (this.props.currentElement === this.props.element) {
      classes += ' altrp-element_current';
    }
    let editText = `Edit ${this.props.element.getTitle()}`;
    let duplicateText = `Duplicate ${this.props.element.getTitle()}`;
    let deleteText = `Delete ${this.props.element.getTitle()}`;
    let _EditIcon = EditIcon;
    classes += this.getClasses();
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
    let emptyColumn = '';
    if(this.props.element.getType() === 'column' && ! this.state.children.length){
      emptyColumn = <div className="column-empty-plus" onClick={this.showWidgetsPanel}><AddIcon className="no-transition"/></div>;
    }
    return <div className={classes}
                ref={this.wrapper}
                onDragOver={this.onDragOver}
                onClick={this.chooseElement}
                onDrop={this.onDrop}
                onDragEnd={this.onDragEnd}
                onDragLeave={this.onDragLeave}
                onDragEnter={this.onDragEnter}>
      <div className={overlayClasses}>
        <div className="overlay-settings">
          <button className="overlay-settings__button overlay-settings__button_add " title="Add Section">
            <AddIcon className="icon"/>
          </button>
          <button className="overlay-settings__button overlay-settings__button_edit "
                  onClick={this.chooseElement}
                  draggable="true"
                  onDragStart={this.onDragStart}
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
          children: this.state.children,
          wrapper: this,
        })
      }
      {
        emptyColumn
      }
    </div>
  }

  chooseElement(e) {
    e.stopPropagation();
    this.props.element.setElementAsCurrent();
    getEditor().showSettingsPanel();
  }

  deleteElement(e) {
    e.stopPropagation();
    this.props.element.parent.deleteChild(this.props.element);
  }
  duplicateElement(e){
    e.stopPropagation();
    let factory = getFactory();
    let newElement = factory.duplicateElement(this.props.element, this.props.element.parent);
    getTemplateDataStorage().setCurrentElement(newElement);
    getEditor().showSettingsPanel();
  }
  showWidgetsPanel(e){
    e.stopPropagation();
    getEditor().showWidgetsPanel();
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    dragState: state.elementDrag.dragState,
  };
}

export default connect(mapStateToProps)(ElementWrapper);
