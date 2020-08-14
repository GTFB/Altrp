import React, { Component } from "react";
import { connect } from "react-redux";
import controllerDecorate from "../../decorators/controller";
import Resource from "../../classes/Resource";

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
      modelsList: [],
      orderingFieldsOptions: [],
      paginationTypeOption: [
        {
          name: 'pages',
          title: 'Pages',
        },
        {
          name: 'prev-next',
          title: 'Prev/Next',
        },
      ]
    };
    this.changeModelName = this.changeModelName.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.changePaginationType = this.changePaginationType.bind(this);
  }

  async _componentDidMount() {
    let modelsList = await new Resource({ route: '/admin/ajax/models_list_for_query' }).getAll();
   console.log(modelsList);
    let value = { ...value };
    value.modelName = value.modelName || modelsList[0].name;
    if (!this.props.currentElement.getSettings(this.props.controlId)) {
      this._changeModelName(modelsList[0].name)
    }
    this.setState(state => ({ ...state, modelsList, value }));
  }

  /**
   * обработчик события смены названия модели для запроса
   * @param e
   */
  changeModelName(e) {
    this._changeModelName(e.target.value);
  }

  /**
   * обработчик события изменения количество записей на странице
   * @param e
   */
  changePageSize(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    let newValue = { ...value };
    newValue.pageSize = parseInt(e.target.value);
    this._changeValue(newValue)
  }

  /**
   * обработчик события изменения типа пагинации
   * @param e
   */
  changePaginationType(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    let newValue = { ...value };
    newValue.paginationType = e.target.value;
    this._changeValue(newValue)
  }
  /**
   * смена названия модели для запроса
   * @param {string} modelName
   */
  _changeModelName(modelName) {
    let _value = this.getSettings(this.props.controlId) || this.getDefaultValue();

    let value = { ..._value, modelName };
    let orderingFieldsOptions = [];
    this.state.modelsList.forEach(model => {
      if (model.name === modelName) {
        orderingFieldsOptions = model.ordering_fields;
      }
    });
    this.setState(state => ({ ...state, orderingFieldsOptions }));
    this._changeValue(value);
  }

  getDefaultValue() {
    return {
      modelName: '',
      pageSize: 10,
      paginationType: 'pages',
      orderingField: '',
      order: 'ASC',
    };
  }

  render() {

    if (this.state.show === false) {
      return '';
    }

    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();

    return <div className="controller-container controller-container_query">
      <div className="controller-field-group">
        <div className="controller-container__label">
          Source
        </div>
        <div className="control-container_select-wrapper">
          <select className="control-select control-field"
            value={value.modelName || ''}
            onChange={this.changeModelName}>
            <option value="" />
            {this.state.modelsList.map(option => {
              return <option value={option.name}
                key={option.name}>{option.title}</option>
            })}
          </select>
        </div>
      </div>
      <div className="controller-field-group">
        <div className="controller-container__label">
          Page Size
        </div>
        <div className="control-container_select-wrapper">
          <input className="control-field control-field_number"
            type="number"
            value={value.pageSize || 10}
            onChange={this.changePageSize} />
        </div>
      </div>
      <div className="controller-field-group">
        <div className="controller-container__label">
          Page Size
          </div>
        <div className="control-container_select-wrapper">
          <input className="control-field control-field_number"
            type="number"
            value={value.pageSize || 10}
            onChange={this.changePageSize} />
        </div>
      </div>
      <div className="controller-field-group">
        <div className="controller-container__label">
          Pagination Type
          </div>
        <div className="control-container_select-wrapper">
          <select className="control-select control-field"
            value={value.paginationType || ''}
            onChange={this.changePaginationType}>
            {this.state.paginationTypeOption.map(option => {
              return <option value={option.name}
                key={option.name}>{option.title}</option>
            })}
          </select>
        </div>
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

export default connect(mapStateToProps)(QueryController);
