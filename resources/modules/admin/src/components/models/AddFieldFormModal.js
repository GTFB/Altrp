import React, {Component} from "react";

import FieldCalculationLogic from "./FieldCalculationLogic";
import Resource from "../../../../editor/src/js/classes/Resource";
import {titleToName} from "../../js/helpers";
import "./../../sass/components/AddFieldFormModal.scss"
import {InputGroup, NumericInput, MenuItem, Button, Alignment, TextArea} from "@blueprintjs/core";
import {connect} from "react-redux";
import {Select} from "@blueprintjs/select";

const fieldTypeOptions = [
  {
    value: 'string',
    label: 'String'
  },
  {
    value: 'integer',
    label: 'integer'
  },
  {
    value: 'bigInteger',
    label: 'Big Integer'
  },
  {
    value: 'float',
    label: 'Float'
  },
  {
    value: 'boolean',
    label: 'Boolean'
  },
  {
    value: 'text',
    label: 'Text'
  },
  {
    value: 'longText',
    label: 'Long Text'
  },
  {
    value: 'calculated',
    label: 'Calculated'
  },
  {
    value: 'date',
    label: 'Date'
  },
  {
    value: 'time',
    label: 'Time'
  },
  {
    value: 'year',
    label: 'Year'
  },
  {
    value: 'dateTime',
    label: 'Datetime'
  },
  {
    value: 'geometry',
    label: 'Geometry'
  },
  {
    value: 'json',
    label: 'JSON'
  },
  {
    value: 'binary',
    label: 'Binary'
  },
  {
    value: 'point',
    label: 'Point'
  },
];

// const fieldTypeOptions = [
//   'String',
//   'Integer',
//   'Big Integer',
//   'Float',
//   'Boolean',
//   'Text',
//   'Long Text',
//   'Calculated',
//   'Date',
//   'Time',
//   'Year',
//   'Datetime',
//   'Geometry',
//   'JSON',
//   'Binary'
// ]

const attributeOptions = [
  {
    value: '',
    label: 'none'
  },
  {
    value: 'unsigned',
    label: 'UNSIGNED'
  }
];
const inputTipeOptions = ['textarea', 'text', 'number', 'slider', 'WYSIWYG', 'color', 'select', 'checkbox', 'radio button'];


class AddFieldFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlways: false,
      fieldsOptions: [],
      ShowAdvancedSettings: false,
      value: {
        name: '',
        title: '',
        description: '',
        is_label: false,
        is_title: false,
        is_auth: false,
        type: 'string',
        length_value: '',
        default: '',
        attribute: '',
        input_type: 'text',
        options: '',
        null: true,
        indexed: false,
        editable: true,
        calculation: '',
        calculation_logic: [
          {left: '', operator: '', result: '', right: ''}
        ],
      },
      // value: this.props.field || {},
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.itemChangeHandler = this.itemChangeHandler.bind(this);
    this.addItemHandler = this.addItemHandler.bind(this);
    this.deleteItemHandler = this.deleteItemHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);

    this.filedsResource = new Resource({route: `/admin/ajax/models/${this.props.modelId}/fields`});
    this.fieldsOptionsResource = new Resource({
      route: `/admin/ajax/models/${this.props.modelId}/field_options`
    });
  }

  /**
   * новый field в props
   * */
  // componentDidUpdate(prevProps){
  //   if(this.props !== prevProps){
  //     this.setState(state => {
  //       state = { ...state };
  //       state.value = {...this.props.field};
  //       return state
  //     });
  //   }
  // }
  /**
   * Изменение данны с валидацией
   * @param {string} value
   * @param {string} field
   */

  changeValue(value, field) {
    this.setState(state => {
      state = {...state};
      if (field === 'default') {

        if (state.value.size && value.length > state.value.size) {
          value = value.substring(0, parseInt(state.value.size))
        }
        switch (state.value.type) {
          case 'boolean': {
            if (value === '') {
              value = null;
            } else if (value != '0' && value != '1') {
              value = 1;
            }
          }
            break;
          case 'bigInteger': {
            if (!isNaN(value) && value !== '0') {
              value = parseInt(value);
            } else if (value === '') {
              value = null;
            } else {
              value = '0';
            }
          }
            break;
          case 'integer': {
            if (!isNaN(value) && value !== '0') {
              value = parseInt(value);
            } else if (value === '') {
              value = null;
            } else {
              value = '0';
            }
          }
            break;
        }
      }
      if (value === "bigInteger") {
        state.value["attribute"] = "unsigned"
        state.value["null"] = true
      }
      state.value[field] = value;
      return state
    })
  }

  ItemPredicate(query, value) {

    if(!query) {
      return true
    }
    const index = _.findIndex(_.split(value.label, ""), char => {
      let similar = false;
      _.split(query, "").forEach(queryChar => {
        if(queryChar === char) {
          similar = true
        }
      });
      return similar
    });

    if(index !== -1) {
      return true
    } else {
      return false
    }
  }

  titleChangeHandler(e) {
    e.persist();
    this.setState(state => ({
      ...state, value: {
        ...state.value,
        title: e.target.value,
        name: this.props.modelReduxID ? state.value.name : titleToName(e.target.value)
      }
    }))
  }

  submitHandler(e) {
    e.preventDefault();

    const {
      name, title,
      unique,
      description, is_label, is_title, is_auth, type, size, default: default_, attribute, input_type,
      options, null: _null, indexed, editable, calculation, calculation_logic
    } = this.state.value;

    let data = {};

    if (type === "calculated") {
      this.state.isAlways ?
        data = {title, description, type, calculation, name,} :
        data = {title, description, type, calculation_logic, name,};
    } else {
      data = {
        name,
        title,
        description,
        is_label,
        is_title,
        is_auth,
        type,
        size,
        default: default_,
        attribute,
        input_type,
        null: _null,
        indexed,
        unique,
        editable
      };
      if (['select', 'checkbox', 'radio button'].includes(input_type)) {
        data = {...data, options};
      }
      if (['integer', 'bigInteger'].includes(type)) {
        data.default = default_;
      }
    }

    if (_.isFunction(this.props.onSubmit)) {
      const isNeedToCheckName = this.fieldName && this.fieldName !== data.name;
      this.props.onSubmit(data, isNeedToCheckName);
    }
  }

  addItemHandler() {
    this.setState(state => {
      state.value.calculation_logic
        .push({left: '', operator: '', result: '', right: ''});
      return state;
    })
  }

  deleteItemHandler(index) {
    this.setState(state => {
      state.value.calculation_logic.splice(index, 1);
      return state;
    })
  }

  itemChangeHandler({name, value}, index) {
    this.setState(state => {
      state.value.calculation_logic[index][name] = value;
      return state
    })
  }

  async componentDidMount() {
    let {options} = await this.fieldsOptionsResource.getAll();

    if (this.props.modelReduxID) {
      let value = await this.filedsResource.get(this.props.modelReduxID);
      this.fieldName = value.name;
      if (typeof value.calculation_logic === 'string') {
        value.calculation_logic = JSON.parse(value.calculation_logic);
      }
      this.setState(state => ({
        ...state,
        isAlways: value.calculation ? true : false,
        value: {...state.value, ...value}
      }));
    }
    this.setState(state => ({...state, fieldsOptions: options}));
  }

  handleValueChange = (value) => {
    this.setState({size: value});
  }

  toggleAdvancedSettings = () => {
    this.setState({
      ShowAdvancedSettings: !this.state.ShowAdvancedSettings
    })
  }

  render() {
    return <form className="admin-form field-form" onSubmit={this.submitHandler}>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="field-title" className="label__RobotoFont">Field Title</label>
          {/*<input type="text" id="field-title" required*/}
          {/*       value={this.state.value.title || ''}*/}
          {/*       onChange={this.titleChangeHandler}*/}
          {/*       className="form-control"/>*/}
          <InputGroup className="form-control-blueprint"
                      type="text"
                      value={this.state.value.title || ''}
                      onChange={this.titleChangeHandler}
          />
        </div>


        <div className="form-group form-group_width47">
          <label htmlFor="field-name" className="label__RobotoFont">Field Name</label>
          {/*<input type="text" id="field-name" required readOnly={null}*/}
          {/*       value={this.state.value.name || ''}*/}
          {/*       onChange={e => {*/}
          {/*         this.changeValue(e.target.value, 'name')*/}
          {/*       }}*/}
          {/*       className="form-control"/>*/}
          <InputGroup className="form-control-blueprint"
                      type="text"
                      value={this.state.value.name || ''}
                      onChange={e => {
                        this.changeValue(e.target.value, 'name')
                      }}
                      readOnly={this.props.modelReduxID}
          />
        </div>
      </div>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="field-description" className="label__RobotoFont">Field Description</label>
          {/*<input type="text" id="field-description"*/}
          {/*       value={this.state.value.description || ''}*/}
          {/*       onChange={e => {*/}
          {/*         this.changeValue(e.target.value, 'description')*/}
          {/*       }}*/}
          {/*       className="form-control"/>*/}
          <InputGroup className="form-control-blueprint"
                      type="text"
                      value={this.state.value.description || ''}
                      onChange={e => {
                        this.changeValue(e.target.value, 'description')
                      }}
          />
        </div>


        <div className="form-group form-group_width47">
          <label htmlFor="field-type" className="label__RobotoFont">Field Type</label>
          {/*<select id="field-type" required*/}
          {/*        value={this.state.value.type || ''}*/}
          {/*        onChange={e => {*/}
          {/*          this.changeValue(e.target.value, 'type')*/}
          {/*        }}*/}
          {/*        className="form-control"*/}
          {/*>*/}
          {/*  <option value=""/>*/}
          {/*  {fieldTypeOptions.map(item =>*/}
          {/*    <option key={item.value} value={item.value}>*/}
          {/*      {item.label}*/}
          {/*    </option>)}*/}
          {/*</select>*/}

          <Select items={fieldTypeOptions}
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
                  onItemSelect={current => {
                    this.changeValue(current.value, 'type')
                  }}
                  fill={true}
          >
            <Button fill
                    large
                    alignText={Alignment.LEFT}
                    text={fieldTypeOptions.find(item => ( item.value === this.state.value.type))?.label}
                    rightIcon="caret-down"
            />
          </Select>
        </div>
      </div>

      {this.state.value.type === 'calculated' ?
        <>
          <div className="form-group col-6 form-check-inline">
            <input type="checkbox" id="always"
                   className="form-check-input"
                   checked={this.state.isAlways}
                   onChange={e => this.setState({isAlways: e.target.checked})}
            />
            <label htmlFor="always" className="label_checkbox label__RobotoFont">Always</label>
          </div>

          {this.state.isAlways ?
            <>
              <div className="form-group">
                <label htmlFor="calculation" className="label__RobotoFont">Calculation</label>
                <input type="text" className="form-control" id="calculation"
                       value={this.state.value.calculation}
                       onChange={e => {
                         this.changeValue(e.target.value, 'calculation')
                       }}
                />
              </div>
              <p>E.g. [field_name]*[field_name] + 10</p>
            </> :
            <>
              {this.state.value.calculation_logic.map((item, index) => <React.Fragment key={index}>
                {index !== 0 && <hr/>}
                <FieldCalculationLogic
                  item={item}
                  index={index}
                  fieldsOptions={this.state.fieldsOptions}
                  key={index + 'logic'}
                  changeHandler={item => this.itemChangeHandler(item, index)}
                  deleteItemHandler={() => this.deleteItemHandler(index)}
                />
              </React.Fragment>)}
              <button className="btn" type="button" onClick={this.addItemHandler}>
                + Calculated Logic
              </button>
            </>}
        </> :
        <>
          <div className="checkbox-group-field checkbox-group-field_noWidth">
            <div className="checkbox-group-field">
              <div className="form-group-field">
                <input type="checkbox" id="field-is_label"
                       checked={this.state.value.is_label}
                       onChange={e => {
                         this.changeValue(e.target.checked, 'is_label')
                       }}
                />
                <label className="checkbox-label-field label__RobotoFont" htmlFor="field-is_label">As Label</label>
              </div>
              <div className="form-group-field">
                <input type="checkbox" id="field-is_title"
                       checked={this.state.value.is_title}
                       onChange={e => {
                         this.changeValue(e.target.checked, 'is_title')
                       }}
                />
                <label className="checkbox-label-field label__RobotoFont" htmlFor="field-is_title">As Title</label>
              </div>
              <div className="form-group-field">
                <input type="checkbox" id="field-nullable"
                       checked={this.state.value.unique}
                       onChange={e => {
                         this.changeValue(e.target.checked, 'unique')
                       }}
                       disabled={this.uniqueDisabled()}
                />
                <label className="checkbox-label-field label__RobotoFont" htmlFor="field-nullable">Unique</label>
              </div>
              {/*<div className="form-group-field">*/}
              {/*  <input type="checkbox" id="field-nullable"*/}
              {/*         checked={this.state.value.null}*/}
              {/*         onChange={e => {*/}
              {/*           this.changeValue(e.target.checked, 'null')*/}
              {/*         }}*/}
              {/*         disabled={this.state.value.type === 'bigInteger'}*/}
              {/*  />*/}
              {/*  <label className="checkbox-label-field label__RobotoFont" htmlFor="field-nullable">Nullable</label>*/}
              {/*</div>*/}
            </div>
            <span className="showMore" onClick={this.toggleAdvancedSettings}>
              {this.state.ShowAdvancedSettings ? 'Hide advanced settings' : 'Show advanced settings'}
            </span>
          </div>

          {
            this.state.ShowAdvancedSettings && (
              <div className="showMore__wrapper">

                <div className="form-group__inline-wrapper">
                  <div className="form-group form-group_width47">
                    <label htmlFor="field-length_value" className="label__RobotoFont">Length/Value</label>
                    {/*<input type="number" id="field-length_value"*/}
                    {/*       value={this.state.value.size || ''}*/}
                    {/*       onChange={e => {*/}
                    {/*         this.changeValue(e.target.value, 'size')*/}
                    {/*       }}*/}
                    {/*       className="form-control"/>*/}
                    <NumericInput
                      className="form-control-blueprint"
                      fill={true}
                      value={this.state.value.size || ''}
                      onValueChange={valueAsNumber => {
                        this.changeValue(valueAsNumber, 'size')
                      }}
                    />
                  </div>
                  <div className="form-group form-group_width47">
                    <label htmlFor="field-default" className="label__RobotoFont">Default</label>
                    {/*<input type="text" id="field-default"*/}
                    {/*       value={this.state.value.default || ''}*/}
                    {/*       onChange={e => {*/}
                    {/*         this.changeValue(e.target.value, 'default')*/}
                    {/*       }}*/}
                    {/*       className="form-control"/>*/}
                    <InputGroup className="form-control-blueprint"
                                type="text"
                                value={this.state.value.default || ''}
                                onChange={e => {
                                  this.changeValue(e.target.value, 'default')
                                }}
                    />
                  </div>
                </div>

                <div className="form-group__inline-wrapper">
                  <div className="form-group form-group_width47">
                    <label htmlFor="field-attribute" className="label__RobotoFont">Attribute</label>
                    {/*<select id="field-attribute"*/}
                    {/*        value={this.state.value.attribute || ''}*/}
                    {/*        onChange={e => {*/}
                    {/*          this.changeValue(e.target.value, 'attribute')*/}
                    {/*        }}*/}
                    {/*        className="form-control"*/}
                    {/*>*/}
                    {/*  <option value=""/>*/}
                    {/*  {attributeOptions.map(item =>*/}
                    {/*    <option key={item.value} value={item.value}>*/}
                    {/*      {item.label}*/}
                    {/*    </option>)}*/}
                    {/*</select>*/}


                    <Select items={attributeOptions}
                            matchTargetWidth
                            itemPredicate={this.ItemPredicate}
                            noResults={<MenuItem disabled={true} text="No results." />}
                            itemRenderer={(item, {handleClick, modifiers, query}) => {
                              return <MenuItem
                                text={item.label}
                                key={item.value}
                                active={item.value === this.state.value.attribute }
                                onClick={handleClick}
                              />
                            }}
                            onItemSelect={current => {
                              this.changeValue(current.value, 'attribute')
                            }}
                            fill={true}
                    >
                      <Button fill
                              large
                              alignText={Alignment.LEFT}
                              text={attributeOptions.find(item => ( item.value === this.state.value.attribute ))?.label || 'none'}
                              rightIcon="caret-down"
                      />
                    </Select>
                  </div>

                  <div className="form-group form-group_width47">
                    <label htmlFor="field-input_type" className="label__RobotoFont">Input Type</label>
                    {/*<select id="field-input_type" required*/}
                    {/*        value={this.state.value.input_type || ''}*/}
                    {/*        onChange={e => {*/}
                    {/*          this.changeValue(e.target.value, 'input_type')*/}
                    {/*        }}*/}
                    {/*        className="form-control"*/}
                    {/*>*/}
                    {/*  <option disabled value=""/>*/}
                    {/*  {inputTipeOptions.map(item =>*/}
                    {/*    <option key={item} value={item}>*/}
                    {/*      {item}*/}
                    {/*    </option>)}*/}
                    {/*</select>*/}


                    <Select items={inputTipeOptions}
                            matchTargetWidth
                            itemPredicate={this.ItemPredicate}
                            noResults={<MenuItem disabled={true} text="No results." />}
                            itemRenderer={(item, {handleClick, modifiers, query}) => {
                              return <MenuItem
                                text={item}
                                key={item}
                                active={item === this.state.value.input_type }
                                onClick={handleClick}
                              />
                            }}
                            onItemSelect={current => {
                              this.changeValue(current, 'input_type')
                            }}
                            fill={true}
                    >
                      <Button fill large alignText={Alignment.LEFT} text={this.state.value.input_type} rightIcon="caret-down"/>
                    </Select>
                  </div>
                </div>

                {['select', 'checkbox', 'radio button'].includes(this.state.value.input_type) && <>
                  <div className="form-group form-control-blueprint resize-textarea">
                    <label htmlFor="field-options" className="label__RobotoFont">Options</label>
                    {/*<textarea id="field-options"*/}
                    {/*          value={this.state.value.options || ''}*/}
                    {/*          onChange={e => {*/}
                    {/*            this.changeValue(e.target.value, 'options')*/}
                    {/*          }}*/}
                    {/*          className="form-control"*/}
                    {/*/>*/}

                    <TextArea  id="field-options"
                               className="textarea-blueprint"
                               value={this.state.value.options || ''}
                               onChange={e => {
                                 this.changeValue(e.target.value, 'options')
                               }}
                               fill
                               large
                    />
                  </div>
                  <p className="p__RobotoFont">Enter each choice on a new line.</p>
                  <p className="p__RobotoFont">Fro more control, you may specify both a value and label like this:</p>
                  <p className="p__RobotoFont">red | Red</p>
                </>}

                <div className="checkbox-group-field">
                  <div className="form-group-field">
                    <input type="checkbox" id="field-is_auth"
                           checked={this.state.value.is_auth}
                           onChange={e => {
                             this.changeValue(e.target.checked, 'is_auth')
                           }}
                    />
                    <label className="checkbox-label-field label__RobotoFont" htmlFor="field-is_auth">Set Auth</label>
                  </div>
                  <div className="form-group-field">
                    <input type="checkbox" id="field-indexed"
                           checked={this.state.value.indexed}
                           onChange={e => {
                             this.changeValue(e.target.checked, 'indexed')
                           }}
                    />
                    <label className="checkbox-label-field label__RobotoFont" htmlFor="field-indexed">Indexed</label>
                  </div>
                  <div className="form-group-field">
                    <input type="checkbox" id="field-editable"
                           checked={this.state.value.editable}
                           onChange={e => {
                             this.changeValue(e.target.checked, 'editable')
                           }}
                    />
                    <label className="checkbox-label-field label__RobotoFont" htmlFor="field-editable">Editable</label>
                  </div>
                </div>

              </div>
            )
          }
        </>
      }
      <div className="btn__wrapper btn_add">
        <button className="btn btn_success" type="submit">Add</button>
        {/*<button className="btn" onClick={this.props.toggleModal}>Cancel</button>*/}
        {/* TODO: отображать кнопку если в форме редактируются данные
          повесить обработчик удаления
        <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }

  uniqueDisabled() {
    return ['text', 'longText', 'calculated', 'json', 'binary',].includes(this.state.value.type)
  }
}

const mapStateToProps = (state) => {
  return {
    modelReduxID: state.modelsState.modelID
  }
}

AddFieldFormModal = connect(mapStateToProps)(AddFieldFormModal)

export default AddFieldFormModal;
