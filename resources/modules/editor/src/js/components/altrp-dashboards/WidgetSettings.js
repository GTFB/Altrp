import React, { Component, Suspense } from "react";

import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { editElement } from '../../store/altrp-dashboard/actions';
import { BAR, PIE, DONUT, AREA, LINE, TABLE } from "../../../../../admin/src/components/dashboard/widgetTypes";
import { Button, Collapse } from 'react-bootstrap';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import DatasourceSettings from './settings/DatasourceSettings';
import FilterParameters from './settings/FilterParameters';
import DiagramTypeSettings from './settings/DiagramTypeSettings';
import LegendSettings from './settings/LegendSettings';
import ColorSettings from './settings/ColorSettings';

const mapStateToProps = (state) => {
      return { editElement: state.editElement };
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
                  settings: props.editElement.settings,
                  datasources: props.datasources,
                  openDataSettings: false,
                  openDiagramSettings: false,
                  openTooltipSettings: false,
                  filter_datasource: props.filter_datasource,
                  editElement: props.editElement
            };
            console.log(this.state.filter_datasource);
            this.setDatasource = this.setDatasource.bind(this);
            this.setType = this.setType.bind(this);
            this.setLegendEnabled = this.setLegendEnabled.bind(this);
            this.setLegendPosition = this.setLegendPosition.bind(this);
            this.setDatakeyColor = this.setDatakeyColor.bind(this);
            this.setParam = this.setParam.bind(this);
      }

      componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevProps.datasources, this.props.datasources)) {
                  this.setState(state => ({ ...state, datasources: this.props.datasources }));
            }
            if (!_.isEqual(prevProps.filter_datasource, this.props.filter_datasource)) {
                  this.setState(state => ({ ...state, filter_datasource: this.props.filter_datasource }));
            }
            if (!_.isEqual(prevProps.editElement, this.props.editElement)) {
                  this.setState(state => ({ ...state, editElement: this.props.editElement }));
            }
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

      setDatasource(datasourcePath) {
            if (datasourcePath === '') {
                  let settings = this.state.settings;
                  settings = {
                        ...settings,
                        source: {},
                        params: []
                  };
                  this.setState(state => ({
                        ...state,
                        settings: settings
                  }));

                  let element = this.props.editElement;
                  element.settings.source = {};
                  this.props.editElementDispatch(element);
                  this.props.editHandler(this.props.editElement.i, settings);
                  return;
            }
            let datasources = _.cloneDeep(this.state.datasources, []);
            let currentDataSouce = datasources.find(source => {
                  return source.path === datasourcePath;
            });

            let settings = this.state.settings;
            let source = {
                  path: currentDataSouce.path,
                  key: currentDataSouce.key,
                  data: currentDataSouce.data
            };
            settings = {
                  ...settings,
                  source: source,
                  params: []
            };

            this.setState(state => ({
                  ...state, settings: settings
            }));
            let element = this.props.editElement;
            element.settings.source = source;
            this.props.editElementDispatch(element);
            this.props.editHandler(this.props.editElement.i, settings);
      }

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
            let element = this.props.editElement;
            element.settings = settings;
            this.props.editElementDispatch(element);
            this.props.editHandler(this.props.editElement.i, settings);
      }

      setLegendEnabled(value) {
            let settings = this.state.settings;
            console.log(value);
            settings = {
                  ...settings,
                  legend: {
                        ...this.legend,
                        enabled: value
                  }
            };
            console.log(settings);
            this.setState(state => ({
                  ...state,
                  settings: settings
            }));
            let element = this.props.editElement;
            element.settings = settings;
            this.props.editElementDispatch(element);
            this.props.editHandler(this.props.editElement.i, settings);
      }

      setLegendPosition(position) {
            let settings = this.state.settings;
            settings = {
                  ...settings,
                  legend: {
                        ...settings.legend,
                        position: position,
                        side: position == 'left' || position == 'right' ? 'vertical' : 'horizontal'
                  }
            };
            this.setState(state => ({
                  ...state,
                  settings: settings
            }));
            let element = this.props.editElement;
            element.settings = settings;
            this.props.editElementDispatch(element);
            this.props.editHandler(element.i, settings);
      }

      setDatakeyColor(key, color) {
            let settings = this.state.settings;
            settings = {
                  ...settings,
                  color: {
                        ...settings.color,
                        [key]: color,
                  }
            };
            this.setState(state => ({
                  ...state,
                  settings: settings
            }));
            let element = this.props.editElement;
            element.settings = settings;
            this.props.editElementDispatch(element);
            this.props.editHandler(element.i, settings);
      }

      setParam(left, right) {
            let settings = this.state.settings;
            let param = { [left]: right };
            let currentParamKey = _.findKey(settings.params, left);
            if (typeof currentParamKey !== 'undefined') {
                  settings.params[currentParamKey] = param;
            }
            else {
                  settings = {
                        ...settings,
                        params: [
                              ...settings.params,
                              param
                        ]
                  };
            }
            settings.params = settings.params.filter(item => {
                  let key = _.keys(item)[0]
                  return settings.params[key] !== null
            });
            this.setState(state => ({
                  ...state,
                  settings: settings
            }));
            let element = this.props.editElement;
            element.settings = settings;
            this.props.editElementDispatch(element);
            this.props.editHandler(element.i, settings);
      }

      render() {
            return (
                  <div className="col">
                        <div className="row">
                              <h3 className="mx-auto">Настройка диаграммы</h3>
                        </div>
                        <div className="row">
                              <Button
                                    className='collapse-button'
                                    onClick={() => this.setOpenDataSettings(!this.state.openDataSettings)}
                                    aria-controls="Datasource settings"
                                    aria-expanded={this.state.openDataSettings}
                              >
                                    <div className="collapse-button-content">
                                          <div>Data settings</div>
                                          <div>{!this.state.openDataSettings ? (<ArrowDown />) : (<ArrowUp />)}</div>
                                    </div>
                              </Button>
                              <Collapse in={this.state.openDataSettings}>
                                    <div>
                                          <DatasourceSettings datasources={this.state.datasources} setDatasource={this.setDatasource} />
                                          {this.state.filter_datasource.length > 0 && (
                                                <>
                                                      <div className="col mb-3">
                                                            <div className="label">Параметры</div>
                                                      </div>
                                                      {this.state.filter_datasource.map((param, index) => {
                                                            return (
                                                                  <FilterParameters setParam={this.setParam} key={index} param={param} />
                                                            )
                                                      })}
                                                </>
                                          )}
                                    </div>
                              </Collapse>
                        </div>
                        <div className="row">
                              <Button
                                    className='collapse-button'
                                    onClick={() => this.setOpenDiagramSettings(!this.state.openDiagramSettings)}
                                    aria-controls="Datasource settings"
                                    aria-expanded={this.state.openDiagramSettings}
                              >
                                    <div className="collapse-button-content">
                                          <div>Diagram settings</div>
                                          <div>{!this.state.openDiagramSettings ? (<ArrowDown />) : (<ArrowUp />)}</div>
                                    </div>
                              </Button>
                              <Collapse in={this.state.openDiagramSettings}>
                                    <div>
                                          <DiagramTypeSettings setType={this.setType} />
                                          {this.state.editElement.settings.type !== TABLE && (
                                                <>
                                                      <div className="col-12 mb-3">
                                                            <Form.Group>
                                                                  <Form.Check
                                                                        checked={
                                                                              typeof this.state.settings?.legend?.enabled !== 'undefined'
                                                                                    ? this.state.settings.legend.enabled
                                                                                    : false
                                                                        }
                                                                        onChange={e => this.setLegendEnabled(e.target.checked)} type="checkbox" label="Отобразить легенду" />
                                                            </Form.Group>
                                                      </div>
                                                      {this.state.settings.legend.enabled && (
                                                            <LegendSettings setLegendPosition={this.setLegendPosition} />
                                                      )}
                                                </>
                                          )}
                                          {/* <ColorSettings setDatakeyColor={this.setDatakeyColor} /> */}
                                    </div>
                              </Collapse>
                        </div>
                        <div className="row">
                              <Button
                                    className='collapse-button'
                                    onClick={() => this.setOpenTooltipSettings(!this.state.openTooltipSettings)}
                                    aria-controls="Datasource settings"
                                    aria-expanded={this.state.openTooltipSettings}
                              >
                                    <div className="collapse-button-content">
                                          <div>Tooltip settings</div>
                                          <div>{!this.state.openTooltipSettings ? (<ArrowDown />) : (<ArrowUp />)}</div>
                                    </div>
                              </Button>
                              <Collapse in={this.state.openTooltipSettings}>
                                    <div>

                                    </div>
                              </Collapse>
                        </div>
                        <div className="row justify-content-beetwen mt-3">
                              <div className="col">
                                    <button style={{ width: '100%' }} onClick={e => this.props.onCloseHandler(null)}>Закрыть</button>
                              </div>
                        </div>
                  </div>
            )
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetSettings);