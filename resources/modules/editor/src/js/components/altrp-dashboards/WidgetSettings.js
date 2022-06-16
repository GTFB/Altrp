import React, { Component } from "react";
import {
  BAR,
  LINE,
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
import LegendSettings from "./settings/LegendSettings";
import TooltipSettings from "./settings/TooltipSettings";
import AnimationSettings from "./settings/AnimationSettings";
import SortData from "./settings/SortData";
import DrawerComponent from "./DrawerComponent";

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
      openLegendSettings: false,
      openAnimationSettings: false,
      filter_datasource: props.filter_datasource,
      editElement: _.cloneDeep(props.editElement, {}) || {},
      delimer: props.delimer
    };
    this.setDatasource = this.setDatasource.bind(this);
    this.setType = this.setType.bind(this);
    this.setParam = this.setParam.bind(this);
    this.setXAxisScale = this.setXAxisScale.bind(this);
    this.setXAxisTimeScale = this.setXAxisTimeScale.bind(this);
    this.setYAxisScale = this.setYAxisScale.bind(this);
    this.setColorScheme = this.setColorScheme.bind(this);
    this.setTickRotation = this.setTickRotation.bind(this);
    this.generateName = this.generateName.bind(this);
    this.setName = this.setName.bind(this);
    this.setProperty = this.setProperty.bind(this);
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

  /**
   * Методы, связанные с открытием/закрытием настроек
   */
  setOpenDataSettings(data) {
    this.setState(state => ({ ...state, openDataSettings: data }));
  }
  setOpenDiagramSettings(data) {
    this.setState(state => ({ ...state, openDiagramSettings: data }));
  }
  setOpenTooltipSettings(data) {
    this.setState(state => ({ ...state, openTooltipSettings: data }));
  }
  setOpenLegendSettings(data) {
    this.setState(state => ({ ...state, openLegendSettings: data }));
  }
  setOpenAnimationSettings(data) {
    this.setState(state => ({ ...state, openAnimationSettings: data }));
  }

  /**
   * Методы, связанные со сменой параметров с уникальными настройками
   */
  setName(param, options, prevParam) {
    let settings = _.cloneDeep(this.props.editElement?.settings);
    let name = settings?.name;
    if (param.length != 0) {
      let paramName = _.find(options, item => item.value == param).label;
      if (typeof name !== "undefined") {
        name = name.split(this.state.delimer);
        let indexPrevValue = -1;
        if (prevParam.length > 0) {
          indexPrevValue = _.findIndex(name, o => o == prevParam);
        }
        if (indexPrevValue !== -1) {
          name[indexPrevValue] = paramName;
        } else {
          name.push(paramName);
        }
        name = _.uniq(name);
        name = name.filter(item => item.length !== 0);
        name = name.join(this.parseHtmlEntities(this.state.delimer));
      } else {
        name = param;
      }
    } else {
      if (typeof name !== "undefined") {
        name = name.split(this.state.delimer);
        let indexPrevValue = -1;
        if (prevParam.length > 0) {
          indexPrevValue = _.findIndex(name, o => o == prevParam);
        }
        if (indexPrevValue !== -1) {
          delete name[indexPrevValue];
        }
        name = _.uniq(name);
        name = name.filter(
          item => typeof item !== "undefined" && item.length !== 0
        );
        name = name.join(this.parseHtmlEntities(this.state.delimer));
      }
    }
    return name;
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
    if (name === null || typeof name === "undefined" || name.length === 0) {
      name = arrayOfDatasourceTitles.join(this.state.delimer);
    } else {
      if (Array.isArray(name)) {
        arrayOfDatasourceTitles.forEach((nameDatasource, index) => {
          const indexFind = _.findIndex(name, nameDatasource);
          if (indexFind === -1) {
            name[index] = nameDatasource;
          }
        });
        name = name.join(this.state.delimer);
      } else {
        name = name.split(this.state.delimer);
        arrayOfDatasourceTitles.forEach((nameDatasource, index) => {
          const indexFind = _.findIndex(name, nameDatasource);
          if (indexFind === -1) {
            name[index] = nameDatasource;
          }
        });
        name = name.join(this.state.delimer);
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

  parseHtmlEntities(str) {
    return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
      var num = parseInt(numStr, 10); // read num as normal number
      return String.fromCharCode(num);
    });
  }
  //Смена значения локального параметра
  setParam(left, right, options = [], prevParam = "") {
    let settings = this.state.settings;
    let param = { [left]: right };
    if (options.length > 0) {
      settings.name = this.setName(right, options, prevParam);
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

  /**
   * Смена параметров без уникальных настроек
   */
  setProperty(value, property) {
    const settings = { ...this.state.settings, [property]: value };
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
      <DrawerComponent
        settings={this.props.settings}
        className={`col ${this.props.widgetID} altrp-dashboard__drawer--font`}
      >
        <div className="row">
          <div className="mx-auto">
            <h3 className="altrp-dashboard__drawer--font">Настройка диаграммы</h3>
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
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--section-font-size altrp-dashboard__drawer--font altrp-dashboard__drawer--font-margin`}
              >
                Базовые настройки
              </div>
              <div>
                {!this.state.openDataSettings ? <ArrowDown /> : <ArrowUp />}
              </div>
            </div>
          </Button>
          <Collapse in={this.state.openDataSettings}>
            <div style={{ width: "100%" }}>
              <DiagramTypeSettings
                widgetID={this.props.widgetID}
                setType={this.setType}
              />
              {/*
                Настройки данных - сами источники данных и параметры
              */}
              <DatasourceSettings
                widgetID={this.props.widgetID}
                datasources={this.state.datasources}
                setCardName={this.setCardName}
                setDatasource={this.setDatasource}
              />
              {typeof this.state.filter_datasource !== "undefined" &&
                _.keys(this.state.filter_datasource).length > 0 && (
                  <>
                    <div className="col mb-3">
                      <div
                        className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
                      >
                        Параметры
                      </div>
                    </div>
                    {this.state.filter_datasource.map((param, index) => {
                      return (
                        <FilterParameters
                          widgetID={this.props.widgetID}
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
                    widgetID={this.props.widgetID}
                    setXAxisScale={this.setXAxisScale}
                    setXAxisTimeScale={this.setXAxisTimeScale}
                    setYAxisScale={this.setYAxisScale}
                  />
                </>
              )}

              <SortData
                widgetID={this.props.widgetID}
                setProperty={this.setProperty}
              />
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
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--section-font-size altrp-dashboard__drawer--font altrp-dashboard__drawer--font-margin`}
              >
                Настройки стилей
              </div>
              <div>
                {!this.state.openDiagramSettings ? <ArrowDown /> : <ArrowUp />}
              </div>
            </div>
          </Button>
          <Collapse in={this.state.openDiagramSettings}>
            <div>
              <StiyleSettings
                widgetID={this.props.widgetID}
                setProperty={this.setProperty}
                checkboxColor={this.props?.checkboxColor}
                setColorScheme={this.setColorScheme}
                setTickRotation={this.setTickRotation}
              />
            </div>
          </Collapse>
        </div>
        <div className="row">
          <Button
            className="collapse-button"
            onClick={() =>
              this.setOpenTooltipSettings(!this.state.openTooltipSettings)
            }
            aria-controls="Datasource settings"
            aria-expanded={this.state.openTooltipSettings}
          >
            <div className="collapse-button-content">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--section-font-size altrp-dashboard__drawer--font altrp-dashboard__drawer--font-margin`}
              >
              Настройки подсказок
              </div>
              <div>
                {!this.state.openTooltipSettings ? <ArrowDown /> : <ArrowUp />}
              </div>
            </div>
          </Button>
          <Collapse in={this.state.openTooltipSettings}>
            <div>
              <TooltipSettings
                widgetID={this.props.widgetID}
                setProperty={this.setProperty}
              />
            </div>
          </Collapse>
        </div>
        <div className="row">
          <Button
            className="collapse-button"
            onClick={() =>
              this.setOpenLegendSettings(!this.state.openLegendSettings)
            }
            aria-controls="Datasource settings"
            aria-expanded={this.state.openLegendSettings}
          >
            <div className="collapse-button-content">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--section-font-size altrp-dashboard__drawer--font altrp-dashboard__drawer--font-margin`}
              >
                Настройки легенды
              </div>
              <div>
                {!this.state.openLegendSettings ? <ArrowDown /> : <ArrowUp />}
              </div>
            </div>
          </Button>
          <Collapse in={this.state.openLegendSettings}>
            <div>
              <LegendSettings
                widgetID={this.props.widgetID}
                setProperty={this.setProperty}
              />
            </div>
          </Collapse>
        </div>
        {(this.state.editElement?.settings?.type === LINE ||
          this.state.editElement?.settings?.type === POINT ||
          this.state.editElement?.settings?.type === BAR) && (
          <div className="row">
            <Button
              className="collapse-button"
              onClick={() =>
                this.setOpenAnimationSettings(!this.state.openAnimationSettings)
              }
              aria-controls="Datasource settings"
              aria-expanded={this.state.openAnimationSettings}
            >
              <div className="collapse-button-content">
                <div
                  className={`${this.props.widgetID} altrp-dashboard__drawer--section-font-size altrp-dashboard__drawer--font altrp-dashboard__drawer--font-margin`}
                >
                  Настройки анимации
                </div>
                <div>
                  {!this.state.openAnimationSettings ? (
                    <ArrowDown />
                  ) : (
                    <ArrowUp />
                  )}
                </div>
              </div>
            </Button>
            <Collapse in={this.state.openAnimationSettings}>
              <div>
                <AnimationSettings
                  widgetID={this.props.widgetID}
                  setProperty={this.setProperty}
                />
              </div>
            </Collapse>
          </div>
        )}
        {this.props.addItemPreview ? (
          <div className="row justify-content-beetwen mt-3">
            <div className="col">
              <button
                className={`${this.props.widgetID} altrp-btn-draw`}
                style={{ width: "100%" }}
                onClick={e => this.props.onAddItem(this.state.editElement)}
              >
                Save
              </button>
            </div>
            <div className="col">
              <button
                className={`${this.props.widgetID} altrp-btn-draw`}
                style={{ width: "100%" }}
                onClick={e => this.props.onCloseHandler(null, false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="row justify-content-beetwen mt-3">
            <div className="col">
              <button
                className={`${this.props.widgetID} altrp-btn-draw`}
                style={{ width: "100%" }}
                onClick={e => this.props.onCloseHandler(null)}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </DrawerComponent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetSettings);
