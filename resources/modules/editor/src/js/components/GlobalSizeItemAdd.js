import React, {Component} from "react";
import {
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import Resource from "../classes/Resource";
import updateCssVars from "../helpers/update-css-vars";
import BindIcon from "../../svgs/bind.svg";
import ResponsiveDdMenu from "./ResponsiveDdMenu";
import RotateLeft from "../../svgs/rotate-left.svg";
import UNITS from '../const/UNITS'
import CONSTANTS from "../consts";


class GlobalSizeItemAdd extends Component {
  constructor(props) {
    super(props);
    this.defaultValues = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      unit: 'px',
      name: '',
      bind: true,
    };
    const {isNew, size} = props;
    this.state = {
      size: isNew ? this.defaultValues : size,
      edit: false
    };

    this.onSaveSize = this.onSaveSize.bind(this);
    this.globalStyleResource = new Resource({
      route: "/admin/ajax/global_template_styles"
    });
  }


  /**
   *
   * @param {Event} event
   */
  nameChange = (event) => {
    const string = event.target.value;
    this.setState(s => ({
      ...s,
      size: {
        ...s.size,
        name: string
      }
    }));
  }

  onSaveSize(event) {
    event.preventDefault();
    const {size} = this.state;

    const category_guid = editorStore.getState().currentCategory?.value || null

    const send = {
      type: "size",
      category_guid,
      settings: JSON.stringify(size)
    };
    this.globalStyleResource.post(send).then(success => {
      const size = {
        id: success.id,
        guid: success.guid,
        _type: 'size',
        ...success.settings
      };
      this.props.addSize(size);
      this.props.onSaveSizeClose();
      updateCssVars()
    });
  }


  changeUnit = (e) => {
    let {size} = this.state;
    let unit = e.target.dataset.unit;

    const{
      currentScreen,
    } = this.props
    if(currentScreen.name !== CONSTANTS.DEFAULT_BREAKPOINT){
      size[currentScreen.name] = size[currentScreen.name] || {...this.defaultValues}
      size[currentScreen.name].unit = unit
      size[currentScreen.name] = {...size[currentScreen.name]}
      size = {
        ...size,
      }
    } else {
      size = {
        ...size,
        unit
      }
    }
    this._changeValue(size);
  };

  changeBind = changeBind.bind(this)
  changeValue = changeValue.bind(this)
  _changeValue= (size)=>{
    this.setState(state=>({...state, size}))
  }
  reset = ()=>{
    this._changeValue(this.defaultValues)
  }
  onSubmit=(e)=>{
    e.stopPropagation()
    e.preventDefault()
  }
  render() {
    let {size} = this.state;
    const{
      currentScreen,
    } = this.props


    if(currentScreen.name !== CONSTANTS.DEFAULT_BREAKPOINT){
      size = size[currentScreen.name] || {
        left: size.left,
        bottom: size.bottom,
        right: size.right,
        top: size.top,
        unit: size.unit,
        bind: size.bind,
      }
    }

    return (
        <form onSubmit={this.onSubmit}>
          <div className=" global-size__group global-effect__group">
            <label htmlFor="enter_size_name">Enter Size Name</label>
            <InputGroup
              required
              name="name"
              id="text-input"
              placeholder="Enter Size Name"
              defaultValue={this.state.size.name}
              onChange={this.nameChange}
            />
          </div>

          <div className=" global-size__group global-effect__group">
            <div className="w-100">Size Settings:</div>

            <ResponsiveDdMenu />
            <div className="control-slider-type">
              {
                UNITS.map(unit => {
                  let classes = 'control-slider-type-box';
                  if (size.unit === unit) {
                    classes += ' control-slider-type-box_active';
                  }
                  return <div className={classes}
                              key={unit}>
                    <button onClick={this.changeUnit}
                            data-unit={unit}
                            className="control-slider-type-label">{unit}</button>
                  </div>
                })
              }

              <div className="control-shadow-toggle " onClick={this.reset}>

                <RotateLeft id="shadowContentIcon" fill="#8E94AA" width="16" height="16" viewBox="0 0 24 24"
                            className="control-shadow-svg-content"/>
              </div>
            </div>
            <div className="control-group">
              <div className="control-dimensions-container">
                <input className="control-field control-field-dimensions control-field-top-l"
                       onKeyDown={this.onKeyDown}
                       onChange={this.changeValue}
                       data-active="top"

                       value={size.top || ''}
                       type="number" />
                <label className="control-field-top-l-label control-field-dimensions-label">TOP</label>
              </div>
              <div className="control-dimensions-container">
                <input className="control-field control-field-dimensions control-field-top-r"
                       onChange={this.changeValue}
                       data-active="right"

                       value={size.right || ''}
                       type="number" />
                <label className="control-field-top-r-label control-field-dimensions-label">RIGHT</label>
              </div>
              <div className="control-dimensions-container">
                <input className="control-field control-field-dimensions control-field-bot-l"
                       onChange={this.changeValue}
                       data-active="bottom"
                       value={size.bottom || ''}
                       type="number" />
                <label className="control-field-bot-l-label control-field-dimensions-label">BOTTOM</label>
              </div>
              <div className="control-dimensions-container">
                <input className="control-field control-field-dimensions control-field-bot-r"
                       onChange={this.changeValue}
                       data-active="left"
                       value={size.left || ''}
                       type="number" />
                <label className="control-field-bot-r-label control-field-dimensions-label">LEFT</label>
              </div>
              <div id="bind" className="control-field control-field-bind"
                   style={size.bind ? { transition: "0s", backgroundColor: "#8E94AA", borderColor: "#8E94AA", } : {}}
                   onClick={this.changeBind}>
                <BindIcon width="12" height="12" fill={size.bind ? "#FFF" : "#8E94AA"} />
              </div>
            </div>
          </div>


          <FormGroup>
            <button className="btn-global__fonts-save"
                    onClick={this.onSaveSize}
                    type="submit" style={{width: "100%"}}>
              Save
            </button>
          </FormGroup>
        </form>
    );
  }
}


