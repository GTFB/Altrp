import React, { Component } from "react";
import ReactSelect from "react-select";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { editElement: _.cloneDeep(state.editElement) };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}
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
const anchors = [
  { value: "top-left", label: "Сверху слева" },
  { value: "top", label: "Сверху" },
  { value: "top-right", label: "Сверху справа" },
  { value: "left", label: "Слева" },
  { value: "center", label: "По центру" },
  { value: "right", label: "Справа" },
  { value: "bottom-left", label: "Снизу слева" },
  { value: "bottom", label: "Снизу" },
  { value: "bottom-right", label: "Снизу справа" }
];
const directions = [
  { value: "column", label: "Колонка" },
  { value: "row", label: "Строчка" }
];

const itemDirections = [
  { value: "left-to-right", label: "Слева направо" },
  { value: "right-to-left", label: "Справа налево" },
  { value: "top-to-bottom", label: "Сверху вниз" },
  { value: "bottom-to-top", label: "Снизу вверх" }
];

class LegendSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editElement: props.editElement,
      enableLegend: true,
      legendTranslateX: 0,
      legendTranslateY: 0,
      itemWidth: 10,
      itemHeight: 10,
      itemsSpacing: 10,
      symbolSize: 10
    };
    this.setLedengEnable = this.setLedengEnable.bind(this);
    this.setLegendJustify = this.setLegendJustify.bind(this);
    this.setProperty = this.setProperty.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.editElement, this.props.editElement)) {
      this.setState(s => ({ ...s, editElement: this.props.editElement }));
    }
  }

  setLedengEnable(e) {
    this.props.setProperty(e.target.checked, "enableLegend");
  }
  setLegendJustify(e) {
    this.props.setProperty(e.target.checked, "legendJustify");
  }
  setProperty(value, property) {
    this.props.setProperty(value, property);
    this.setState(s => ({ ...s, [property]: value }));
  }

  render() {
    return (
      <>
        <div className="col">
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Отобразить легенду
            </div>
            <input
              type="checkbox"
              defaultChecked={this.state.editElement?.settings?.enableLegend}
              checked={this.state.editElement?.settings?.enableLegend}
              onChange={this.setLedengEnable}
            />
          </div>
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Расположение легенды
            </div>
            <ReactSelect
              placeholder="Выберите расположение легенды"
              options={anchors}
              className="select-type"
              defaultValue={this.state.editElement?.settings?.legendAchor}
              defaultInputValue={this.state.editElement?.settings?.legendAchor}
              onChange={option =>
                this.props.setProperty(option.value, "legendAchor")
              }
              getOptionValue={option => option.value}
              getOptionLabel={option => option.label}
              styles={selectSettings}
            />
          </div>
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Направление легенды
            </div>
            <ReactSelect
              placeholder="Выберите расположение легенды"
              options={directions}
              className="select-type"
              defaultValue={this.state.editElement?.settings?.legendDirection}
              defaultInputValue={
                this.state.editElement?.settings?.legendDirection
              }
              onChange={option =>
                this.props.setProperty(option.value, "legendDirection")
              }
              getOptionValue={option => option.value}
              getOptionLabel={option => option.label}
              styles={selectSettings}
            />
          </div>
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Выровнять легенды
            </div>
            <input
              type="checkbox"
              defaultChecked={this.state.editElement?.settings?.legendJustify}
              checked={this.state.editElement?.settings?.legendJustify}
              onChange={this.setLegendJustify}
            />
          </div>

          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Расположение легенды по X
            </div>
            <input
              defaultValue={
                this.state.editElement?.settings?.legendTranslateX ||
                this.state.legendTranslateX
              }
              onChange={e =>
                this.setProperty(Number(e.target.value), "legendTranslateX")
              }
              type="range"
              min="-200"
              max="200"
              step="1"
            />
            (
            {this.state.editElement?.settings?.legendTranslateX ||
              this.state.legendTranslateX}
            px)
          </div>
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Расположение легенды по Y
            </div>
            <input
              defaultValue={
                this.state.editElement?.settings?.legendTranslateY ||
                this.state.legendTranslateY
              }
              onChange={e =>
                this.setProperty(Number(e.target.value), "legendTranslateY")
              }
              type="range"
              min="-200"
              max="200"
              step="1"
            />
            (
            {this.state.editElement?.settings?.legendTranslateY ||
              this.state.legendTranslateY}
            px)
          </div>
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Ширина элемента легенды
            </div>
            <input
              defaultValue={
                this.state.editElement?.settings?.legendItemWidth ||
                this.state.itemWidth
              }
              onChange={e =>
                this.setProperty(
                  Number(e.target.value),
                  "itemWlegendItemWidthidth"
                )
              }
              type="range"
              min="10"
              max="200"
              step="1"
            />
            (
            {this.state.editElement?.settings?.legendItemWidth ||
              this.state.itemWidth}
            px)
          </div>
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Высота элемента легенды
            </div>
            <input
              defaultValue={
                this.state.editElement?.settings?.legendItemHeight ||
                this.state.itemHeight
              }
              onChange={e =>
                this.setProperty(Number(e.target.value), "legendItemHeight")
              }
              type="range"
              min="10"
              max="200"
              step="1"
            />
            (
            {this.state.editElement?.settings?.legendItemHeight ||
              this.state.itemHeight}
            px)
          </div>
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Расстояние между элементами
            </div>
            <input
              defaultValue={
                this.state.editElement?.settings?.legendItemsSpacing ||
                this.state.itemsSpacing
              }
              onChange={e =>
                this.setProperty(Number(e.target.value), "legendItemsSpacing")
              }
              type="range"
              min="0"
              max="60"
              step="1"
            />
            (
            {this.state.editElement?.settings?.legendItemsSpacing ||
              this.state.itemsSpacing}
            px)
          </div>
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Размер символа
            </div>
            <input
              defaultValue={
                this.state.editElement?.settings?.legendSymbolSize ||
                this.state.symbolSize
              }
              onChange={e =>
                this.setProperty(Number(e.target.value), "legendSymbolSize")
              }
              type="range"
              min="2"
              max="60"
              step="1"
            />
            (
            {this.state.editElement?.settings?.legendSymbolSize ||
              this.state.symbolSize}
            px)
          </div>

          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Направление элементов
            </div>
            <ReactSelect
              placeholder="Выберите направление элементов"
              options={itemDirections}
              className="select-type"
              defaultValue={
                this.state.editElement?.settings?.legendItemDirection
              }
              defaultInputValue={
                this.state.editElement?.settings?.legendItemDirection
              }
              onChange={option =>
                this.props.setProperty(option.value, "legendItemDirection")
              }
              getOptionValue={option => option.value}
              getOptionLabel={option => option.label}
              styles={selectSettings}
            />
          </div>
          {/* {(this.state.editElement?.settings?.type === LINE ||
            this.state.editElement?.settings?.type === POINT) && (
            <div className="mb-3">
              <div>Отображение элементов по</div>
              <ReactSelect
                placeholder="Выберите отображение элементов"
                options={dataFroms}
                className="select-type"
                defaultValue={this.state.editElement?.settings?.legendDataFrom}
                defaultInputValue={
                  this.state.editElement?.settings?.legendDataFrom
                }
                onChange={option =>
                  this.props.setProperty(option.value, "legendDataFrom")
                }
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                styles={selectSettings}
              />
            </div>
          )} */}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LegendSettings);
