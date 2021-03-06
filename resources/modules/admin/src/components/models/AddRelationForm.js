import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {titleToName} from "../../js/helpers";

const relationTypeOptions = [
  {
    value: 'hasOne',
    label: 'Has One'
  },
  {
    value: 'belongsTo',
    label: 'Belongs To'
  },
  {
    value: 'hasMany',
    label: 'Has Many'
  },
];
const deleteUpdateOptions = [
  {
    value: 'cascade',
    label: 'cascade'
  },
  {
    value: 'set null',
    label: 'set null'
  },
  {
    value: 'no action',
    label: 'no action'
  },
  {
    value: 'restrict',
    label: 'restrict'
  }
];

class AddRelationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelsOptions: [],
      value: {
        title: '',
        description: '',
        type: '',
        model_id: this.props.match.params.modelId,
        add_belong_to: false,
        editable: true,
        always_with: false,
        local_key: '',
        foreign_key: '',
        onDelete: 'set null',
        onUpdate: 'set null'
      },
      selfFieldsOptions: [],
      foreignFieldsOptions: [],
      relationTypeOptions,
    };
    this.modelsResource = new Resource({ route: '/admin/ajax/model_options' });
    this.relationsResource = new Resource({ route: `/admin/ajax/models/${this.props.match.params.modelId}/relations` });
    this.submitHandler = this.submitHandler.bind(this);
  }

  async componentDidMount() {
    let { options } = await this.modelsResource.getAll();
    const { modelId, id } = this.props.match.params;
    //Модель может ссылаться на саму себя
    //options = options.filter(option=>(Number(option.value) !== Number(modelId)));
    this.setState({ modelsOptions: options });
    let fields = await (new Resource({route: `/admin/ajax/models/${modelId}/fields`})).getAll();
    let selfFieldsOptions = fields.map(field=>({
      label: field.title,
      value: field.name,
    }));
    this.setState(state=>({...state, selfFieldsOptions}));
    if(id){
      let value = await this.relationsResource.get(id);
      this.relationName = value.name;
      this.updateForeignFieldOptions(value.target_model_id);
      this.changeTargetModel(value.target_model_id);
      this.setState(state=>({...state, value}));
    }
  }
  /**
   * Проверяем значение при смене модели
   * если модель это User, то скроем Add Reverse Relation
   * и уберем из вариантов связей Has many
   * @param {string} value
   */
  changeTargetModel(value) {
    let modelName = '';
    this.state.modelsOptions.forEach(option=>{
      if(parseInt(option.value) === parseInt(value)){
        modelName = option.label;
      }
    });
    let _relationTypeOptions = relationTypeOptions.filter(option=>{
      if(modelName !== 'User'){
        return true;
      }
      return option.value !== 'hasMany';
    });
    if(modelName === 'User'){
      this.changeValue('hasOne', 'type');
      this.changeValue(false, 'add_belong_to');
    }
    this.setState(state =>({...state, hideAddBelongTo:modelName === 'User', relationTypeOptions:_relationTypeOptions}));
  }
/**
 * Изменить значение
 * @param {*} value
 * @param {string} field
 */
  changeValue(value, field) {
  const { id } = this.props.match.params;

  if(field === 'target_model_id'){
    this.changeTargetModel(value);
  }
  this.setState(state => {
      state = { ...state };
      state.value[field] = value;
      if(field === 'title' && ! id){
        state.value.name = titleToName(value);
      }
      if((field === 'name')){
        state.value.name = titleToName(value);
      }
      if(field === 'foreign_key'){
        state.value[field] = titleToName(value);
      }
      if(field === 'target_model_id'){
        this.updateForeignFieldOptions(value)
      }
      return state
    })
  }

  /**
   * При изменении модели для связи изменяем опции
   * @param {string} modelId
   */
  async updateForeignFieldOptions(modelId){
    let fields = await (new Resource({route: `/admin/ajax/models/${modelId}/fields`})).getAll();
    let foreignFieldsOptions = fields.map(field=>({
      label: field.title,
      value: field.name,
    }));
    this.setState(state=>({...state, foreignFieldsOptions}))

  }
  /**
   * Отправка данных
   */
  async submitHandler(e) {
    e.preventDefault();
    const { history, match } = this.props;
    const data = this.state.value;
    const isNameTaken = !this.props.match.params.id || this.relationName !== data.name ?
      await fetch(`/admin/ajax/models/${match.params.modelId}/relation_name_is_free/?name=${data.name}`)
        .then(res => res.json())
        .then(res => !res.taken) :
      null;

    if (isNameTaken) {
      return alert(`Name ${data.name} is already taken. Use another one.`)
    }

    if (this.props.match.params.id) {
      let res = await this.relationsResource.put(this.props.match.params.id, data);
    } else {
      let res = await this.relationsResource.post(data);
    }
    history.push(`/admin/tables/models/edit/${match.params.modelId}`);
  }

  /**
   * вывод поля Local Key
   */
  renderLocalKey(){
    const { id } = this.props.match.params;

    return <div className="form-group form-group_width47">
      <label htmlFor="relation-local_key">Local Key</label>
      <select  id="relation-local_key"
             value={this.state.value.local_key || ''}
             className="form-control"
             onChange={e => { this.changeValue(e.target.value, 'local_key') }}
      >
        <option disabled value="" />
        {this.state.selfFieldsOptions.map(({ value, label }) =>
            <option key={value} value={value}>
              {label}
            </option>)}
      </select>
    </div>

  }

