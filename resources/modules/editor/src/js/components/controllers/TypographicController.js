import { controllerMapStateToProps } from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import ContentIcon from "../../../svgs/content.svg";
import Select from "react-select";
import controllerDecorate from "../../decorators/controller";
import {
  addFont,
  removeFont
} from "../../../../../front-app/src/js/store/fonts-storage/actions";
import { renderScrollbar } from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import {altrpFontsSet, GOOGLE_FONT, SYSTEM_FONT} from "../../../../../front-app/src/js/constants/fonts";
import PresetGlobalFonts from "./PresetGlobalFonts";
import store from "../../store/store";
import { changeTemplateStatus } from "../../store/template-status/actions";
import ResponsiveDdMenu from "../ResponsiveDdMenu";

class TypographicController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.openTypographic = this.openTypographic.bind(this);
    this.changeFamily = this.changeFamily.bind(this);
    this.weightChange = this.weightChange.bind(this);
    this.styleChange = this.styleChange.bind(this);
    this.decorationChange = this.decorationChange.bind(this);
    this.transformChange = this.transformChange.bind(this);
    this.inputBlurUpdate = this.inputBlurUpdate.bind(this);
    this.blurChange = this.blurChange.bind(this);
    this.inputHorUpdate = this.inputHorUpdate.bind(this);
    this.horChange = this.horChange.bind(this);
    this.verChange = this.verChange.bind(this);
    this.setGlobal = this.setGlobal.bind(this);
    this.inputVerUpdate = this.inputVerUpdate.bind(this);
    const familyOptions = [
      {
        label: 'System Fonts',
        options: _.toPairs(altrpFontsSet).map(([font, type]) => {
          if(type === SYSTEM_FONT){
            return {
              label: font,
              value: font
            };
          }
        }).filter(f => f)
      },
      {
        label: 'Google Fonts',
        options: _.toPairs(altrpFontsSet).map(([font, type]) => {
          if(type === GOOGLE_FONT){
            return {
              label: font,
              value: font
            };
          }
        }).filter(f => f)
      },
    ]
    // const familyOptions = _.toPairs(altrpFontsSet).map(([font, type]) => {
    //   return {
    //     label: font,
    //     value: font
    //   };
    // });
    this.units = ["px", "em", "rem", "%", "vw", "vh"];
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || false;
    this.state = {
      value,
      show: true,
      familyOptions,
      activeTypographic: false,
      //size
      sizeMin: this.props.sizeMin || 0,
      sizeMax: this.props.sizeMax || 200,
      //lineHeight
      lineHeightMax: this.props.lineHeightMax || 10,
      lineHeightMin: this.props.lineHeightMax || 0.1,
      //spacing
      spacingMax: this.props.spacingMax || 10,
      spacingMin: this.props.spacingMin || -5
    };
  }
  getDefaultValue() {
    return {
      family: {}
    };
  }

  hasGlobal(guid) {
    return getCurrentElement().hasGlobal(guid);
  }

  setGlobal(guid) {
    const globalFonts = this.props.globalFonts;
    const guidFont = globalFonts.filter(font => font.guid == guid)[0];
    const {
      decoration,
      family,
      lineHeight,
      size,
      spacing,
      label,
      sizeUnit,
      weight,
      style,
      transform
    } = guidFont;
    const fontValue = {
      decoration: decoration,
      family: family,
      label: label,
      lineHeight: lineHeight,
      size: size,
      spacing: spacing,
      sizeUnit: sizeUnit,
      weight: weight,
      style: style,
      transform: transform
    };
    if (guidFont) {
      if (family) {
        appStore.dispatch(
          addFont(
            getCurrentElement().getId(),
            this.props.controller.getSettingName(),
            family
          )
        );
        getCurrentElement().addFont(
          this.props.controller.getSettingName(),
          family
        );
      } else {
        appStore.dispatch(
          removeFont(
            getCurrentElement().getId(),
            this.props.controller.getSettingName()
          )
        );
        getCurrentElement().removeFont(this.props.controller.getSettingName());
      }
      this._changeValue(fontValue);
      getCurrentElement().setGlobalStyle(
        guid,
        this.props.controller.getSettingName()
      );
      getCurrentElement().updateAllGlobals(guid, fontValue);
      store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_NEED_UPDATE));
    }
  }

  openTypographic() {
    let shadowContainer = document.getElementById("typographicContainer");
    let shadowContentIcon = document.getElementById("shadowContentIcon");
    // shadowContainer.classList.toggle("control-shadow-active");

    this.setState({
      activeTypographic: !this.state.activeTypographic
    });

    if (shadowContentIcon.getAttribute("fill") === "#8E94AA") {
      shadowContentIcon.removeAttribute("fill");
      shadowContentIcon.setAttribute("fill", "#5bc0de");
    } else {
      shadowContentIcon.removeAttribute("fill");
      shadowContentIcon.setAttribute("fill", "#8E94AA");
    }
  }
  /**
   * Меняем шрифт
   */
  changeFamily(value) {
    const { currentElement } = this.props;
    let _value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    if (value && value.value) {
      appStore.dispatch(
        addFont(
          currentElement.getId(),
          this.props.controller.getSettingName(),
          value.value
        )
      );
      currentElement.addFont(
        this.props.controller.getSettingName(),
        value.value
      );
    } else {
      appStore.dispatch(
        removeFont(
          currentElement.getId(),
          this.props.controller.getSettingName()
        )
      );
      currentElement.removeFont(this.props.controller.getSettingName());
    }
    this._changeValue({
      ..._value,
      family: value ? value.value : "",
      label: value ? value.label : ""
    });
  }
  //конец select2
  //начало size
  inputBlurUpdate(e) {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      size: e.target.value
    });
  }

  changeSizeUnit = unit => {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      sizeUnit: unit
    });
  };

  changeLineHeightUnit = unit => {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      lineHeightUnit: unit
    });
  };

  blurChange(e) {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      size: e.target.value
    });
  }
  //конец size
  //начало weight
  weightChange(e) {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      weight: e.target.value
    });
  }
  //конец weight
  //начало transform
  transformChange(e) {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      transform: e.target.value
    });
  }
  //конец transform
  //начал style
  styleChange(e) {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      style: e.target.value
    });
  }
  //конец style
  //начало decoration
  decorationChange(e) {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      decoration: e.target.value
    });
  }
  //конец decoration
  //начало lineHeight
  inputHorUpdate(e) {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      lineHeight: e.target.value
    });
  }

  horChange(e) {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      lineHeight: e.target.value
    });
  }
  //конец lineHeight
  //начало letter spacing
  inputVerUpdate(e) {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      spacing: e.target.value
    });
  }

  verChange(e) {
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      spacing: e.target.value
    });
  }
  //конец letter spacing

  render() {
    if (this.state.show === false) {
      return "";
    }
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    const { familyOptions } = this.state;
    const weightOptions = [
      {
        value: "100",
        label: "100"
      },
      {
        value: "200",
        label: "200"
      },
      {
        value: "300",
        label: "300"
      },
      {
        value: "400",
        label: "400"
      },
      {
        value: "500",
        label: "500"
      },
      {
        value: "600",
        label: "600"
      },
      {
        value: "700",
        label: "700"
      },
      {
        value: "800",
        label: "800"
      },
      {
        value: "900",
        label: "900"
      },
      {
        value: "bold",
        label: "bold"
      },
      {
        value: "normal",
        label: "normal"
      },
      {
        value: "bolder",
        label: "bolder"
      },
      {
        value: "lighter",
        label: "lighter"
      }
    ];

    const transformOptions = [
      {
        value: "none",
        label: "default",
        key: 0
      },
      {
        value: "capitalize",
        label: "capitalize",
        key: 1
      },
      {
        value: "uppercase",
        label: "uppercase",
        key: 2
      },
      {
        value: "lowercase",
        label: "lowercase",
        key: 3
      }
    ];

    const styleOptions = [
      {
        value: "normal",
        label: "normal",
        key: 0
      },
      {
        value: "italic",
        label: "italic",
        key: 1
      },
      {
        value: "oblique",
        label: "oblique",
        key: 2
      }
    ];

    const decorationOptions = [
      {
        value: "none",
        label: "none",
        key: 0
      },
      {
        value: "underline",
        label: "underline",
        key: 1
      },
      {
        value: "overline",
        label: "overline",
        key: 3
      },
      {
        value: "line-through",
        label: "line-through",
        key: 4
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
        backgroundColor: "#fff",
        borderStyle: "solid",
        borderColor: "#E5E6EA",
        position: "absolute",
        zIndex: 100
      }),

      menuList: () => ({
        margin: 0,
        padding: 0
      }),

      control: state => ({
        display: "flex",
        height: 28,
        borderRadius: 3,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E5E6EA",
        color: "#8E94AA",
        fontSize: 13
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
        color: "#8E94AA"
      })
    };
    // конец стилей для select2

    let typographic = "";

    if (this.state.activeTypographic === true) {
      typographic = (
        <div
          id="typographicContainer"
          className="control-typographic-wrapper control-shadow-wrapper-none"
        >
          <PresetGlobalFonts
            setFont={this.setGlobal}
            checkGlobal={this.hasGlobal}
          />
          {/* начало select2 */}
          <div className="controller-container controller-container_select2">
            <div className="control-select2-header">
              <div className="control-select2__label">Family</div>
            </div>
            <div className="control-container_select2-wrapper">
              <Select
                onChange={this.changeFamily}
                value={_.get(value, "family.label", "")}
                options={familyOptions}
                styles={customStyles}
                placeholder={value.label}
                isClearable={true}
                components={{ MenuList: renderScrollbar }}
                noOptionsMessage={() => "no fonts found"}
              />
            </div>
          </div>
          {/* начало slider size */}
          <div className="control-slider-header control-shadow-blur-header">
            <div className="control-slider-label control-slider-label--typographic">
              Size
              <div className="control-slider-type-label__wrapper">
                {this.units.map(unit => (
                  <button
                    onClick={() => this.changeSizeUnit(unit)}
                    key={unit}
                    className={`control-slider-type-label ${
                      unit === value.sizeUnit
                        ? "control-slider-type-label--active"
                        : ""
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="control-slider-input-wrapper control-shadow-blur">
            <input
              type="range"
              min={this.state.sizeMin}
              max={this.state.sizeMax}
              className="control-slider"
              value={value.size || 0}
              onChange={this.inputBlurUpdate}
              onInput={this.blurChange}
            />
            <div className="control-slider-input-box">
              <input
                className="control-slider-input"
                type="number"
                min={this.state.sizeMin}
                max={this.state.sizeMax}
                value={value.size || 0}
                onChange={this.inputBlurUpdate}
                onInput={this.blurChange}
              />
            </div>
          </div>
          {/* конец slider size */}
          {/* начало select weight */}
          <div className="controller-container controller-container_select controller-container_select_typographic">
            <div className="controller-container__label control-select__label">
              Weight
            </div>
            <div className="control-container_select-wrapper">
              <select
                name="weightSelect"
                value={value.weight || 100}
                className="control-select control-field"
                onChange={this.weightChange}
              >
                {weightOptions.map(option => {
                  return (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* конец select weight */}
          {/* начало select transform */}
          <div className="controller-container controller-container_select controller-container_select_typographic">
            <div className="controller-container__label control-select__label">
              Transform
            </div>
            <div className="control-container_select-wrapper">
              <select
                name="weightSelect"
                value={value.transform || "default"}
                className="control-select control-field"
                onChange={this.transformChange}
              >
                {transformOptions.map(option => {
                  return (
                    <option value={option.value} key={option.key}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* конец select transform */}
          {/* начало select style */}
          <div className="controller-container controller-container_select controller-container_select_typographic">
            <div className="controller-container__label control-select__label">
              Style
            </div>
            <div className="control-container_select-wrapper">
              <select
                name="weightSelect"
                value={value.style || "normal"}
                className="control-select control-field"
                onChange={this.styleChange}
              >
                {styleOptions.map(option => {
                  return (
                    <option value={option.value} key={option.key}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* конец select style */}
          {/* начало select decoration */}
          <div className="controller-container controller-container_select controller-container_select_typographic">
            <div className="controller-container__label control-select__label">
              Decoration
            </div>
            <div className="control-container_select-wrapper">
              <select
                name="weightSelect"
                value={value.decoration || "none"}
                className="control-select control-field"
                onChange={this.decorationChange}
              >
                {decorationOptions.map(option => {
                  return (
                    <option value={option.value} key={option.key}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* конец select decoration */}
          {/* начало slider Line-Height */}
          <div className="control-slider-header controller-container_slider_typographic_top">
            <div className="control-slider-label control-slider-label--typographic">
              Line-Height
              <div className="control-slider-type-label__wrapper">
                <button
                  onClick={() => this.changeLineHeightUnit("px")}
                  className={`control-slider-type-label ${
                    value.lineHeightUnit === "px"
                      ? "control-slider-type-label--active"
                      : ""
                  }`}
                >
                  px
                </button>
              </div>
            </div>
          </div>
          <div className="control-slider-input-wrapper">
            <input
              type="range"
              min={this.state.lineHeightMin}
              max={this.state.lineHeightMax}
              step="0.1"
              className="control-slider"
              value={value.lineHeight || 0}
              onChange={this.inputHorUpdate}
              name="horizontal"
            />
            <div className="control-slider-input-box">
              <input
                className="control-slider-input"
                type="number"
                min={this.state.lineHeightMin}
                max={this.state.lineHeightMax}
                step="0.1"
                value={value.lineHeight || 0}
                name="horizontalNumber"
                onChange={this.horChange}
              />
            </div>
          </div>
          {/* конец slider line-Height */}
          {/* начало slider Letter Spacing */}
          <div className="control-slider-header">
            <div className="control-slider-label">Letter Spacing</div>
          </div>
          <div className="control-slider-input-wrapper">
            <input
              type="range"
              min={this.state.spacingMin}
              max={this.state.spacingMax}
              step="0.1"
              className="control-slider"
              value={value.spacing || 0}
              onChange={this.inputVerUpdate}
              name="spacing"
            />
            <div className="control-slider-input-box">
              <input
                className="control-slider-input"
                type="number"
                min={this.state.spacingMin}
                max={this.state.spacingMax}
                step="0.1"
                value={value.spacing || 0}
                name="spacingNumber"
                onChange={this.verChange}
              />
            </div>
          </div>
          {/* конец slider letter Spacing */}
        </div>
      );
    } else {
      typographic = <div></div>;
    }

    return (
      <div className="controller-container controller-container_shadow">
        <div className="controller-container__label control-shadow-label">
          {this.props.label}
          <div className="responsive-absolute-shadow">
            <ResponsiveDdMenu />
          </div>
        </div>
        <div className="control-group control-group-shadow">
          <div
            className="control-shadow-toggle control-shadow-toggle-active"
            onClick={this.openTypographic}
            fill="#8E94AA"
          >
            <ContentIcon
              id="shadowContentIcon"
              className="control-shadow-svg-content"
              fill="#8E94AA"
              width="16"
              height="16"
            />
          </div>

          {typographic}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}
export default connect(controllerMapStateToProps)(TypographicController);
