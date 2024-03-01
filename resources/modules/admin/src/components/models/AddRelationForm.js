import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {titleToName, titleToNameTwo} from "../../js/helpers";
import {InputGroup, MenuItem, Button, Alignment} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";
import {connect} from "react-redux";
import getAltrpLang from "../../js/helpers/get-altrp-lang";

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
  {
    value: 'manyToMany',
    label: 'Many To Many'
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
        type: 'hasMany',
        model_id: this.props.modelRelationID,
        add_belong_to: true,
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
    this.relationsResource = new Resource({ route: `/admin/ajax/models/${this.props.modelId}/relations` });
    this.submitHandler = this.submitHandler.bind(this);
  }

  async componentDidMount() {
    let { options } = await this.modelsResource.getAll();
    //Модель может ссылаться на саму себя
    //options = options.filter(option=>(Number(option.value) !== Number(modelId)));
    this.setState({ modelsOptions: options });
    let fields = await (new Resource({route: `/admin/ajax/models/${this.props.modelId}/fields`})).getAll();
    let selfFieldsOptions = fields.map(field=>({
      label: field.title,
      value: field.name,
    }));
    this.setState(state=>({...state, selfFieldsOptions}));
    if(this.props.modelRelationID){
      let value = await this.relationsResource.get(this.props.modelRelationID);
      this.relationName = value.name;
      this.updateForeignFieldOptions(value.target_model_id);
      this.changeTargetModel(value.target_model_id);
      this.setState(state=>({...state, value}));
    }
  }


  ItemPredicate = (query, value) => {
     if(!query) {
       return true
     }

     return value.label.toLowerCase().indexOf(query.toLowerCase()) >= 0
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

  if(field === 'target_model_id'){
    this.changeTargetModel(value);
  }
  this.setState(state => {
      state = { ...state };
      state.value[field] = value;
      if(field === 'title' && ! this.props.modelRelationID){
        state.value.title = titleToNameTwo(value);
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
    const data = this.state.value;
    const isNameTaken = !this.props.modelRelationID || this.relationName !== data.name ?
      await fetch(`/admin/ajax/models/${this.props.modelId}/relation_name_is_free/?name=${data.name}`)
        .then(res => res.json())
        .then(res => !res.taken) :
      null;

    if (isNameTaken) {
      return alert(`Name ${data.name} is already taken. Use another one.`)
    }

    if (this.props.modelRelationID) {
      await this.relationsResource.put(this.props.modelRelationID, data);
    } else {
      await this.relationsResource.post(data);
    }
    this.props.toggleModal();
  }

  /**
   * вывод поля Local Key
   */
  renderLocalKey(){

    return <div className="form-group flex-grow__selectBlueprint form-group_width47">
      <label htmlFor="relation-local_key">Local Key</label>
      {/*<select  id="relation-local_key"*/}
      {/*       value={this.state.value.local_key || ''}*/}
      {/*       className="form-control"*/}
      {/*       onChange={e => { this.changeValue(e.target.value, 'local_key') }}*/}
      {/*>*/}
      {/*  <option disabled value="" />*/}
      {/*  {this.state.selfFieldsOptions.map(({ value, label }) =>*/}
      {/*      <option key={value} value={value}>*/}
      {/*        {label}*/}
      {/*      </option>)}*/}
      {/*</select>*/}


      <Select items={this.state.selfFieldsOptions}
              id="relation-local_key"
              matchTargetWidth
              itemPredicate={this.ItemPredicate}
              noResults={<MenuItem disabled={true} text="No results." />}
              itemRenderer={(item, {handleClick, modifiers, query}) => {
                return <MenuItem
                  text={item.label}
                  key={item.value}
                  active={item.value === this.state.value.local_key }
                  onClick={handleClick}
                />
              }}
              onItemSelect={current => { this.changeValue(current.value, 'local_key') }}
              fill={true}
      >
        <Button fill
                large
                alignText={Alignment.LEFT}
                text={this.state.selfFieldsOptions.find(item => (item.value === this.state.value.local_key))?.label || 'none'}
                rightIcon="caret-down"
        />
      </Select>
    </div>

  }

/**
   * вывод поля Foreign Key
   */
  renderForeignKey(){

    return<div className="form-group flex-grow__selectBlueprint form-group_width47">
      <label htmlFor="relation-foreign_key">Foreign Key</label>
      {/*<select id="relation-foreign_key"*/}
      {/*  value={this.state.value.foreign_key || ''}*/}
      {/*  onChange={e => { this.changeValue(e.target.value, 'foreign_key') }}*/}
      {/*  className="form-control"*/}
      {/*>*/}
      {/*  <option disabled value="" />*/}
      {/*  {this.state.foreignFieldsOptions.map(({ value, label }) =>*/}
      {/*    <option key={value} value={value}>*/}
      {/*      {label}*/}
      {/*    </option>)}*/}
      {/*</select>*/}

      <Select items={this.state.foreignFieldsOptions}
              id="relation-foreign_key"
              matchTargetWidth
              itemPredicate={this.ItemPredicate}
              noResults={<MenuItem disabled={true} text="No results." />}
              itemRenderer={(item, {handleClick, modifiers, query}) => {
                return <MenuItem
                  text={item.label}
                  key={item.value}
                  active={item.value === this.state.value.foreign_key }
                  onClick={handleClick}
                />
              }}
              onItemSelect={current => { this.changeValue(current.value, 'foreign_key') }}
              fill={true}
      >
        <Button fill
                large
                alignText={Alignment.LEFT}
                text={this.state.foreignFieldsOptions.find(item => (item.value === this.state.value.foreign_key))?.label || 'none'}
                rightIcon="caret-down"
        />
      </Select>
    </div>
  }


  render() {
    console.log(this)
    return <form className="admin-form admin-form-relation" onSubmit={this.submitHandler}>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="relation-title">Relation Title</label>
          {/*<input type="text" id="relation-title" required*/}
          {/*  value={this.state.value.title || ''}*/}
          {/*  onChange={e => { this.changeValue(e.target.value, 'title') }}*/}
          {/*  className="form-control" />*/}

          <InputGroup type="text"
                      id="relation-title"
                      required
                      value={this.state.value.title || ''}
                      onChange={e => { this.changeValue(e.target.value, 'title') }}
                      className="form-control-blueprint"
          />
        </div>
        <div className="form-group form-group_width47">
          <label htmlFor="relation-title">Relation Name</label>
          {/*<input type="text" id="relation-title" required readOnly={id}*/}
          {/*  value={this.state.value.name || ''}*/}
          {/*  onChange={e => { this.changeValue(e.target.value, 'name') }}*/}
          {/*  className="form-control" />*/}

          <InputGroup type="text"
                      id="relation-title"
                      required
                      readOnly={this.props.modelRelationID}
                      value={this.state.value.name || ''}
                      onChange={e => { this.changeValue(e.target.value, 'name') }}
                      className="form-control-blueprint"
          />
        </div>
      </div>

        <div className="form-group">
          <label htmlFor="relation-description">Relation Description</label>
          {/*<input type="text" id="relation-description" readOnly={id}*/}
          {/*  value={this.state.value.description || ''}*/}
          {/*  onChange={e => { this.changeValue(e.target.value, 'description') }}*/}
          {/*  className="form-control" />*/}

          <InputGroup type="text"
                      id="relation-description"
                      readOnly={this.props.modelRelationID}
                      value={this.state.value.description || ''}
                      onChange={e => { this.changeValue(e.target.value, 'description') }}
                      className="form-control-blueprint"
          />
        </div>

      <div className="form-group__inline-wrapper flex-grow__selectBlueprint">
        <div className="form-group form-group_width47">
          <label htmlFor="relation-type">Relation Type</label>
          {/*<select id="relation-type" required disabled={id}*/}
          {/*  value={this.state.value.type}*/}
          {/*  onChange={e => { this.changeValue(e.target.value, 'type') }}*/}
          {/*  className="form-control"*/}
          {/*>*/}
          {/*  <option disabled value="" />*/}
          {/*  {this.state.relationTypeOptions.map(item =>*/}
          {/*    <option key={item.value} value={item.value}>*/}
          {/*      {item.label}*/}
          {/*    </option>)}*/}
          {/*</select>*/}


          <Select items={relationTypeOptions}
                  disabled={this.props.modelRelationID}
                  matchTargetWidth
                  itemPredicate={this.ItemPredicate}
                  noResults={<MenuItem disabled={true} text="No results." />}
                  itemRenderer={(item, {handleClick, modifiers, query}) => {
                    return <MenuItem
                      text={item.label}
                      key={item.value}
                      active={item.value === this.state.value.type }
                      onClick={handleClick}
                    />
                  }}
                  onItemSelect={current => { this.changeValue(current.value, 'type') }}
                  fill={true}
          >
            <Button disabled={this.props.modelRelationID}
                    fill
                    large
                    alignText={Alignment.LEFT}
                    text={relationTypeOptions.find(item => (item.value === this.state.value.type))?.label}
                    rightIcon="caret-down"
            />
          </Select>
        </div>

        <div className="form-group overflow-select__blueprint form-group_width47">
          <label htmlFor="relation-model_id">Model to Bound</label>
          {/*<select id="relation-model_id" required*/}
          {/*  value={this.state.value.target_model_id || ''}*/}
          {/*  onChange={e => { this.changeValue(e.target.value, 'target_model_id') }}*/}
          {/*  className="form-control"*/}
          {/*>*/}
          {/*  <option disabled value="" />*/}
          {/*  {this.state.modelsOptions.map(({ value, label }) =>*/}
          {/*    <option key={value} value={value}>*/}
          {/*      {label}*/}
          {/*    </option>)}*/}
          {/*</select>*/}

          <Select items={this.state.modelsOptions}
                  required
                  matchTargetWidth
                  itemPredicate={this.ItemPredicate}
                  noResults={<MenuItem disabled={true} text="No results." />}
                  itemRenderer={(item, {handleClick, modifiers, query}) => {
                    return <MenuItem
                          text={item.label}
                          key={item.value}
                          active={item.value === this.state.value.target_model_id }
                          onClick={handleClick}
                        />
                  }}
                  onItemSelect={current => { this.changeValue(current.value, 'target_model_id') }}
                  fill={true}
          >
            <Button fill
                    large
                    alignText={Alignment.LEFT}
                    text={this.state.modelsOptions.find(item => (item.value === this.state.value.target_model_id))?.label || 'none'}
                    rightIcon="caret-down"
            />
          </Select>
        </div>
      </div>
      <div className="relations__checkbox">
        <div className="form-group">
          {this.state.hideAddBelongTo || this.state.value.type === 'belongsTo' ? '' : <><input type="checkbox" id="relation-add_belong_to"
            checked={this.state.value.add_belong_to} readOnly={this.props.modelRelationID}
            onChange={e => { this.changeValue(e.target.checked, 'add_belong_to') }}
          />
          <label className="checkbox-label" htmlFor="relation-add_belong_to">Add Reverse Relation</label></>}
        </div>
        <div className="form-group">
          { (! ['hasMany', 'belongsTo'].includes(this.state.value.type)) ?
              <><input type="checkbox"
                       id="field-editable"
                       checked={this.state.value.editable}
                       onChange={e => { this.changeValue(e.target.checked, 'editable') }}
          />
            <label className="checkbox-label" htmlFor="field-editable">Editable</label></> : ''}

        </div>
        <div className="form-group">
          {
            getAltrpLang() === 'javascript'
            ? null
            :
            <>
              <input type="checkbox"
                     id="field-always_with"
                     checked={this.state.value.always_with}
                     onChange={e => {
                       this.changeValue(e.target.checked, 'always_with')
                     }}
              />
              <label className="checkbox-label" htmlFor="field-always_with">Always With</label>
            </>
          }
        </div>
      </div>
      <div className="form-group__inline-wrapper">
        {this.renderLocalKey()}
        {this.renderForeignKey()}
      </div>

      {this.state.value?.type !=='manyToMany' && <div className="form-group__inline-wrapper">
        <div className="form-group flex-grow__selectBlueprint form-group_width47">
          <label htmlFor="onDelete">On Delete</label>
          {/*<select id="onDelete" required*/}
          {/*  value={this.state.value.onDelete}*/}
          {/*  onChange={e => { this.changeValue(e.target.value, 'onDelete') }}*/}
          {/*  className="form-control"*/}
          {/*>*/}
          {/*  <option disabled value="" />*/}
          {/*  {deleteUpdateOptions.map(({ value, label }) =>*/}
          {/*    <option key={value} value={value}>*/}
          {/*      {label.toUpperCase()}*/}
          {/*    </option>)}*/}
          {/*</select>*/}


          <Select items={deleteUpdateOptions}
                  required
                  id="onDelete"
                  matchTargetWidth
                  itemPredicate={this.ItemPredicate}
                  noResults={<MenuItem disabled={true} text="No results."/>}
                  itemRenderer={(item, {handleClick, modifiers, query}) => {
                    return <MenuItem
                      text={item.label}
                      key={item.value}
                      active={item.value === this.state.value.onDelete}
                      onClick={handleClick}
                    />
                  }}
                  onItemSelect={current => {
                    this.changeValue(current.value, 'onDelete')
                  }}
                  fill={true}
          >
            <Button fill
                    large
                    alignText={Alignment.LEFT}
                    text={this.state.value.onDelete}
                    rightIcon="caret-down"
            />
          </Select>
        </div>

        <div className="form-group flex-grow__selectBlueprint form-group_width47">
          <label htmlFor="onUpdate">On Update</label>
          {/*<select id="onUpdate" required*/}
          {/*  value={this.state.value.onUpdate}*/}
          {/*  onChange={e => { this.changeValue(e.target.value, 'onUpdate') }}*/}
          {/*  className="form-control"*/}
          {/*>*/}
          {/*  <option disabled value="" />*/}
          {/*  {deleteUpdateOptions.map(({ value, label }) =>*/}
          {/*    <option key={value} value={value}>*/}
          {/*      {label.toUpperCase()}*/}
          {/*    </option>)}*/}
          {/*</select>*/}


          <Select items={deleteUpdateOptions}
                  required
                  id="onUpdate"
                  matchTargetWidth
                  itemPredicate={this.ItemPredicate}
                  noResults={<MenuItem disabled={true} text="No results." />}
                  itemRenderer={(item, {handleClick, modifiers, query}) => {
                    return <MenuItem
                      text={item.label}
                      key={item.value}
                      active={item.value === this.state.value.onUpdate }
                      onClick={handleClick}
                    />
                  }}
                  onItemSelect={current => { this.changeValue(current.value, 'onUpdate') }}
                  fill={true}
          >
            <Button fill
                    large
                    alignText={Alignment.LEFT}
                    text={this.state.value.onUpdate}
                    rightIcon="caret-down"
            />
          </Select>
        </div>
      </div>}

       <div className="btn__wrapper btn__wrapper-relations">
        <button className="btn btn_success" type="submit">Add</button>
        {/*<Link className="btn" to="/admin/tables/models">Cancel</Link>*/}
        {/* <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }

}

const mapStateToProps = (state) => {
  return {
    modelRelationID: state.modelsState.modelRelationID
  }
}

export default connect(mapStateToProps)(AddRelationForm);
