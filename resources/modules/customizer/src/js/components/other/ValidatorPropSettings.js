import React, {Component} from "react";
import SCHEMA_TYPE_OPTIONS from "../../const/validator/SCHEMA_TYPE_OPTIONS";
import SCHEMA_RULES_OPTIONS from "../../const/validator/SCHEMA_RULES_OPTIONS";
import {MultiSelect} from "@blueprintjs/select";
import {Button, MenuItem} from "@blueprintjs/core";
import ValidatorRuleSettings from "./ValidatorRuleSettings";
import altrpRandomId from '../../../../../front-app/src/js/functions/altrpRandomId'
import SCHEMA_MARKS_OPTIONS from "../../const/validator/SCHEMA_MARKS_OPTIONS";
import SCHEMA_MARKS_OPTIONAL_OPTION from "../../const/validator/SCHEMA_MARKS_OPTIONAL_OPTION";

class ValidatorPropSettings extends Component {
  constructor(props) {
    super(props);

    this.popoverProps = {
      fill: true,
      popoverClassName: 'customizer-multiselect-popover'
    }
  }
  itemsEqual(item1, item2) {
    return item1?.value === item2?.value
  }
  handleTagRemove = (tag, idx)=>{
    let rules =  [...this.props.settings.rules || []]
    rules.splice(idx, 1)
    this.changeByPath(rules, 'rules')
  }
  handleClear = ()=>{
    this.changeByPath([], 'rules')
  }
  onItemSelect = (value)=>{
    let rules =  this.props.settings.rules || []
    let mark =  this.props.settings.mark || ''
    rules = [...rules]
    rules.push({
      name: value.value,
      label:value.label,
      id: altrpRandomId()})

    if(rules.find(r=>r.name === 'requiredIfExists') && (mark !== 'optional')){
      this.changeByPath('optional', 'mark')
    }
    this.changeByPath(rules, 'rules')

  }
  tagRender(value) {
    return value.label || ''
  }
  changeType = (e)=>{
    const type = e.target.value
    let {
      rules = [],
    } = this.props.settings
    rules = rules.filter(r=>{
      return SCHEMA_RULES_OPTIONS[type].find(o=>o.value === r.name)
    })

    this.changeByPath(type, 'type')
    this.changeByPath(rules, 'rules')

  }
  changeByPath=(value, path)=>{
    this.props.changeByPath(value, path)
  }
  render() {

    const {
      type = 'string',
      mark = '',
      required_message = '',
      rules = [],
    } = this.props.settings
    const {
      propName ,
    } = this.props

    const options = SCHEMA_RULES_OPTIONS[type]
    let selectedItems = rules.map(r=>{
      return SCHEMA_RULES_OPTIONS[type].find(o=>o.value === r.name)
    })
    selectedItems = selectedItems.filter(i=>i)
    let markOptions= SCHEMA_MARKS_OPTIONS
    if(rules.find(r=>r.name === 'requiredIfExists')){
      markOptions = [SCHEMA_MARKS_OPTIONAL_OPTION]
    }
    return(
      <div className="controllers-wrapper validator-prop-settings-wrapper">
        <div className="settings-section__label QueryBuilderNode__label">
          {propName}
        </div>
        <div className="controller-container controller-container_select">
          <div className="controller-container__label control-select__label controller-label">
            {propName} Mark as:
          </div>
          <div className="control-container_select-wrapper controller-field">
            <select className="control-select control-field"
                    value={mark || ''}
                    onChange={e => {
                      this.changeByPath(e.target.value, "mark")
                    }}
            >
              {markOptions.map(option => {
                return <option value={option.value} key={option.value}>{option.label}</option>
              })}
            </select>
          </div>
        </div>
        {! mark &&

          <div className="controller-container controller-container_select">
            <div className="controller-container__label control-select__label controller-label">
              Required Error Message
            </div>
            <div className="bp3-control-group bp3-numeric-input">
              <div className="bp3-input-group">
                <input type="text"
                       id="mapper-source"
                       onChange={(e)=>{
                         this.changeByPath(e.target.value, 'required_message');
                       }}
                       className="bp3-input"
                       value={required_message}/>
              </div>

            </div>
          </div>
        }
        <div className="controller-container controller-container_select">
          <div className="controller-container__label control-select__label controller-label">
            Expected Data Type for {propName}:
          </div>
          <div className="control-container_select-wrapper controller-field">
            <select className="control-select control-field"
                    value={type || ''}
                    onChange={this.changeType}
            >
              {SCHEMA_TYPE_OPTIONS.map(option => {
                return <option value={option.value} key={option.value}>{option.label}</option>
              })}
            </select>
          </div>
        </div>

        <div className="controller-container controller-container_select controller-container_validator-params">
            <div className="controller-container__label control-select__label controller-label">
              Rules:
            </div>

            <MultiSelect
              placeholder={`Select or Add Params`}
              //onQueryChange={this.onQueryChange}
              itemsEqual={this.itemsEqual}
              //resetOnSelect={reset_input}
              //openOnKeyDown={openPopoverKeyDown}
              popoverProps={this.popoverProps}
              //createNewItemFromQuery={ this.createNewItemFromQuery }
              //createNewItemRenderer={this.createNewItemRenderer}
              itemRenderer={(item, {handleClick, modifiers, query, index}) => {
                if (!modifiers.matchesPredicate) {
                  return null;
                }
                return <MenuItem
                  text={item.label}
                  key={index}
                  disabled={modifiers.disabled || item.disabled}
                  onClick={handleClick}
                  //className={`${classes}`}
                />
              }}
              itemPredicate={(query, item) => {
                if (query === undefined || query.length === 0) {
                  return true
                }
                return `${item?.label?.toLowerCase() || ''}`.indexOf(query.toLowerCase()) >= 0;
              }}
              items={options}
              // itemRenderer={({label})=>label}
              noResults={<MenuItem disabled={true} text={'No results'}/>}
              //name={this.getName()}
              onItemSelect={this.onItemSelect}
              selectedItems={selectedItems}
              tagInputProps={{
                onRemove: this.handleTagRemove,
                rightElement: <Button icon="cross" minimal={true} className={` altrp-clear`} onClick={this.handleClear} />,
                // tagProps: getTagProps,
              }}
              //id={position_css_id}
              tagRenderer={this.tagRender}
              //className={classes}
            >
            </MultiSelect>

          </div>

        {
          rules.map((r, idx)=>{
            return <ValidatorRuleSettings
              settings={r}
              key={r.id}
              changeByPath={(value, path)=>{
                this.changeByPath(value, `rules.${idx}.${path}`)
              }}
            />
          })
        }
      </div>
    )
  }
}

export default ValidatorPropSettings
