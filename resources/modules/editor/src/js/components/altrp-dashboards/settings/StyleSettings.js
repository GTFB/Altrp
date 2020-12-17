import React, { Component } from "react";
import ReactSelect from "react-select";
import { connect } from "react-redux";
// import Slider from "rc-slider";
import Schemes from "./NivoColorSchemes";
import MarginInput from "./MarginInput";
import { SketchPicker } from "react-color";

import {
  BAR,
  PIE,
  LINE
} from "../../../../../../admin/src/components/dashboard/widgetTypes";
const selectSettings = {
  menuList: (provided, state) => ({
    ...provided,
    zIndex: "999999999999999999999",
    position: "relative"
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: "999999999999999999999",
    position: "relative"
  }),
  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: "999999999999999999999",
    position: "relative"
  })
};

const regagroScheme = _.find(Schemes, { value: "regagro" }).value;

const curvieTypes = [
  { id: 0, value: "basis" },
  { id: 1, value: "cardinal" },
  { id: 2, value: "catmullRom" },
  { id: 3, value: "linear" },
  { id: 4, value: "monotoneX" },
  { id: 5, value: "monotoneY" },
  { id: 6, value: "natural" },
  { id: 7, value: "step" },
  { id: 8, value: "stepAfter" },
  { id: 9, value: "stepBefore" }
];

const barLayout = [
  {
    id: 0,
    value: "horizontal",
    label: "Горизонтальный"
  },
  {
    id: 1,
    value: "vertical",
    label: "Вертикальный"
  }
];

const barGroup = [
  {
    id: 0,
    value: "stacked",
    label: "Накопление"
  },
  {
    id: 1,
    value: "grouped",
    label: "Группировка"
  }
];

const mapStateToProps = state => {
  return { editElement: _.cloneDeep(state.editElement) };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}

class StyleSettings extends Component {
  constructor(props) {
    super(props);
    const element =
      props.editElement !== null ? _.cloneDeep(props.editElement) : {};
    this.state = {
      editElement: element,
      lineWidth: 2,
      tickRotation: 0,
      pointSize: 6,
      innerRadius: 0,
      padding: 0.1,
      innerPadding: 0,
      sliceLabelsSkipAngle: 0,
      sliceLabelsRadiusOffset: 0.5,
      radialLabelsSkipAngle: 0,
      radialLabelsLinkOffset: 0,
      radialLabelsLinkDiagonalLength: 16,
      radialLabelsLinkHorizontalLength: 24,
      radialLabelsTextXOffset: 6,
      radialLabelsLinkStrokeWidth: 1,
      labelSkipHeight: 0,
      labelSkipWidth: 0,
      currentColorScheme: "",
      cornerRadius: 0,
      padAngle: 0,
      borderWidth: 0,
      borderColor: ""
    };
    this.enableArea = this.enableArea.bind(this);
    this.enableSliceLabels = this.enableSliceLabels.bind(this);
    this.enableRadialLabels = this.enableRadialLabels.bind(this);
    this.enablePoints = this.enablePoints.bind(this);
    this.setReverse = this.setReverse.bind(this);
    this.setColorScheme = this.setColorScheme.bind(this);
    this.setSliceLabelsSkipAngle = this.setSliceLabelsSkipAngle.bind(this);
    this.setRadialLabelsSkipAngle = this.setRadialLabelsSkipAngle.bind(this);
    this.setSliceLabelsRadiusOffset = this.setSliceLabelsRadiusOffset.bind(
      this
    );
    this.setRadialLabelsLinkOffset = this.setRadialLabelsLinkOffset.bind(this);
    this.setRadialLabelsLinkDiagonalLength = this.setRadialLabelsLinkDiagonalLength.bind(
      this
    );
    this.setRadialLabelsLinkHorizontalLength = this.setRadialLabelsLinkHorizontalLength.bind(
      this
    );
    this.setRadialLabelsTextXOffset = this.setRadialLabelsTextXOffset.bind(
      this
    );
    this.setRadialLabelsLinkStrokeWidth = this.setRadialLabelsLinkStrokeWidth.bind(
      this
    );
    this.setLabelSkipHeight = this.setLabelSkipHeight.bind(this);
    this.setLabelSkipWidth = this.setLabelSkipWidth.bind(this);
    this.cornerRadius = this.cornerRadius.bind(this);
    this.padAngle = this.padAngle.bind(this);
    this.borderColor = this.borderColor.bind(this);
    this.borderWidth = this.borderWidth.bind(this);
    this.enableGridX = this.enableGridX.bind(this);
    this.enableGridY = this.enableGridY.bind(this);
    this.enableCrosshair = this.enableCrosshair.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.editElement?.settings?.color === "undefined") {
      setTimeout(() => {
        this.setColorScheme(regagroScheme);
      }, 1000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(
        prevProps.editElement?.settings,
        this.props.editElement?.settings
      )
    ) {
      this.setState(s => ({ ...s, editElement: this.props.editElement }));
    }
  }

