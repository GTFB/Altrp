import React, { Component } from "react";
import ReactSelect from "react-select";
import { connect } from "react-redux";
import Schemes from "./NivoColorSchemes";
import MarginInput from "./MarginInput";

import {
  BAR,
  PIE,
  LINE,
  TABLE,
  POINT
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
      currentColorScheme: ""
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

  render() {
    return (
      <div className="col">
        <div className="mb-3">
          <span>Укажите внутренние отступы</span>
          <MarginInput
            setProperty={this.props.setProperty}
            type={this.state.editElement?.settings?.type}
            margin={this.state.editElement?.settings?.margin}
          />
        </div>
        {this.state.editElement?.settings?.type === LINE && (
          <>
            <div className="mb-3">
              <span>Выберите тип кривой</span>
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
          <span>Выберите цветовую схему </span>
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
              <span>Укажите ширину линии</span>
              <input
                defaultValue={
                  this.state.editElement?.settings?.lineWidth ||
                  this.state.lineWidth
                }
                onChange={e => this.changeWidth(e.target.value)}
                type="range"
                min="0"
                max="20"
                style={{
                  "::-webkit-slider-runnable-track": {
                    background: "#FFFF !important"
                  }
                }}
              />
              (
              {this.state.editElement?.settings?.lineWidth ||
                this.state.lineWidth}
              px)
            </div>
            <div className="mb-3">
              <label>
                Отобразить участки
                <input
                  type="checkbox"
                  defaultChecked={
                    this.state.editElement?.settings?.enableArea || false
                  }
                  checked={this.state.editElement?.settings?.enableArea}
                  onChange={this.enableArea}
                />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Отобразить точки
                <input
                  type="checkbox"
                  defaultChecked={
                    this.state.editElement?.settings?.enablePoints || true
                  }
                  checked={this.state.editElement?.settings?.enablePoints}
                  onChange={this.enablePoints}
                />
              </label>
            </div>
            <div className="mb-3">
              <span>Укажите размер точки</span>
              <input
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
        {this.state.editElement?.settings?.type !== PIE && (
          <div className="mb-3">
            <span>Укажите наклон нижней легенды</span>
            <input
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
        )}

        {this.state.editElement?.settings?.type === PIE && (
          <>
            <div className="mb-3">
              <div>Укажите внутренний радиус</div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.innerRadius ||
                  this.state.innerRadius
                }
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
              <label>
                Надписи на сегментах
                <input
                  type="checkbox"
                  defaultChecked={
                    this.state.editElement?.settings?.enableSliceLabels || true
                  }
                  checked={this.state.editElement?.settings?.enableSliceLabels}
                  onChange={this.enableSliceLabels}
                />
              </label>
            </div>

            <div className="mb-3">
              <div>Пропускать внутренние подписи при угле сектора</div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.sliceLabelsSkipAngle ||
                  this.state.sliceLabelsSkipAngle
                }
                onChange={this.setSliceLabelsSkipAngle}
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
              <div>Отступ внутренних подписей</div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.sliceLabelsRadiusOffset ||
                  this.state.sliceLabelsRadiusOffset
                }
                onChange={this.setSliceLabelsRadiusOffset}
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
              <label>
                Внешние надписи
                <input
                  type="checkbox"
                  defaultChecked={
                    this.state.editElement?.settings?.enableRadialLabels || true
                  }
                  checked={this.state.editElement?.settings?.enableRadialLabels}
                  onChange={this.enableRadialLabels}
                />
              </label>
            </div>

            <div className="mb-3">
              <div>Пропускать внешние подписи при угле сектора</div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.radialLabelsSkipAngle ||
                  this.state.radialLabelsSkipAngle
                }
                onChange={this.setRadialLabelsSkipAngle}
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
              <div>Отступы внешней подписи</div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.radialLabelsLinkOffset ||
                  this.state.radialLabelsLinkOffset
                }
                onChange={this.setRadialLabelsLinkOffset}
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
              <div>Длина линии подписи по диагонали</div>
              <input
                defaultValue={
                  this.state.editElement?.settings
                    ?.radialLabelsLinkDiagonalLength ||
                  this.state.radialLabelsLinkDiagonalLength
                }
                onChange={this.setRadialLabelsLinkDiagonalLength}
                type="range"
                min="0"
                max="60"
                step="1"
              />
              (
              {this.state.editElement?.settings
                ?.radialLabelsLinkDiagonalLength ||
                this.state.radialLabelsLinkDiagonalLength}
              )
            </div>
            <div className="mb-3">
              <div>Длина линии подписи по горизонтали</div>
              <input
                defaultValue={
                  this.state.editElement?.settings
                    ?.radialLabelsLinkHorizontalLength ||
                  this.state.radialLabelsLinkHorizontalLength
                }
                onChange={this.setRadialLabelsLinkHorizontalLength}
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
              <div>Отступ внешней подписи по горизонтали</div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.radialLabelsTextXOffset ||
                  this.state.radialLabelsTextXOffset
                }
                onChange={this.setRadialLabelsTextXOffset}
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
              <div>Толщина линии внешней подписи</div>
              <input
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
          </>
        )}
        {this.state.editElement?.settings?.type === BAR && (
          <>
            <div className="mb-3">
              <label>
                Надписи на сегментах
                <input
                  type="checkbox"
                  defaultChecked={
                    this.state.editElement?.settings?.enableSliceLabels || true
                  }
                  checked={this.state.editElement?.settings?.enableSliceLabels}
                  onChange={this.enableSliceLabels}
                />
              </label>
            </div>
            <div className="mb-3">
              <div>Внешние отступы</div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.padding ||
                  this.state.padding
                }
                onChange={e => this.setPadding(e.target.value)}
                type="range"
                min="0"
                max="0.9"
                step="0.05"
              />
              ({this.state.editElement?.settings?.padding || this.state.padding}
              )
            </div>
            <div className="mb-3">
              <div>Внутренние отступы</div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.innerPadding ||
                  this.state.innerPadding
                }
                onChange={e => this.setInnerPadding(e.target.value)}
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
              <div>Пропускать подписи при высоте столбца</div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.labelSkipHeight ||
                  this.state.labelSkipHeight
                }
                onChange={this.setLabelSkipHeight}
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
              <div>Пропускать подписи при ширине столбца</div>
              <input
                defaultValue={
                  this.state.editElement?.settings?.labelSkipWidth ||
                  this.state.labelSkipWidth
                }
                onChange={this.setLabelSkipWidth}
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
              <label>
                Отразить
                <input
                  type="checkbox"
                  defaultChecked={
                    this.state.editElement?.settings?.reverse || false
                  }
                  checked={this.state.editElement?.settings?.reverse}
                  onChange={this.setReverse}
                />
              </label>
            </div>
            <div className="mb-3">
              <span>Тип макета</span>
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
            {/* <div className="mb-3">
              <span>Тип группировки</span>
              <ReactSelect
                options={barGroup}
                className="select-type"
                defaultValue={this.state.editElement?.settings?.groupMode}
                defaultInputValue={this.state.editElement?.settings?.groupMode}
                onChange={option => this.props.setGroupMode(option.value)}
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                styles={selectSettings}
              />
            </div> */}
          </>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StyleSettings);
