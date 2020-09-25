import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import ContentIcon from '../../../svgs/content.svg'
import Select from "react-select";
import HistoryIcon from '../../../svgs/history.svg'
import controllerDecorate from "../../decorators/controller";
import ResponsiveDdMenu from "../ResponsiveDdMenu";

class CreativeHoverController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.openCreativeHover = this.openCreativeHover.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.inputBlurUpdate = this.inputBlurUpdate.bind(this);
    this.blurChange = this.blurChange.bind(this);
    this.units = ['s']
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || false;
    this.state = {
      value,
      show: true,
      activeCreativeHover: false,
      //duration
      durationMax: this.props.durationMax || 10,
      durationMin: this.props.durationMin || 0.1,
    };
  }
  getDefaultValue() {
    return {
      style: {}
    };
  }


  openCreativeHover() {
    let shadowContainer = document.getElementById("creativeHoverContainer");
    let shadowContentIcon = document.getElementById("shadowContentIcon");
    // shadowContainer.classList.toggle("control-shadow-active");

    this.setState({
      activeCreativeHover: !this.state.activeCreativeHover
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
      label: value.label
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
        label: 'Style 1'
      },
      {
        value: 'cl-style-2',
        label: 'Style 2'
      },
      {
        value: 'cl-style-3',
        label: 'Style 3'
      },
      {
        value: 'cl-style-4',
        label: 'Style 4'
      },
      // {
      //   value: 'cl-style-5',
      //   label: 'Style 5'
      // },
      {
        value: 'cl-style-6',
        label: 'Style 6'
      },
      {
        value: 'cl-style-7',
        label: 'Style 7'
      },
      {
        value: 'cl-style-8',
        label: 'Style 8'
      },
      // {
      //   value: 'cl-style-9',
      //   label: 'Style 9'
      // },
      // {
      //   value: 'cl-style-10',
      //   label: 'Style 10'
      // },
      // {
      //   value: 'cl-style-11',
      //   label: 'Style 11'
      // },
      {
        value: 'cl-style-12',
        label: 'Style 12'
      },
      {
        value: 'cl-style-13',
        label: 'Style 13'
      },
      {
        value: 'cl-style-14',
        label: 'Style 14'
      },
      {
        value: 'cl-style-15',
        label: 'Style 15'
      },
      {
        value: 'cl-style-16',
        label: 'Style 16'
      },
      {
        value: 'cl-style-17',
        label: 'Style 17'
      },
      {
        value: 'cl-style-18',
        label: 'Style 18'
      },
      {
        value: 'cl-style-19',
        label: 'Style 19'
      },
      {
        value: 'cl-style-20',
        label: 'Style 20'
      },
      {
        value: 'cl-style-21',
        label: 'Style 21'
      },
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
        position: 'absolute'
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

    let creativeHover = "";

    if (this.state.show === false) {
      return '';
    }

    if (this.state.activeCreativeHover === true) {
      creativeHover = <div id="creativeHoverContainer" className="control-typographic-wrapper control-shadow-wrapper-none">
        {/* начало select2 */}
        <div className="controller-container controller-container_select2">
          <div className="control-select2-header">
            <div className="control-select2__label">Style</div>
          </div>
          <div className="control-container_select2-wrapper">
            <Select
              onChange={this.changeStyle}
              value={value.style.label}
              options={styleOptions}
              styles={customStyles}
              placeholder={value.label}
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
      </div>
    } else {
      creativeHover = <div></div>
    }

    return <div className="controller-container controller-container_shadow">
      <div className="controller-container__label control-shadow-label">
        {this.props.label}
        <div className="responsive-absolute">
          <ResponsiveDdMenu />
        </div>
      </div>
      <div className="control-group control-group-shadow">
        <div className="control-shadow-toggle control-shadow-toggle-active" onClick={this.openCreativeHover} fill="#8E94AA">
          <ContentIcon id="shadowContentIcon" className="control-shadow-svg-content" fill="#8E94AA" width="16" height="16" />
        </div>

        {creativeHover}

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
export default connect(mapStateToProps)(CreativeHoverController);