  setColorScheme(value) {
    this.props.setColorScheme(value);
    this.setState(s => ({ ...s, currentColorScheme: value }));
  }

  changeWidth(width) {
    this.props.setProperty(width, "lineWidth");
    this.setState(s => ({ ...s, lineWidth: width }));
  }

  setTickRotation(value) {
    this.props.setTickRotation(value);
    this.setState(s => ({ ...s, tickRotation: value }));
  }

  setPointSize(value) {
    this.props.setProperty(value, "pointSize");
    this.setState(s => ({ ...s, pointSize: value }));
  }

  setInnerRadius(value) {
    this.props.setProperty(value, "innerRadius");
    this.setState(s => ({ ...s, innerRadius: value }));
  }

  setPadding(value) {
    this.props.setProperty(value, "padding");
    this.setState(s => ({ ...s, padding: value }));
  }
  setInnerPadding(value) {
    this.props.setProperty(value, "innerPadding");
    this.setState(s => ({ ...s, innerPadding: value }));
  }
  enableArea(e) {
    this.props.setProperty(e.target.checked, "enableArea");
  }
  enableSliceLabels(e) {
    this.props.setProperty(e.target.checked, "enableSliceLabels");
  }
  enableRadialLabels(e) {
    this.props.setProperty(e.target.checked, "enableRadialLabels");
  }
  enablePoints(e) {
    this.props.setProperty(e.target.checked, "enablePoints");
  }
  enableGridX(e) {
    this.props.setProperty(e.target.checked, "enableGridX");
  }
  enableGridY(e) {
    this.props.setProperty(e.target.checked, "enableGridY");
  }
  enableCrosshair(e) {
    this.props.setProperty(e.target.checked, "enableCrosshair");
  }
  setReverse(e) {
    this.props.setProperty(e.target.checked, "reverse");
  }
  setSliceLabelsSkipAngle(e) {
    this.props.setProperty(Number(e.target.value), "sliceLabelsSkipAngle");
  }
  setRadialLabelsSkipAngle(e) {
    this.props.setProperty(Number(e.target.value), "radialLabelsSkipAngle");
  }
  setSliceLabelsRadiusOffset(e) {
    this.props.setProperty(Number(e.target.value), "sliceLabelsRadiusOffset");
  }
  setRadialLabelsLinkOffset(e) {
    this.props.setProperty(Number(e.target.value), "radialLabelsLinkOffset");
  }
  setRadialLabelsLinkDiagonalLength(e) {
    this.props.setProperty(
      Number(e.target.value),
      "radialLabelsLinkDiagonalLength"
    );
  }
  setRadialLabelsLinkHorizontalLength(e) {
    this.props.setProperty(
      Number(e.target.value),
      "radialLabelsLinkHorizontalLength"
    );
  }
  setRadialLabelsTextXOffset(e) {
    this.props.setProperty(Number(e.target.value), "radialLabelsTextXOffset");
  }
  setRadialLabelsLinkStrokeWidth(e) {
    this.props.setProperty(
      Number(e.target.value),
      "radialLabelsLinkStrokeWidth"
    );
  }
  setLabelSkipHeight(e) {
    this.props.setProperty(Number(e.target.value), "labelSkipHeight");
  }
  setLabelSkipWidth(e) {
    this.props.setProperty(Number(e.target.value), "labelSkipWidth");
  }
  cornerRadius(e) {
    this.props.setProperty(Number(e.target.value), "cornerRadius");
  }
  padAngle(e) {
    this.props.setProperty(Number(e.target.value), "padAngle");
  }
  borderWidth(e) {
    this.props.setProperty(Number(e.target.value), "borderWidth");
  }
  borderColor(color) {
    this.props.setProperty(color.hex, "borderColor");
    this.setState(s => ({
      ...s,
      borderColor: color.hex
    }));
  }

