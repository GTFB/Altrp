import React, { Component } from "react";
import {
  BAR,
  PIE,
  LINE,
  TABLE,
  POINT
} from "../../../../../admin/src/components/dashboard/widgetTypes";
import { connect } from "react-redux";
import { editElement } from "../../store/altrp-dashboard/actions";
import { Button, Collapse } from "react-bootstrap";
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";
//settings
import DatasourceSettings from "./settings/DatasourceSettings";
import AxisBaseSettings from "./settings/AxisBaseSettings";
import StiyleSettings from "./settings/StyleSettings";
import FilterParameters from "./settings/FilterParameters";
import DiagramTypeSettings from "./settings/DiagramTypeSettings";
import SortData from "./settings/SortData";

const mapStateToProps = state => {
  return { editElement: _.cloneDeep(state.editElement) };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}

class WidgetSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: _.cloneDeep(props.editElement?.settings, {}) || {},
      datasources: props.datasources,
      openDataSettings: false,
      openDiagramSettings: false,
      openTooltipSettings: false,
      filter_datasource: props.filter_datasource,
      editElement: _.cloneDeep(props.editElement, {}) || {}
    };
    this.setDatasource = this.setDatasource.bind(this);
    this.setType = this.setType.bind(this);
    this.setParam = this.setParam.bind(this);
    this.setXAxisScale = this.setXAxisScale.bind(this);
    this.setXAxisTimeScale = this.setXAxisTimeScale.bind(this);
    this.setYAxisScale = this.setYAxisScale.bind(this);
    this.setCurve = this.setCurve.bind(this);
    this.setColorScheme = this.setColorScheme.bind(this);
    this.setLineWidth = this.setLineWidth.bind(this);
    this.enableArea = this.enableArea.bind(this);
    this.setTickRotation = this.setTickRotation.bind(this);
    this.enablePoints = this.enablePoints.bind(this);
    this.setPointSize = this.setPointSize.bind(this);
    this.setInnerRadius = this.setInnerRadius.bind(this);
    this.enableSliceLabels = this.enableSliceLabels.bind(this);
    this.setPadding = this.setPadding.bind(this);
    this.setInnerPadding = this.setInnerPadding.bind(this);
    this.setLayout = this.setLayout.bind(this);
    this.setGroupMode = this.setGroupMode.bind(this);
    this.setReverse = this.setReverse.bind(this);
    this.setSort = this.setSort.bind(this);
    this.enableRadialLabels = this.enableRadialLabels.bind(this);
    this.generateName = this.generateName.bind(this);
    this.setName = this.setName.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.datasources, this.props.datasources)) {
      this.setState(state => ({
        ...state,
        datasources: this.props.datasources
      }));
    }
    if (!_.isEqual(prevProps.filter_datasource, this.props.filter_datasource)) {
      this.setState(state => ({
        ...state,
        filter_datasource: this.props.filter_datasource
      }));
    }
    if (!_.isEqual(prevProps.editElement, this.props.editElement)) {
      this.setState(state => ({
        ...state,
        editElement: _.cloneDeep(this.props.editElement),
        settings: _.cloneDeep(this.props.editElement?.settings, {})
      }));
    }
    if (!this.props.addItemPreview) {
      if (
        !_.isEqual(
          prevProps.editElement?.settings?.name,
          this.props.editElement?.settings?.name
        )
      ) {
        this.setState(state => ({
          ...state,
          editElement: _.cloneDeep(this.props.editElement),
          settings: _.cloneDeep(this.props.editElement?.settings, {})
        }));
      }
    } else {
      if (
        !_.isEqual(
          prevProps.editElement?.settings?.name,
          this.props.editElement?.settings?.name
        )
      ) {
        console.log("====================================");
        console.log(this.props.editElement);
        console.log("====================================");
      }
    }
    if (
      JSON.stringify(prevProps.editElement?.settings?.params) !==
      JSON.stringify(this.props.editElement?.settings?.params)
    ) {
      this.setState(state => ({
        ...state,
        editElement: _.cloneDeep(this.props.editElement),
        settings: _.cloneDeep(this.props.editElement?.settings, {})
      }));
    }
  }

  setName(param, options) {
    let settings = _.cloneDeep(this.props.editElement?.settings);
    let name = settings?.name;
    if (param.length > 0) {
      let paramName = _.find(options, item => item.value == param).label;
      if (typeof name !== "undefined") {
        name = name.split("|");
        let boolChange = false;
        name.forEach((item, index) => {
          if (item !== param) {
            boolChange = true;
          }
        });
        if (boolChange) {
          name.push(paramName);
        }
        name = _.uniq(name);
        name = name.join("|");
      } else {
        name = param;
      }
    }
    return name;
  }

  setOpenDataSettings(data) {
    this.setState(state => ({ ...state, openDataSettings: data }));
  }
  setOpenDiagramSettings(data) {
    this.setState(state => ({ ...state, openDiagramSettings: data }));
  }
  setOpenTooltipSettings(data) {
    this.setState(state => ({ ...state, openTooltipSettings: data }));
  }
  //Смена типа диаграммы
  setType(type) {
    let settings = this.state.settings;
    settings = {
      ...settings,
      type: type
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({
        ...s,
        editElement: { settings: settings }
      }));
    }
  }

  generateName(datasourceArray) {
    let editElementSettings = _.cloneDeep(this.state.settings);
    let name = editElementSettings?.name;
    const arrayOfDatasourceTitles = datasourceArray.map(
      source => source.title ?? ""
    );
    if (typeof name === "undefined" || name.length === 0) {
      name = arrayOfDatasourceTitles.join("|");
    } else {
      if (Array.isArray(name)) {
        arrayOfDatasourceTitles.forEach((nameDatasource, index) => {
          const indexFind = _.findIndex(name, nameDatasource);
          if (indexFind === -1) {
            name[index] = nameDatasource;
          }
        });
        name = name.join("|");
      } else {
        name = name.split("|");
        arrayOfDatasourceTitles.forEach((nameDatasource, index) => {
          const indexFind = _.findIndex(name, nameDatasource);
          if (indexFind === -1) {
            name[index] = nameDatasource;
          }
        });
        name = name.join("|");
      }
    }
    return name;
  }

  //Смена источника данных
  setDatasource(datasourcesArray, changeParams = false) {
    let settings = this.state.settings;
    let name = "";
    let sources = [];
    if (datasourcesArray === null) {
      settings = {
        ...settings,
        sources: [],
        params: []
      };
      sources = [];
    } else if (datasourcesArray.length === 0) {
      settings = {
        ...settings,
        sources: [],
        params: []
      };
      sources = [];
    } else {
      name = this.generateName(_.cloneDeep(datasourcesArray));
      settings = {
        ...settings,
        sources: datasourcesArray,
        params: !changeParams
          ? typeof settings?.params !== "undefined"
            ? [...settings.params]
            : []
          : [],
        name: name
      };
    }
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings.sources = sources;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: { settings: settings } }));
    }
  }
  //Смена значения локального параметра
  setParam(left, right, options = []) {
    let settings = this.state.settings;
    let param = { [left]: right };
    if (options.length > 0) {
      settings.name = this.setName(right, options);
    }
    let currentParamKey = _.findKey(settings.params, left);
    if (typeof currentParamKey !== "undefined") {
      settings.params[currentParamKey] = param;
    } else {
      settings = {
        ...settings,
        params: [...settings.params, param]
      };
    }
    settings.params = settings.params.filter(item => {
      let key = _.keys(item)[0];
      return settings.params[key] !== null;
    });
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Базовая настройка для оси X
  setXAxisScale(scale) {
    let settings = {};
    if (scale === "time") {
      settings = {
        ...this.state.settings,
        xScale: { type: scale, format: "%d.%m.%Y", precision: "day" }
      };
    } else {
      settings = {
        ...this.state.settings,
        xScale: { type: scale }
      };
    }
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Выбор масштаба времени для оси X
  setXAxisTimeScale(precision) {
    const settings = {
      ...this.state.settings,
      xScale: {
        ...this.state.settings.xScale,
        precision: precision,
        format: "%d.%m.%Y"
      }
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Базовая настройка для оси Y
  setYAxisScale(scale) {
    const settings = {
      ...this.state.settings,
      yScale: { type: scale }
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Смена типа кривой
  setCurve(curve) {
    const settings = { ...this.state.settings, curve: curve };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Смена цветовой схемы
  setColorScheme(colorScheme) {
    let settings = this.state.settings;
    settings = {
      ...this.state.settings,
      colors: { scheme: colorScheme }
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }

  setLineWidth(width) {
    const settings = {
      ...this.state.settings,
      lineWidth: width
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Отображение участков
  enableArea(value) {
    const settings = {
      ...this.state.settings,
      enableArea: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  } //Отображение участков
  enablePoints(value) {
    const settings = {
      ...this.state.settings,
      enablePoints: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Указать размер точки
  setPointSize(value) {
    const settings = {
      ...this.state.settings,
      pointSize: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Наклон нижней легенды
  setTickRotation(value) {
    const settings = {
      ...this.state.settings,
      axisBottom: {
        ...settings?.axisBottom,
        tickRotation: value
      }
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Внутренний радиус Pie
  setInnerRadius(value) {
    const settings = {
      ...this.state.settings,
      innerRadius: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Внешние отступы Bar
  setPadding(value) {
    const settings = {
      ...this.state.settings,
      padding: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Внутренние отступы Bar
  setInnerPadding(value) {
    const settings = {
      ...this.state.settings,
      innerPadding: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Отображать метки на сегменах Pie
  enableSliceLabels(value) {
    const settings = {
      ...this.state.settings,
      enableSliceLabels: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  //Отображать метки на сегменах Pie
  enableRadialLabels(value) {
    const settings = {
      ...this.state.settings,
      enableRadialLabels: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }

  setLayout(value) {
    const settings = {
      ...this.state.settings,
      layout: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }
  setGroupMode(value) {
    const settings = {
      ...this.state.settings,
      groupMode: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }

  setReverse(value) {
    const settings = {
      ...this.state.settings,
      reverse: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }

  setSort(value) {
    const settings = {
      ...this.state.settings,
      sort: value
    };
    this.setState(state => ({
      ...state,
      settings: settings
    }));
    if (!this.props.addItemPreview) {
      let element = this.props.editElement;
      element.settings = settings;
      this.props.editElementDispatch(element);
      this.props.editHandler(this.props.editElement.i, settings);
    } else {
      const element = { settings: { ...settings } };
      this.props.editElementDispatch(element);
      this.setState(s => ({ ...s, editElement: settings }));
    }
  }

  render() {
    return (
      <div className="col">
        <div className="row">
          <div className="mx-auto">
            <h3>Настройка диаграммы</h3>
          </div>
        </div>
        <div className="row">
          <Button
            className="collapse-button"
            onClick={() =>
              this.setOpenDataSettings(!this.state.openDataSettings)
            }
            aria-controls="Datasource settings"
            aria-expanded={this.state.openDataSettings}
          >
            <div className="collapse-button-content">
              <div>Базовые настройки</div>
              <div>
                {!this.state.openDataSettings ? <ArrowDown /> : <ArrowUp />}
              </div>
            </div>
          </Button>
          <Collapse in={this.state.openDataSettings}>
            <div style={{ width: "100%" }}>
              <DiagramTypeSettings setType={this.setType} />
              {/*
                Настройки данных - сами источники данных и параметры
              */}
              <DatasourceSettings
                datasources={this.state.datasources}
                setCardName={this.setCardName}
                setDatasource={this.setDatasource}
              />
              {typeof this.state.filter_datasource !== "undefined" &&
                _.keys(this.state.filter_datasource).length > 0 && (
                  <>
                    <div className="col mb-3">
                      <div className="label">Параметры</div>
                    </div>
                    {this.state.filter_datasource.map((param, index) => {
                      return (
                        <FilterParameters
                          setParam={this.setParam}
                          key={index}
                          setCardName={this.setCardName}
                          param={param}
                        />
                      );
                    })}
                  </>
                )}

              {/*
                Настройки осей
              */}
              {(this.props.editElement?.settings?.type === LINE ||
                this.props.editElement?.settings?.type === POINT) && (
                <>
                  <AxisBaseSettings
                    setXAxisScale={this.setXAxisScale}
                    setXAxisTimeScale={this.setXAxisTimeScale}
                    setYAxisScale={this.setYAxisScale}
                  />
                </>
              )}

              <SortData setSort={this.setSort} />
            </div>
          </Collapse>
        </div>
        <div className="row">
          <Button
            className="collapse-button"
            onClick={() =>
              this.setOpenDiagramSettings(!this.state.openDiagramSettings)
            }
            aria-controls="Datasource settings"
            aria-expanded={this.state.openDiagramSettings}
          >
            <div className="collapse-button-content">
              <div>Настройки стилей</div>
              <div>
                {!this.state.openDiagramSettings ? <ArrowDown /> : <ArrowUp />}
              </div>
            </div>
          </Button>
          <Collapse in={this.state.openDiagramSettings}>
            <div>
              <StiyleSettings
                setCurve={this.setCurve}
                setColorScheme={this.setColorScheme}
                setLineWidth={this.setLineWidth}
                enableArea={this.enableArea}
                setTickRotation={this.setTickRotation}
                enablePoints={this.enablePoints}
                setPointSize={this.setPointSize}
                setInnerRadius={this.setInnerRadius}
                enableSliceLabels={this.enableSliceLabels}
                setPadding={this.setPadding}
                setInnerPadding={this.setInnerPadding}
                setLayout={this.setLayout}
                setGroupMode={this.setGroupMode}
                setReverse={this.setReverse}
                enableRadialLabels={this.enableRadialLabels}
              />
            </div>
          </Collapse>
        </div>
        {/* <div className="row">
          <Button
            className="collapse-button"
            onClick={() =>
              this.setOpenTooltipSettings(!this.state.openTooltipSettings)
            }
            aria-controls="Datasource settings"
            aria-expanded={this.state.openTooltipSettings}
          >
            <div className="collapse-button-content">
              <div>Настройки подсказок</div>
              <div>
                {!this.state.openTooltipSettings ? <ArrowDown /> : <ArrowUp />}
              </div>
            </div>
          </Button>
          <Collapse in={this.state.openTooltipSettings}>
            <div></div>
          </Collapse>
        </div> */}
        {this.props.addItemPreview ? (
          <div className="row justify-content-beetwen mt-3">
            <div className="col">
              <button
                style={{ width: "100%" }}
                onClick={e => this.props.onAddItem(this.state.editElement)}
              >
                Сохранить
              </button>
            </div>
            <div className="col">
              <button
                style={{ width: "100%" }}
                onClick={e => this.props.onCloseHandler(null, false)}
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <div className="row justify-content-beetwen mt-3">
            <div className="col">
              <button
                style={{ width: "100%" }}
                onClick={e => this.props.onCloseHandler(null)}
              >
                Сохранить
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetSettings);