/**
   * вывод поля Foreign Key
   */
  renderForeignKey(){
    const { id } = this.props.match.params;

    return<div className="form-group form-group_width47">
      <label htmlFor="relation-foreign_key">Foreign Key</label>
      <select id="relation-foreign_key"
        value={this.state.value.foreign_key || ''}
        onChange={e => { this.changeValue(e.target.value, 'foreign_key') }}
        className="form-control"
      >
        <option disabled value="" />
        {this.state.foreignFieldsOptions.map(({ value, label }) =>
          <option key={value} value={value}>
            {label}
          </option>)}
      </select>
    </div>
  }


  render() {
    const { id } = this.props.match.params;
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="row">
        <div className="form-group col-12">
          <label htmlFor="relation-title">Relation Title</label>
          <input type="text" id="relation-title" required
            value={this.state.value.title || ''}
            onChange={e => { this.changeValue(e.target.value, 'title') }}
            className="form-control" />
        </div>
        <div className="form-group col-4">
          <label htmlFor="relation-title">Relation Name</label>
          <input type="text" id="relation-title" required readOnly={id}
            value={this.state.value.name || ''}
            onChange={e => { this.changeValue(e.target.value, 'name') }}
            className="form-control" />
        </div>

        <div className="form-group col-8">
          <label htmlFor="relation-description">Relation Description</label>
          <input type="text" id="relation-description" readOnly={id}
            value={this.state.value.description || ''}
            onChange={e => { this.changeValue(e.target.value, 'description') }}
            className="form-control" />
        </div>
      </div>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="relation-type">Relation Type</label>
          <select id="relation-type" required disabled={id}
            value={this.state.value.type}
            onChange={e => { this.changeValue(e.target.value, 'type') }}
            className="form-control"
          >
            <option disabled value="" />
            {this.state.relationTypeOptions.map(item =>
              <option key={item.value} value={item.value}>
                {item.label}
              </option>)}
          </select>
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="relation-model_id">Model to Bound</label>
          <select id="relation-model_id" required
            value={this.state.value.target_model_id || ''}
            onChange={e => { this.changeValue(e.target.value, 'target_model_id') }}
            className="form-control"
          >
            <option disabled value="" />
            {this.state.modelsOptions.map(({ value, label }) =>
              <option key={value} value={value}>
                {label}
              </option>)}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-4">
          {this.state.hideAddBelongTo || this.state.value.type === 'belongsTo' ? '' : <><input type="checkbox" id="relation-add_belong_to"
            checked={this.state.value.add_belong_to} readOnly={id}
            onChange={e => { this.changeValue(e.target.checked, 'add_belong_to') }}
          />
          <label className="checkbox-label" htmlFor="relation-add_belong_to">Add Reverse Relation</label></>}
        </div>
        <div className="form-group col-4">
          { (! ['hasMany', 'belongsTo'].includes(this.state.value.type)) ?
              <><input type="checkbox"
                       id="field-editable"
                       checked={this.state.value.editable}
                       onChange={e => { this.changeValue(e.target.checked, 'editable') }}
          />
            <label className="checkbox-label" htmlFor="field-editable">Editable</label></> : ''}

        </div>
        <div className="form-group col-4">
         <input type="checkbox"
                id="field-always_with"
                checked={this.state.value.always_with}
                onChange={e => { this.changeValue(e.target.checked, 'always_with') }}
          />
            <label className="checkbox-label" htmlFor="field-always_with">Always With</label>
        </div>
      </div>
      <div className="form-group__inline-wrapper">
        {this.renderLocalKey()}
        {this.renderForeignKey()}
      </div>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="onDelete">On Delete</label>
          <select id="onDelete" required
            value={this.state.value.onDelete}
            onChange={e => { this.changeValue(e.target.value, 'onDelete') }}
            className="form-control"
          >
            <option disabled value="" />
            {deleteUpdateOptions.map(({ value, label }) =>
              <option key={value} value={value}>
                {label.toUpperCase()}
              </option>)}
          </select>
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="onUpdate">On Update</label>
          <select id="onUpdate" required
            value={this.state.value.onUpdate}
            onChange={e => { this.changeValue(e.target.value, 'onUpdate') }}
            className="form-control"
          >
            <option disabled value="" />
            {deleteUpdateOptions.map(({ value, label }) =>
              <option key={value} value={value}>
                {label.toUpperCase()}
              </option>)}
          </select>
        </div>
      </div>

       <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
        <Link className="btn" to="/admin/tables/models">Cancel</Link>
        {/* <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }

}

export default withRouter(AddRelationForm);