  render() {
    return (
      <div className="col">
        <div className="mb-3">
          <div
            className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
          >
            Укажите внутренние отступы
          </div>
          <MarginInput
            widgetID={this.props.widgetID}
            setProperty={this.props.setProperty}
            type={this.state.editElement?.settings?.type}
            margin={this.state.editElement?.settings?.margin}
          />
        </div>
        {this.state.editElement?.settings?.type === LINE && (
          <>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Выберите тип кривой
              </div>
              <ReactSelect
                placeholder="Выберите тип кривой"
                options={curvieTypes}
                className="select-type"
                defaultValue={this.state.editElement?.settings?.curve}
                defaultInputValue={this.state.editElement?.settings?.curve}
                onChange={option =>
                  this.props.setProperty(option.value, "curve")
                }
                getOptionValue={option => option.value}
                getOptionLabel={option => option.value}
                styles={selectSettings}
              />
            </div>
          </>
        )}

        <div className="mb-3">
          <div
            className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
          >
            Выберите цветовую схему{" "}
          </div>
          <ReactSelect
            options={Schemes}
            placeholder="Выберите цветовую схему"
            className="select-type"
            defaultValue={
              this.props.editElement?.settings?.colors?.scheme ||
              this.state.currentColorScheme
            }
            defaultInputValue={
              this.props.editElement?.settings?.colors?.scheme ||
              this.state.currentColorScheme
            }
            onChange={option => this.setColorScheme(option.value)}
            getOptionValue={option => option.value}
            getOptionLabel={option => option.value}
            styles={selectSettings}
          />
        </div>
        {this.state.editElement?.settings?.type === LINE && (
          <>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Укажите ширину линии
              </div>
              <input
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                defaultValue={
                  this.state.editElement?.settings?.lineWidth ||
                  this.state.lineWidth
                }
                onChange={e => this.changeWidth(e.target.value)}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="20"
              />
              (
              {this.state.editElement?.settings?.lineWidth ||
                this.state.lineWidth}
              px)
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Отобразить участки
              </div>
              <input
                type="checkbox"
                defaultChecked={
                  this.state.editElement?.settings?.enableArea || false
                }
                checked={this.state.editElement?.settings?.enableArea}
                onChange={this.enableArea}
              />
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Отобразить точки
              </div>
              <input
                type="checkbox"
                defaultChecked={
                  this.state.editElement?.settings?.enablePoints || true
                }
                checked={this.state.editElement?.settings?.enablePoints}
                onChange={this.enablePoints}
              />
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Отобразить перекрестие
              </div>
              <input
                type="checkbox"
                defaultChecked={
                  this.state.editElement?.settings?.enableCrosshair || true
                }
                checked={this.state.editElement?.settings?.enableCrosshair}
                onChange={this.enableCrosshair}
              />
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Укажите размер точки
              </div>
              <input
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                defaultValue={
                  this.state.editElement?.settings?.pointSize ||
                  this.state.pointSize
                }
                onChange={e => this.setPointSize(e.target.value)}
                type="range"
                min="2"
                max="20"
              />
              (
              {this.state.editElement?.settings?.pointSize ||
                this.state.pointSize}
              px)
            </div>
          </>
        )}
        {(this.state.editElement?.settings?.type !== PIE ||
          this.state.editElement?.settings?.type !== TABLE) && (
          <>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Укажите наклон нижней легенды
              </div>
              <input
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                defaultValue={
                  this.state.editElement?.settings?.axisBottom?.tickRotation ||
                  this.state.tickRotation
                }
                onChange={e => this.setTickRotation(e.target.value)}
                type="range"
                min="-90"
                max="90"
              />
              (
              {this.state.editElement?.settings?.axisBottom?.tickRotation ||
                this.state.tickRotation}
              °)
            </div>

            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Отобразить сетку по X
              </div>
              <input
                type="checkbox"
                defaultChecked={
                  this.state.editElement?.settings?.enableGridX || true
                }
                checked={this.state.editElement?.settings?.enableGridX}
                onChange={this.enableGridX}
              />
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Отобразить сетку по Y
              </div>
              <input
                type="checkbox"
                defaultChecked={
                  this.state.editElement?.settings?.enableGridY || true
                }
                checked={this.state.editElement?.settings?.enableGridY}
                onChange={this.enableGridY}
              />
            </div>
          </>
        )}

        {this.state.editElement?.settings?.type === PIE && (
          <>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Укажите внутренний радиус
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.innerRadius ||
                  this.state.innerRadius
                }
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                onChange={e => this.setInnerRadius(e.target.value)}
                type="range"
                min="0"
                max="0.95"
                step="0.05"
              />
              (
              {this.state.editElement?.settings?.innerRadius ||
                this.state.innerRadius}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Надписи на сегментах
              </div>
              <input
                type="checkbox"
                defaultChecked={
                  this.state.editElement?.settings?.enableSliceLabels || true
                }
                checked={this.state.editElement?.settings?.enableSliceLabels}
                onChange={this.enableSliceLabels}
              />
            </div>

            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Пропускать внутренние подписи при угле сектора
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.sliceLabelsSkipAngle ||
                  this.state.sliceLabelsSkipAngle
                }
                onChange={this.setSliceLabelsSkipAngle}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="45"
                step="1"
              />
              (
              {this.state.editElement?.settings?.sliceLabelsSkipAngle ||
                this.state.sliceLabelsSkipAngle}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Отступ внутренних подписей
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.sliceLabelsRadiusOffset ||
                  this.state.sliceLabelsRadiusOffset
                }
                onChange={this.setSliceLabelsRadiusOffset}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="2"
                step="0.05"
              />
              (
              {this.state.editElement?.settings?.sliceLabelsRadiusOffset ||
                this.state.sliceLabelsRadiusOffset}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Внешние надписи
              </div>
              <input
                type="checkbox"
                defaultChecked={
                  this.state.editElement?.settings?.enableRadialLabels || true
                }
                checked={this.state.editElement?.settings?.enableRadialLabels}
                onChange={this.enableRadialLabels}
              />
            </div>

            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Пропускать внешние подписи при угле сектора
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.radialLabelsSkipAngle ||
                  this.state.radialLabelsSkipAngle
                }
                onChange={this.setRadialLabelsSkipAngle}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="45"
                step="1"
              />
              (
              {this.state.editElement?.settings?.radialLabelsSkipAngle ||
                this.state.radialLabelsSkipAngle}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Отступы внешней подписи
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.radialLabelsLinkOffset ||
                  this.state.radialLabelsLinkOffset
                }
                onChange={this.setRadialLabelsLinkOffset}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="-48"
                max="60"
                step="1"
              />
              (
              {this.state.editElement?.settings?.radialLabelsLinkOffset ||
                this.state.radialLabelsLinkOffset}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Длина линии подписи по диагонали
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings
                    ?.radialLabelsLinkDiagonalLength ||
                  this.state.radialLabelsLinkDiagonalLength
                }
                onChange={this.setRadialLabelsLinkDiagonalLength}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="60"
                step="1"
              />
              npm i rc-slider (
              {this.state.editElement?.settings
                ?.radialLabelsLinkDiagonalLength ||
                this.state.radialLabelsLinkDiagonalLength}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Длина линии подписи по горизонтали
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings
                    ?.radialLabelsLinkHorizontalLength ||
                  this.state.radialLabelsLinkHorizontalLength
                }
                onChange={this.setRadialLabelsLinkHorizontalLength}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="60"
                step="1"
              />
              (
              {this.state.editElement?.settings
                ?.radialLabelsLinkHorizontalLength ||
                this.state.radialLabelsLinkHorizontalLength}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Отступ внешней подписи по горизонтали
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.radialLabelsTextXOffset ||
                  this.state.radialLabelsTextXOffset
                }
                onChange={this.setRadialLabelsTextXOffset}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="60"
                step="1"
              />
              (
              {this.state.editElement?.settings?.radialLabelsTextXOffset ||
                this.state.radialLabelsTextXOffset}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Толщина линии внешней подписи
              </div>
              <input
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                defaultValue={
                  this.state.editElement?.settings
                    ?.radialLabelsLinkStrokeWidth ||
                  this.state.radialLabelsLinkStrokeWidth
                }
                onChange={this.setRadialLabelsLinkStrokeWidth}
                type="range"
                min="0"
                max="20"
                step="1"
              />
              (
              {this.state.editElement?.settings?.radialLabelsLinkStrokeWidth ||
                this.state.radialLabelsLinkStrokeWidth}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Скругление углов сегмента
              </div>
              <input
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                defaultValue={
                  this.state.editElement?.settings?.cornerRadius ||
                  this.state.cornerRadius
                }
                onChange={this.cornerRadius}
                type="range"
                min="0"
                max="45"
                step="1"
              />
              (
              {this.state.editElement?.settings?.cornerRadius ||
                this.state.cornerRadius}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Угол между сегментами
              </div>
              <input
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                defaultValue={
                  this.state.editElement?.settings?.padAngle ||
                  this.state.padAngle
                }
                onChange={this.padAngle}
                type="range"
                min="0"
                max="45"
                step="1"
              />
              (
              {this.state.editElement?.settings?.padAngle ||
                this.state.padAngle}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Толщина рамки сегментов
              </div>
              <input
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                defaultValue={
                  this.state.editElement?.settings?.borderWidth ||
                  this.state.borderWidth
                }
                onChange={this.borderWidth}
                type="range"
                min="0"
                max="20"
                step="1"
              />
              (
              {this.state.editElement?.settings?.borderWidth ||
                this.state.borderWidth}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Цвет рамки сегментов
              </div>
              <SketchPicker
                color={
                  this.state.editElement?.settings?.borderColor ||
                  this.state.borderColor
                }
                onChange={this.borderColor}
              />
            </div>
          </>
        )}
        {this.state.editElement?.settings?.type === BAR && (
          <>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Надписи на сегментах
              </div>
              <input
                type="checkbox"
                defaultChecked={
                  this.state.editElement?.settings?.enableSliceLabels || true
                }
                checked={this.state.editElement?.settings?.enableSliceLabels}
                onChange={this.enableSliceLabels}
              />
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Внешние отступы
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.padding ||
                  this.state.padding
                }
                onChange={e => this.setPadding(e.target.value)}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="0.9"
                step="0.05"
              />
              ({this.state.editElement?.settings?.padding || this.state.padding}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Внутренние отступы
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.innerPadding ||
                  this.state.innerPadding
                }
                onChange={e => this.setInnerPadding(e.target.value)}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="10"
                step="1"
              />
              (
              {this.state.editElement?.settings?.innerPadding ||
                this.state.innerPadding}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Пропускать подписи при высоте столбца
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.labelSkipHeight ||
                  this.state.labelSkipHeight
                }
                onChange={this.setLabelSkipHeight}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="36"
                step="1"
              />
              (
              {this.state.editElement?.settings?.labelSkipHeight ||
                this.state.labelSkipHeight}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Пропускать подписи при ширине столбца
              </div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.labelSkipWidth ||
                  this.state.labelSkipWidth
                }
                onChange={this.setLabelSkipWidth}
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                type="range"
                min="0"
                max="36"
                step="1"
              />
              (
              {this.state.editElement?.settings?.labelSkipWidth ||
                this.state.labelSkipWidth}
              )
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Отразить
              </div>
              <input
                type="checkbox"
                defaultChecked={
                  this.state.editElement?.settings?.reverse || false
                }
                checked={this.state.editElement?.settings?.reverse}
                onChange={this.setReverse}
              />
            </div>
            <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Тип макета
              </div>
              <ReactSelect
                options={barLayout}
                placeholder="Выберите тип макета"
                className="select-type"
                defaultValue={this.state.editElement?.settings?.layout}
                defaultInputValue={this.state.editElement?.settings?.layout}
                onChange={option =>
                  this.props.setProperty(option.value, "layout")
                }
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                styles={selectSettings}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StyleSettings);