export default GlobalSizeItemAdd;

export const changeBind = function() {
  let {size} = this.state;

  let _size
  const{
    currentScreen,
  } = this.props

  if(currentScreen.name === CONSTANTS.DEFAULT_BREAKPOINT){
    _size = {...size}
  } else {
    _size = size[currentScreen.name] || {
      left: size.left,
      bottom: size.bottom,
      right: size.right,
      top: size.top,
      unit: size.unit,
      bind: size.bind,
    }
  }
  _size.bind = ! _size.bind
  if(currentScreen.name === CONSTANTS.DEFAULT_BREAKPOINT){
    size = _size
  } else {
    size = {...size}
    size[currentScreen.name] = _size
  }
  this._changeValue(size)
}
export const changeValue =function (e) {
  let {size} = this.state;
  let _size
  const{
    currentScreen,
  } = this.props

  if(currentScreen.name === CONSTANTS.DEFAULT_BREAKPOINT){
    _size = {...size}
  } else {
    _size = size[currentScreen.name] || {
      left: size.left,
      bottom: size.bottom,
      right: size.right,
      top: size.top,
      unit: size.unit,
      bind: size.bind,
    }
  }
  if (_size.bind === true) {
    if (e.target.value <= 9999) {

      _size['left'] = e.target.value
      _size['bottom'] = e.target.value
      _size['top'] = e.target.value
      _size['right'] = e.target.value

    }
  } else {
    let active = null;
    if (e.currentTarget != undefined) {
      active = e.currentTarget.dataset.active;
    }
    _size[active] = e.target.value

  }

  if(currentScreen.name === CONSTANTS.DEFAULT_BREAKPOINT){
    size = _size
  } else {
    size = {...size}
    size[currentScreen.name] = _size
  }
  this._changeValue(size);
}
