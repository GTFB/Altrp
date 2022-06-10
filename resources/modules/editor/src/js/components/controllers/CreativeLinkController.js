import {controllerMapStateToProps} from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color"
import DynamicIcon from '../../../svgs/dynamic.svg'
import ContentIcon from '../../../svgs/content.svg'
import Select from "react-select";
import HistoryIcon from '../../../svgs/history.svg'
import controllerDecorate from "../../decorators/controller";
import ResponsiveDdMenu from "../ResponsiveDdMenu";
import {renderScrollbar} from "../../../../../admin/src/components/altrp-select/AltrpSelect";

class CreativeLinkController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.openCreativeLink = this.openCreativeLink.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.inputBlurUpdate = this.inputBlurUpdate.bind(this);
    this.blurChange = this.blurChange.bind(this);
    this.openColorPicker = this.openColorPicker.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.openBackgroundPicker = this.openBackgroundPicker.bind(this);
    this.backgroundChange = this.backgroundChange.bind(this);
    this.secondColorChange = this.secondColorChange.bind(this);
    this.secondOpenColorPicker = this.secondOpenColorPicker.bind(this);
    this.thirdColorChange = this.thirdColorChange.bind(this);
    this.thirdOpenColorPicker = this.thirdOpenColorPicker.bind(this);
    this.fourthColorChange = this.fourthColorChange.bind(this);
    this.fourthOpenColorPicker = this.fourthOpenColorPicker.bind(this);
    this.units = ['s'];
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || false;
    this.state = {
      value,
      show: true,
      activeCreativeLink: false,
      //color
      activeColor: false,
      //secondColor
      secondActiveColor: false,
      //thirdColor
      thirdActiveColor: false,
      //fourthColor
      fourthActiveColor: false,
      //background
      activeBackground: false,
      //duration
      durationMax: this.props.durationMax || 10,
      durationMin: this.props.durationMin || 0.1,
      //lineHeight
      lineHeightMax: this.props.lineHeightMax || 10,
      lineHeightMin: this.props.lineHeightMin || 0.1,
    };
  }
  getDefaultValue() {
    return {
      style: ""
    }
  }


  openCreativeLink() {
    let shadowContainer = document.getElementById("creativeLinkContainer");
    let shadowContentIcon = document.getElementById("shadowContentIcon");
    // shadowContainer.classList.toggle("control-shadow-active");

    this.setState({
      activeCreativeLink: !this.state.activeCreativeLink
    });

    if (shadowContentIcon.getAttribute("fill") === "#8E94AA") {
      shadowContentIcon.removeAttribute("fill");
      shadowContentIcon.setAttribute("fill", "#5bc0de");
    } else {
      shadowContentIcon.removeAttribute("fill");
      shadowContentIcon.setAttribute("fill", "#8E94AA");
    }
  }
  //начало select2 (style)
  changeStyle(value) {
    let _value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ..._value,
      style: value.value,
      label: value.label,
      color: ``,
      colorRGB: ``,
      colorPickedHex: "",
      opacity: 1,
      secondColor: ``,
      secondColorRGB: ``,
      secondColorPickedHex: "",
      secondOpacity: 1,
      thirdColor: ``,
      thirdColorRGB: ``,
      thirdColorPickedHex: "",
      thirdOpacity: 1,
      fourthColor: ``,
      fourthColorRGB: ``,
      fourthColorPickedHex: "",
      fourthOpacity: 1,
    })
  };
  //конец select2 (style)
  //начало duration
  inputBlurUpdate(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      size: e.target.value
    });
  }

  styleOptions = unit => {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      sizeUnit: unit
    });
  }

  blurChange(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      size: e.target.value
    });
  };
  //конец duration
  //начало color
  colorChange(color) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this.setState({
      // colorPickedHex: color.hex,
      // colorPickedRGB: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      // opacity: color.rgb.a,
      // colorRGB: color.rgb
    });
    this._changeValue({
      ...value,
      color: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      colorRGB: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      colorPickedHex: color.hex,
      opacity: color.rgb.a,
    });
  };

  openColorPicker() {
    this.setState({
      activeColor: !this.state.activeColor
    })
  };
  //конец color
  //начало secondColor
  secondColorChange(color) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      secondColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      secondColorRGB: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      secondColorPickedHex: color.hex,
      secondOpacity: color.rgb.a,
    });
  };

  secondOpenColorPicker() {
    this.setState({
      secondActiveColor: !this.state.secondActiveColor
    })
  };
  //конец secondColor
  //начало thirdColor
  thirdColorChange(color) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      thirdColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      thirdColorRGB: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      thirdColorPickedHex: color.hex,
      thirdOpacity: color.rgb.a,
    });
  };

  thirdOpenColorPicker() {
    this.setState({
      thirdActiveColor: !this.state.thirdActiveColor
    })
  };
  //конец thirdColor
  //начало fourthColor
  fourthColorChange(color) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      fourthColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      fourthColorRGB: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      fourthColorPickedHex: color.hex,
      fourthOpacity: color.rgb.a,
    });
  };

  fourthOpenColorPicker() {
    this.setState({
      fourthActiveColor: !this.state.fourthActiveColor
    })
  };
  //конец fourthColor
  // начало background
  backgroundChange(color) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this.setState({
      // colorPickedHex: color.hex,
      // colorPickedRGB: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      // opacity: color.rgb.a,
      // colorRGB: color.rgb
    });
    this._changeValue({
      ...value,
      background: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      backgroundRGB: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      backgroundPickedHex: color.hex,
      opacityBg: color.rgb.a,
    });
  };

  openBackgroundPicker() {
    this.setState({
      activeBackground: !this.state.activeBackground
    })
  };
  //конец background
  render() {
    if (this.state.show === false) {
      return '';
    }
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    const styleOptions = [
      {
        value: 'none',
        label: 'None'
      },
      {
        value: 'cl-style-1',
        label: 'Brace'
      },
      {
        value: 'cl-style-2',
        label: 'Rotate block up'
      },
      {
        value: 'cl-style-3',
        label: 'Bottom line up'
      },
      {
        value: 'cl-style-4',
        label: 'Bottom line down'
      },
      {
        value: 'cl-style-5',
        label: 'Rotate word up'
      },
      {
        value: 'cl-style-6',
        label: 'Upper line down'
      },
      {
        value: 'cl-style-7',
        label: 'Upper line up'
      },
      {
        value: 'cl-style-8',
        label: 'Border corner'
      },
      {
        value: 'cl-style-9',
        label: 'Description'
      },
      {
        value: 'cl-style-10',
        label: 'Block left'
      },
      {
        value: 'cl-style-11',
        label: 'Fill with line'
      },
      {
        value: 'cl-style-12',
        label: 'Circles on hover'
      },
      {
        value: 'cl-style-13',
        label: 'Dots on hover'
      },
      {
        value: 'cl-style-14',
        label: 'Lines rotate'
      },
      {
        value: 'cl-style-15',
        label: 'Text push'
      },
      {
        value: 'cl-style-16',
        label: 'Text corner'
      },
      {
        value: 'cl-style-17',
        label: 'Text fade bottom'
      },
      {
        value: 'cl-style-18',
        label: 'Lines X rotate'
      },
      {
        value: 'cl-style-19',
        label: 'Rotate block right'
      },
      {
        value: 'cl-style-20',
        label: 'Flip card'
      },
      {
        value: 'cl-style-21',
        label: 'Lines on hover'
      },
      {
        value: 'cl-style-22',
        label: 'Bottom L-R'
      },
      {
        value: 'cl-style-23',
        label: 'Bottom R-L'
      },
      {
        value: 'cl-style-24',
        label: 'Center line'
      },
      {
        value: 'cl-style-25',
        label: 'Bottom L-L'
      },
      {
        value: 'cl-style-26',
        label: 'Bottom R-R'
      },
      {
        value: 'cl-style-27',
        label: 'Center border'
      },
      {
        value: 'cl-style-28',
        label: 'C-R-C'
      },
      {
        value: 'cl-style-29',
        label: 'C-L-C'
      }
    ];
    // стили для select2
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "#FFF" : "#8E94AA",
        backgroundColor: state.isSelected ? "#5897fb" : "#FFF",
        fontSize: 13,
        padding: 5,
        height: 20
      }),

      menu: () => ({
        margin: 0,
        padding: 0,
        width: "100%",
        borderRadius: "0px 0px 3px 3px",
        borderWidth: "0px 1px 1px 1px",
        borderStyle: "solid",
        borderColor: "#E5E6EA",
        position: 'absolute',
        zIndex: 100
      }),

      menuList: () => ({
        margin: 0,
        padding: 0,
      }),

      control: (state) => ({
        display: "flex",
        height: 28,
        borderRadius: 3,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E5E6EA",
        color: "#8E94AA",
        fontSize: 13,
      }),

      placeholder: () => ({
        color: "#8E94AA",
        fontSize: 13,
        opacity: 1
      }),

      indicatorSeparator: () => ({
        display: "none !important"
      }),

      singleValue: () => ({
        color: "#8E94AA",
      })
    };
    // конец стилей для select2

    let creativeLink = "";

    if (this.state.show === false) {
      return '';
    }

    //color
    let colorPickedStyle = {
      backgroundColor: value.color
    };

    //secondColor
    let secondColorPickedStyle = {
      backgroundColor: value.secondColor
    };

    //thirdColor
    let thirdColorPickedStyle = {
      backgroundColor: value.thirdColor
    };

    //fourthColor
    let fourthColorPickedStyle = {
      backgroundColor: value.fourthColor
    };

    //background
    let backgroundPickedStyle = {
      backgroundColor: value.background
    };

    if (this.state.activeCreativeLink === true) {
      let valueCreativeLink = {
        style: "style",
        label: "Choose style",
        ...value
      };

      creativeLink = <div id="creativeLinkContainer" className="control-typographic-wrapper control-shadow-wrapper-none">
        {/* начало select2 */}
        <div className="controller-container controller-container_select2">
          <div className="control-select2-header">
            <div className="control-select2__label">Style</div>
          </div>
          <div className="control-container_select2-wrapper">
            <Select
              onChange={this.changeStyle}
              value={valueCreativeLink.style}
              options={styleOptions}
              styles={customStyles}
              placeholder={valueCreativeLink.label}
              components={{ MenuList: renderScrollbar }}
              noOptionsMessage={() => "no fonts found"}
            />
          </div>
        </div>
        {/* начало slider duration */}
        <div className="control-slider-header control-shadow-blur-header">
          <div className="control-slider-label control-slider-label--typographic">
            Transition Duration
            <div className="control-slider-type-label__wrapper">
              {this.units.map(unit => <button onClick={() => this.styleOptions(unit)}
                key={unit}
                className={`control-slider-type-label ${unit === value.sizeUnit ? 'control-slider-type-label--active' : ''}`}
              >
                {unit}
              </button>)}
            </div>
          </div>
        </div>
        <div className="control-slider-input-wrapper control-shadow-blur">
          <input type="range"
                 min={this.state.durationMin}
                 max={this.state.durationMax}
                 step="0.1"
                 className="control-slider" value={value.size || 0} onChange={this.inputBlurUpdate} onInput={this.blurChange} />
          <div className="control-slider-input-box">
            <input className="control-slider-input" type="number"
                   min={this.state.durationMin}
                   max={this.state.durationMax}
                   step="0.1"
                   value={value.size || 0} onChange={this.inputBlurUpdate} onInput={this.blurChange} />
          </div>
        </div>
        {/* конец slider duration */}
        {/* начало color */}
        <div className="control-color-header">
          <div className="controller-container__label">First color</div>
        </div>
        <div className="control-color-wrapper" onClick={this.openColorPicker}>
          <div className="control-color-input">
            <div className="control-color-colorPicked-container">
              <div className="control-color-colorPicked" style={colorPickedStyle} />
            </div>
            <label className="control-color-hex">{value.colorPickedHex}</label>
          </div>
          <div className="control-color-opacity-container">
            <label className="control-color-opacity" >{(value.opacity * 100 || 0).toFixed() + "%"}</label>
          </div>
        </div>
        {
          this.state.activeColor ?
            <div id="colorPicker" className="control-color-colorPicker">
              <SketchPicker width="90%" presetColors={[]} color={value.colorRGB}
                            onChange={this.colorChange} className="sketchPicker" />
            </div>
            : ""
        }
        {/* конец color */}
        {/* начало secondColor */}
        <div className="control-color-header">
          <div className="controller-container__label">Second color</div>
        </div>
        <div className="control-color-wrapper" onClick={this.secondOpenColorPicker}>
          <div className="control-color-input">
            <div className="control-color-colorPicked-container">
              <div className="control-color-colorPicked" style={secondColorPickedStyle} />
            </div>
            <label className="control-color-hex">{value.secondColorPickedHex}</label>
          </div>
          <div className="control-color-opacity-container">
            <label className="control-color-opacity" >{(value.secondOpacity * 100 || 0).toFixed() + "%"}</label>
          </div>
        </div>
        {
          this.state.secondActiveColor ?
            <div id="colorPicker" className="control-color-colorPicker">
              <SketchPicker width="90%" presetColors={[]} color={value.secondColorRGB}
                            onChange={this.secondColorChange} className="sketchPicker" />
            </div>
            : ""
        }
        {/* конец secondColor */}
        {/* начало thirdColor */}
        <div className="control-color-header">
          <div className="controller-container__label">Third color</div>
        </div>
        <div className="control-color-wrapper" onClick={this.thirdOpenColorPicker}>
          <div className="control-color-input">
            <div className="control-color-colorPicked-container">
              <div className="control-color-colorPicked" style={thirdColorPickedStyle} />
            </div>
            <label className="control-color-hex">{value.thirdColorPickedHex}</label>
          </div>
          <div className="control-color-opacity-container">
            <label className="control-color-opacity" >{(value.thirdOpacity * 100 || 0).toFixed() + "%"}</label>
          </div>
        </div>
        {
          this.state.thirdActiveColor ?
            <div id="colorPicker" className="control-color-colorPicker">
              <SketchPicker width="90%" presetColors={[]} color={value.thirdColorRGB}
                            onChange={this.thirdColorChange} className="sketchPicker" />
            </div>
            : ""
        }
        {/* конец thirdColor */}
        {/* начало fourthColor */}
        <div className="control-color-header">
          <div className="controller-container__label">Fourth color</div>
        </div>
        <div className="control-color-wrapper" onClick={this.fourthOpenColorPicker}>
          <div className="control-color-input">
            <div className="control-color-colorPicked-container">
              <div className="control-color-colorPicked" style={fourthColorPickedStyle} />
            </div>
            <label className="control-color-hex">{value.fourthColorPickedHex}</label>
          </div>
          <div className="control-color-opacity-container">
            <label className="control-color-opacity" >{(value.fourthOpacity * 100 || 0).toFixed() + "%"}</label>
          </div>
        </div>
        {
          this.state.fourthActiveColor ?
            <div id="colorPicker" className="control-color-colorPicker">
              <SketchPicker width="90%" presetColors={[]} color={value.fourthColorRGB}
                            onChange={this.fourthColorChange} className="sketchPicker" />
            </div>
            : ""
        }
        {/* конец fourthColor */}
        {/* начало background */}
        <div className="control-color-header">
          <div className="controller-container__label">Background</div>
        </div>
        <div className="control-color-wrapper" onClick={this.openBackgroundPicker}>
          <div className="control-color-input">
            <div className="control-color-colorPicked-container">
              <div className="control-color-backgroundPicked" style={backgroundPickedStyle}></div>
            </div>
            <label className="control-color-hex">{value.backgroundPickedHex}</label>
          </div>
          <div className="control-color-opacity-container">
            <label className="control-color-opacity" >{(value.opacityBg * 100 || 0).toFixed() + "%"}</label>
          </div>
        </div>
        {
          this.state.activeBackground ?
            <div id="backgroundPicker" className="control-color-backgroundPicker">
              <SketchPicker width="90%" presetColors={[]} background={value.backgroundRGB}
                            onChange={this.backgroundChange} className="sketchPicker" />
            </div>
            : <div></div>
        }
        {/* конец background */}
      </div>
    } else {
      creativeLink = <div></div>
    }

    return <div className="controller-container controller-container_shadow">
      <div className="controller-container__label control-shadow-label">
        {this.props.label}
        <div className="responsive-absolute">
          <ResponsiveDdMenu />
        </div>
      </div>
      <div className="control-group control-group-shadow">
        <div className="control-shadow-toggle control-shadow-toggle-active" onClick={this.openCreativeLink} fill="#8E94AA">
          <ContentIcon id="shadowContentIcon" className="control-shadow-svg-content" fill="#8E94AA" width="16" height="16" />
        </div>

        {creativeLink}

      </div>
    </div>

  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}
export default connect(controllerMapStateToProps)(CreativeLinkController);
