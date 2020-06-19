import React, {Component} from "react";
import {connect} from "react-redux";
import controllerDecorate from "../../decorators/controller";
import Resource from "../../classes/Resource";

/**
 * Контроллер настроек запроса
 * @method _changeValue
 * @see {@link controller.js#_changeValue}
 */

class QueryController extends Component {
  constructor(props){
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || {};
    this.state = {
      value,
      modelsList: [],
      orderingFieldsOptions: [],
    };
    this.changeModelName = this.changeModelName.bind(this);
    controllerDecorate(this);
  }
  async componentDidMount(){
    let modelsList = await new Resource({route: '/admin/ajax/models_list'}).getAll();
    let value = {...this.state.value};
    value.modelName = value.modelName || modelsList[0].name;
    this.setState(state=>({...state, modelsList, value}))
  }

  /**
   * обработчик события смены названия модели для запроса 
   * @param e
   */
  changeModelName(e){
    this._changeModelName(e.target.value);
  }
  /**
   * смена названия модели для запроса
   * @param {string} modelName
   */
  _changeModelName(modelName){
    let value = {...this.state.value, modelName};
    let orderingFieldsOptions = [];
    this.state.modelsList.forEach(model=>{
      if(model.name === modelName){
        orderingFieldsOptions = model.ordering_fields;
      }
    });
    this.setState(state=>({...state, orderingFieldsOptions}));
    this._changeValue(value);
  }
  
  getDefaultValue(){
    return {
      modelName: '',
      pageSize: 10,
      paginationType: 'pages',
      orderingField: '',
      order: 'ASC',
    };
  }
  render(){
    return <div className="controller-container controller-container_query">
      <div className="controller-container__label">
        Source
      </div>
      <div className="control-container_select-wrapper">
        <select className="control-select control-field"
                value={this.state.value.modelName || ''}
                onChange={this.changeModelName}>
          {this.state.modelsList.map(option => {return <option value={option.name}
                                                                     key={option.name}>{option.title}</option>})}
        </select>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(QueryController);
