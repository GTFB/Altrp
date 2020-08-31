import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import controllerDecorate from "../../decorators/controller";
import Resource from "../../classes/Resource";
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";

/**
 * Контроллер настроек запроса
 * @method _changeValue
 * @see {@link controller.js#_changeValue}
 */

class QueryController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || {};
    this.state = {
      value,
      show: true,
      dataSourceList: [],
      sqlQueries: [],
      orderingFieldsOptions: [],
      paginationTypeOption: [
        {
          name: "pages",
          title: "Pages",
        },
        {
          name: "prev-next",
          title: "Prev/Next",
        },
      ],
    };
    this.changeQueryName = this.changeQueryName.bind(this);
    this.changeModelName = this.changeModelName.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.changePaginationType = this.changePaginationType.bind(this);
  }

  async _componentDidMount() {
    let dataSourceList = await new Resource({
      route: "/admin/ajax/data_sources_for_query",
    }).getAll();
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    value = { ...value };
    value.modelName = value.modelName || dataSourceList[0].name;
    if (!this.props.currentElement.getSettings(this.props.controlId)) {
      this._changeModelName(dataSourceList[0].name);
    }
    this.setState((state) => ({ ...state, dataSourceList, value }));
  }

  /**
   * обработчик события смены названия модели для запроса
   * @param e
   */
  changeModelName(e) {
    this._changeModelName(e.target.value);
  }

  /**
   * обработчик события смены DataSource
   * @param {{}} dataSource
   */
  onChangeDataSource = async (dataSource) => {
    if(dataSource.type === 'model_query'){
      const req = await axios(`/admin/ajax/sql_editors/list/${dataSource.value}`);
      this.setState({ sqlQueries: req.data || [] });
    }
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    value.dataSource = { ...dataSource };
    this._changeValue({ ...value });
  };

  /**
   * обработчик события смены Query
   * @param e
   */
  changeQueryName = async (e) => {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    let newValue = { ...value };
    newValue.sql = e.target.value;
    this._changeValue(newValue);
  };

  /**
   * обработчик события изменения количество записей на странице
   * @param e
   */
  changePageSize(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    let newValue = { ...value };
    newValue.pageSize = parseInt(e.target.value);
    this._changeValue(newValue);
  }

  /**
   * обработчик события изменения типа пагинации
   * @param e
   */
  changePaginationType(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    let newValue = { ...value };
    newValue.paginationType = e.target.value;
    this._changeValue(newValue);
  }

  /**
   * Изменение памраметров по умолчанию для query-настроек
   */
  changeDefaultParams = (e) => {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    let newValue = { ...value };
    newValue.defaultParams = e.target.value;
    this._changeValue(newValue);
  };
  /**
   * смена названия модели для запроса
   * @param {string} modelName
   */
  _changeModelName(modelName) {
    let _value = this.getSettings(this.props.controlId) || this.getDefaultValue();

    let value = { ..._value, modelName };
    let orderingFieldsOptions = [];
    this.state.dataSourceList.forEach((model) => {
      if (model.name === modelName) {
        orderingFieldsOptions = model.ordering_fields;
      }
    });
    this.setState((state) => ({ ...state, orderingFieldsOptions }));
    this._changeValue(value);
  }

  getDefaultValue() {
    return {
      modelName: "",
      pageSize: 10,
      paginationType: "pages",
      orderingField: "",
      order: "ASC",
      sql: "",
      defaultParams: ''
    };
  }

  render() {
    if (this.state.show === false) {
      return "";
    }

    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    return (
      <div className="controller-container controller-container_query">
        <div className="controller-field-group flex-wrap">
          <div className="controller-container__label">Source</div>
          <div className="control-container_select-wrapper w-100">
            <AltrpSelect
              options={this.state.dataSourceList}
              onChange={this.onChangeDataSource}
              value={value.dataSource}
              styles={{
                container: () => ({
                  width: "100%",
                }),
              }}
            />
          </div>
        </div>
        {this.state.sqlQueries.length > 0 && (
          <div className="controller-field-group flex-wrap">
            <div className="controller-container__label">SQL Query</div>
            <div className="control-container_select-wrapper">
              <select
                className="control-select control-field"
                value={value.sql || ""}
                onChange={this.changeQueryName}
              >
                <option value="" />
                {this.state.sqlQueries.map((option) => {
                  return (
                    <option value={option.name} key={option.id}>
                      {option.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
        <div className="controller-field-group ">
          <div className="controller-container__label">Page Size</div>
          <div className="control-container_select-wrapper ">
            <input
              className="control-field control-field_number"
              type="number"
              value={value.pageSize || 10}
              onChange={this.changePageSize}
            />
          </div>
        </div>
        <div className="controller-field-group">
          <div className="controller-container__label">Page Size</div>
          <div className="control-container_select-wrapper">
            <input
              className="control-field control-field_number"
              type="number"
              value={value.pageSize || 10}
              onChange={this.changePageSize}
            />
          </div>
        </div>
        <div className="controller-field-group">
          <div className="controller-container__label">Pagination Type</div>
          <div className="control-container_select-wrapper">
            <select
              className="control-select control-field"
              value={value.paginationType || ""}
              onChange={this.changePaginationType}
            >
              {this.state.paginationTypeOption.map((option) => {
                return (
                  <option value={option.name} key={option.name}>
                    {option.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="controller-field-group flex-wrap">
          <textarea className="controller-container__textarea"
                    onChange={this.changeDefaultParams} value={this.state.value.defaultParams || ''} />
          <div className="controller-container__description">
            Enter each param for Query in a separate line.<br/>To differentiate between label and value, separate them with a pipe char ("|").<br/>For example: title | Post.<br/>Or<br/>title | {'{{title}}'} for Take title Value from Current Model
          </div>
        </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen,
  };
}

export default connect(mapStateToProps)(QueryController);
