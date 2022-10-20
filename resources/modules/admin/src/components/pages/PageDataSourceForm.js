import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Resource from "../../../../editor/src/js/classes/Resource";
import AltrpSelect from "../altrp-select/AltrpSelect";
import {altrpRandomId, isJSON, mbParseJSON, parseParamsFromString} from "../../../../front-app/src/js/helpers";
import PageDataSourceParams from "./PageDataSourceParams";

class PageDataSourceForm extends Component {
  state = {
    source_id: '',
    alias: '',
    priority: 100,
    parameters: '',
    dataSourceOptions: [],
    autoload: true,
    isExtendedSettings: isJSON(_.get(this.props, 'dataSource.parameters')),
    ...this.props.dataSource
  };

  changeHandler = ({ target: { value, name, checked } }) => {
    if(name === 'autoload' || name === 'server_side'){
      value = checked;
    }
    this.setState({ [name]: value });
  };

  async componentDidMount() {
    const resource = new Resource({ route: '/admin/ajax/data_sources' });
    const { data_sources } = await resource.getAll();
    this.setState({ dataSourceOptions: data_sources })
  }

  submitHandler = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const pageId = id || this.props.id;
    const resource = new Resource({ route: `/admin/ajax/page_data_sources` });
    const data = { ...this.state };
    delete data.dataSourceOptions;
    if (this.props.dataSource) {
        resource.put(data.id, data);
    } else {
      resource.post({ page_id: pageId, ...data });
    }
    this.props.updateHandler();
  };
  /**
   * Переключаем тип настройки параметров с раширинных до обычных
   */
  toggleParamsSettings=()=>{
    let isExtendedSettings = ! this.state.isExtendedSettings;
    let parameters;
    if(isExtendedSettings){
      parameters = parseParamsFromString(this.state.parameters, {}, false, false, false);
      parameters = _.map(parameters, (paramValue, paramName) => {
        return {
          paramValue,
          paramName,
          key: altrpRandomId(),
          required: false,
        }
      });
      parameters = JSON.stringify(parameters);
    } else {
      parameters = mbParseJSON(this.state.parameters) || [];
      let _parameters = '';
      parameters.forEach(param => {
        _parameters += `${param.paramName || ''} | ${param.paramValue || ''}\n`
      });
      parameters = _parameters;
    }
    this.setState(state => ({...state, isExtendedSettings, parameters}));
  };
  render() {
    let { source_id, alias, priority, parameters, dataSourceOptions, autoload, isExtendedSettings, server_side } = this.state;
    dataSourceOptions = dataSourceOptions.map(source=>({value:source.id, label:source.title || source.name}));
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="source_id">Data Source</label>
        {/*<select id="source_id"*/}
          {/*name="source_id"*/}
          {/*value={source_id}*/}
          {/*onChange={this.changeHandler}*/}
          {/*className="form-control"*/}
        {/*>*/}
          {/*<option value="" />*/}
          {/*{dataSourceOptions.map(({ id, name }) => <option value={id} key={id}>{name}</option>)}*/}
        {/*</select>*/}
        <AltrpSelect options={dataSourceOptions}
                     onChange={({value})=>{
                       this.setState(state => ({...state, source_id: value}));
                     }}
                     value={dataSourceOptions.find(({value})=>value === source_id)}/>
      </div>

      <div className="form-group">
        <label htmlFor="alias">Alias</label>
        <input type="text" id="alias" required
          name="alias"
          value={alias}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <input type="number" id="priority" required
          name="priority"
          value={priority}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="autoload">Autoload</label>
        <input type="checkbox" id="autoload"
          name="autoload"
          checked={autoload}
          onChange={this.changeHandler}
          className="form-check-input position-static ml-2"
        />
      </div>
      <div className="form-group">
        <label htmlFor="server_side">Server Side</label>
        <input type="checkbox" id="server_side"
          name="server_side"
          checked={server_side}
          onChange={this.changeHandler}
          className="form-check-input position-static ml-2"
        />
      </div>
      <div className="admin_switcher">
        <div className="admin_switcher__label">Extended Params Settings</div>
        <div className={`control-switcher ${isExtendedSettings ? 'control-switcher_on' : 'control-switcher_off'}`}
             onClick={this.toggleParamsSettings}>
          <div className="control-switcher__on-text">ON</div>
          <div className="control-switcher__caret"/>
          <div className="control-switcher__off-text">OFF</div>
        </div>
      </div>
      {! isExtendedSettings && <div className="form-group">
        <label htmlFor="parameters">Parameters:</label>
        <textarea name="parameters"
          id="parameters"
          value={parameters || ''}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>}
      {isExtendedSettings && <PageDataSourceParams parameters={parameters || ''} onChange={parameters=>{
        this.setState(state=>({...state, parameters: JSON.stringify(parameters)}));
      }}/>}

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
      </div>
    </form>;
  }
}

export default withRouter(PageDataSourceForm);
