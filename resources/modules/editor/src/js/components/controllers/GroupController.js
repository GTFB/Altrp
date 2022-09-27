import React, { Component } from "react";
import { connect } from "react-redux";
import RotateLeft from '../../../svgs/rotate-left.svg'
import Pencil from '../../../svgs/pencil.svg'
import controllerDecorate, {controllerMapStateToProps} from "../../decorators/controller";
import Controller from "../../classes/Controller";

class GroupController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    const value = this.getSettings(this.props.controlId) || null;
    this.popoverRef = React.createRef()
    this.state = {
      undoEnabled: ! ! value,
      value,
    };
    document.addEventListener('click', this.onBodyClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onBodyClick)
  }

  onBodyClick = e=>{

    let target = e.target
    console.log(target);
    do {
      target = target.parentNode
    } while(target?.parentNode && target.parentNode !== this.popoverRef.current)
    console.log(target);
    if(target === document){
      this.setState(state=>({
        ...state,
        openPopover: false
      }))
    }
  }


  onClick = (e) => {
    e.preventDefault();
    let value = {...this.state.value};
    if(! this.state.value){
      this.props.fields.map(field =>{
        if(field.default){
          value[field.controlId] = _.clone(field.default)
        }
      })
    }

    this.setState(state=>({
      ...state,
      undoEnabled: true,
      value,
      openPopover: ! this.state.openPopover,
    }))
    this._changeValue(value);
  };


  _componentDidUpdate(prevProps){
    /**
     *  если элемент другой обновим items
     */
    if(prevProps.currentElement.getId() !== this.props.currentElement.getId()){
      const value = this.getSettings(this.props.controlId) || null;
      this.setState(state => ({...state, value}))
    }
    if(prevProps.currentScreen !== this.props.currentScreen){
      const value = this.getSettings(this.props.controlId) || null;
      this.setState(state => ({...state, value}))
    }
  }

  changeValue(controlId, value) {
    let newValue = {...this.state.value};
    newValue[controlId] = value;
    this._changeValue(newValue);
    this.setState(state=>({...state, value: newValue}))
  }

  undoClick = (e) => {
    e.preventDefault();
    this.setState(state=>({
      ...state,
      undoEnabled: false,
      openPopover: false,
      value: null,
    }))
    this._changeValue(null);
  }
  render() {
    const {undoEnabled, show, openPopover, value} = this.state
    console.log(value);
    const {fields = []} = this.props
    if (show === false) {
      return '';
    }

    return <div className="controller-container controller-container__group" ref={this.popoverRef}>
      <div className="controller-container__label">
        {this.props.label || ''}
      </div>
      {undoEnabled && <RotateLeft className="controller-container__undo"
                                  onClick={this.undoClick}/>}
      <button className={`controller-container__button-group ${undoEnabled ? 'controller-container__button-group_active' : ''}`} onClick={this.onClick}>
        <Pencil/>
      </button>
      {
        openPopover &&
          <div className="controller-container__group-popover">
            {fields.map((field) => {
              let ControllerComponent = controllersManager.getController(field.type);
              let controller = new Controller({ ...field, group: this, });
              let _value = _.get(value, field.controlId,'');
              let key  = `${this.props.controlId}_${field.controlId}`;
              return <ControllerComponent
                {...field}
                group={this}
                key={key}
                default={_value}
                controller={controller}
              />
            })}
          </div>
      }
    </div>
  }
}

export default connect(controllerMapStateToProps)(GroupController);
