import React, { Component } from "react";
import {
  FormGroup,
  InputGroup,
  Button,
} from "@blueprintjs/core";
import Resource from "../classes/Resource";
import updateCssVars from "../helpers/update-css-vars";
import ResponsiveDdMenu from "./ResponsiveDdMenu";
import RotateLeft from "../../svgs/rotate-left.svg";
import BindIcon from "../../svgs/bind.svg";
import UNITS from '../const/UNITS'
import CONSTANTS from "../consts";
import {changeBind, changeValue} from "./GlobalSizeItemAdd";

class GlobalSizeItem extends Component {
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

  onDeleteSize(event) {
    const confirmation = window.confirm("Are you shure?");
    event.preventDefault();
    if (confirmation) {
      const { size } = this.state;
      this.globalStyleResource.delete(size.id).then(success => {
        this.props.deleteFont(size);
        // this.props.onSaveEffectClose();
        updateCssVars()
      });

    }
  }
  onSaveSize(event) {

    event.preventDefault();
    const { size } = this.state;
    const send = {
      type: "size",
      settings: size
    };
    this.globalStyleResource.put(size.id, send).then(success => {
      this.props.editSize(size);
      this.setState(
        s => ({ ...s, edit: false }),
        () => this.props.updateAllTree(size)
      );
      updateCssVars()
    });
  }

  changeUnit = (e) => {
    const {size} = this.state;
    let unit = e.target.dataset.unit;
    this._changeValue({
      ...size,
      unit
    });
  };

  changeBind = changeBind.bind(this)
  changeValue = changeValue.bind(this)

  onDeleteSize = (event) => {
    const confirmation = window.confirm("Are you shure?");
    event.preventDefault();
    if (confirmation) {
      const { size } = this.state;
      this.globalStyleResource.delete(size.id).then(success => {
        this.props.deleteSize(size);
        // this.props.onSaveEffectClose();
        updateCssVars()
      });

    }
  }
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
      size = size[currentScreen.name] ? {
        ...size[currentScreen.name]
      }: {
        left: size.left,
        bottom: size.bottom,
        right: size.right,
        top: size.top,
        unit: size.unit,
        bind: size.bind,
      }
    }
    const mgButton = this.state.edit ? '20px' : '0';

    return (
      <React.Fragment>

        {!this.props.isNew && (
          <Button
            style={{ width: "100%", marginBottom: mgButton }}
            onClick={e => this.setState(s => ({ ...s, edit: !s.edit }))}
          >
            {!this.props.isNew && size.name}
          </Button>
        )}
        {this.state.edit && <form onSubmit={this.onSubmit}>
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
          <FormGroup>
            <button
              className="btn-global__fonts-delete"
              onClick={this.onDeleteSize}
              style={{ width: "100%" }}
            >
              Delete
            </button>
          </FormGroup>
        </form>}
      </React.Fragment>
    );
  }
}

export default GlobalSizeItem;
