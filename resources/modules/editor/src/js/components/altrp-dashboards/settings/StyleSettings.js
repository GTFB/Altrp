import React, { Component } from "react";
import ReactSelect from "react-select";
import { connect } from "react-redux";
import Schemes from "./NivoColorSchemes";

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
      innerPadding: 0
    };
    this.enableArea = this.enableArea.bind(this);
    this.enableSliceLabels = this.enableSliceLabels.bind(this);
    this.enablePoints = this.enablePoints.bind(this);
    this.setReverse = this.setReverse.bind(this);
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

  changeWidth(width) {
    this.props.setLineWidth(width);
    this.setState(s => ({ ...s, lineWidth: width }));
  }

  setTickRotation(value) {
    this.props.setTickRotation(value);
    this.setState(s => ({ ...s, tickRotation: value }));
  }

  setPointSize(value) {
    this.props.setPointSize(value);
    this.setState(s => ({ ...s, pointSize: value }));
  }

  setInnerRadius(value) {
    this.props.setInnerRadius(value);
    this.setState(s => ({ ...s, innerRadius: value }));
  }

  setPadding(value) {
    this.props.setPadding(value);
    this.setState(s => ({ ...s, padding: value }));
  }
  setInnerPadding(value) {
    this.props.setInnerPadding(value);
    this.setState(s => ({ ...s, innerPadding: value }));
  }
  enableArea(e) {
    this.props.enableArea(e.target.checked);
  }
  enableSliceLabels(e) {
    this.props.enableSliceLabels(e.target.checked);
  }
  enablePoints(e) {
    this.props.enablePoints(e.target.checked);
  }
  setReverse(e) {
    this.props.setReverse(e.target.checked);
  }

  render() {
    return (
      <div className="col">
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
                onChange={option => this.props.setCurve(option.value)}
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
            defaultValue={this.state.editElement?.settings?.colors?.scheme}
            defaultInputValue={this.state.editElement?.settings?.colors?.scheme}
            onChange={option => this.props.setColorScheme(option.value)}
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
              <span>Укажите внутренний радиус</span>
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
                  checked={this.state.editElement?.settings?.enableSliceLabels}
                  onChange={this.enableSliceLabels}
                />
              </label>
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
                  checked={this.state.editElement?.settings?.enableSliceLabels}
                  onChange={this.enableSliceLabels}
                />
              </label>
            </div>
            <div className="mb-3">
              <span>Внешние отступы</span>
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
              <span>Внутренние отступы</span>
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
              <label>
                Отразить
                <input
                  type="checkbox"
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
                onChange={option => this.props.setLayout(option.value)}
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
