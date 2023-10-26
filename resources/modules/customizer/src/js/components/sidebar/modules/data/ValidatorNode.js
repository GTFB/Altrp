import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../../store/store";
import {setUpdatedNode} from "../../../../store/customizer-settings/actions";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";

import {MultiSelect} from "@blueprintjs/select";
import {MenuItem, Button} from "@blueprintjs/core";
import Resource from "../../../../../../../editor/src/js/classes/Resource";
import ValidatorPropSettings from "../../../other/ValidatorPropSettings";
const popoverProps = {
  fill: true,
  popoverClassName: 'customizer-multiselect-popover'
}
class ValidatorNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }

  async componentDidMount() {
    const options = await (new Resource({route: '/admin/ajax/fields_options'})).getQueried({
      value: 'name',
    })

    this.setState(state=>({...state, options: options?.data || []}))
  }

  changeByPath = (e, path) => {
    let node = this.getNode();
    node = mutate.set(node, `data.${path}`, e)
    store.dispatch(setUpdatedNode(node));
  }
  getNode() {
    let node = this.props.customizerSettingsData?.find(n => {
      return this.props.selectNode?.id == n.id
    });
    return node;
  }

  onItemSelect = (value)=>{
    const node = this.getNode();

    let selectedItems = [...node?.data?.selectedItems || []];
    let settings = {...node?.data?.settings || {}}
    selectedItems = [...selectedItems]
    if(!selectedItems.includes(value.value)){
      selectedItems.push(value.value)
      settings[value.value] = {}
    }
    this.changeByPath(selectedItems, 'selectedItems')
    this.changeByPath(settings, 'settings')

  }
  handleClear=()=>{
    this.changeByPath({}, 'settings')
    this.changeByPath([], 'selectedItems')
  }
  /**
   *
   * @param item1
   * @param item2
   * @returns {boolean}
   */
  itemsEqual(item1, item2) {
    return item1?.value === item2?.value
  }

  createNewItemFromQuery = (title) => {
    return {label: title, value: title};
  }
  handleTagRemove = (tag)=>{
    const node = this.getNode();

    let selectedItems = node?.data?.selectedItems || [];
    let settings = node?.data?.settings || {};
    settings = {
      ...settings
    }
    delete settings[tag]
    selectedItems = selectedItems.filter(i=>i !== tag)
    this.changeByPath(selectedItems, 'selectedItems')
    this.changeByPath(settings, 'settings')

  }
  createNewItemRenderer = (query, active, handleClick) => {


    let text = `Add Param ${query}`
    return (
      <MenuItem
        icon="add"
        text={text}
        onClick={handleClick}
        shouldDismissPopover={false}
      />)
  }
  tagRender(value) {
    return value.label || ''
  }

  // handleClick=e=>{
  //   console.log(e);
  // }
  render() {
    const node = this.getNode();
    let {options = []} = this.state

    let _selectedItems = node?.data?.selectedItems || [];
    let {
      path = '',
      settings = {}
    } = node.data
    options = options.filter(o=>{
      return !_selectedItems.includes(o.value)
    })
    const selectedItems = _selectedItems.map(i=>({
      value: i,
      label: i
    }))

    return (
      <div>
        <div className="settings-section open">
          <div className="settings-section__title d-flex">
            <div className="settings-section__icon d-flex">
              <Chevron/>
            </div>
            <div className="settings-section__label">Settings Validator</div>
          </div>

          <div className="controllers-wrapper">

            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">
                Path to Save
              </div>
              <div className="bp3-control-group bp3-numeric-input">
                <div className="bp3-input-group">
                  <input type="text"
                         id="mapper-source"
                         onChange={(e)=>{
                           this.changeByPath(e.target.value, 'path');
                         }}
                         className="bp3-input"
                         value={path}/>
                </div>

              </div>
            </div>
            <div className="controller-container controller-container_select controller-container_validator-params">
              <div className="settings-section__label QueryBuilderNode__label">Validating Params:</div>

              <MultiSelect
                placeholder={`Select or Add Params`}
                //onQueryChange={this.onQueryChange}
                itemsEqual={this.itemsEqual}
                //resetOnSelect={reset_input}
                //openOnKeyDown={openPopoverKeyDown}
                popoverProps={popoverProps}
                createNewItemFromQuery={ this.createNewItemFromQuery }
                createNewItemRenderer={this.createNewItemRenderer}
                itemRenderer={(item, {handleClick, modifiers, query,index}) => {
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

            {_selectedItems.map(i=>{
              return <ValidatorPropSettings
                key={i}
                propName={i}
                changeByPath={(value, path)=>{
                  this.changeByPath(value, `settings.${i}.${path}`)
                }}
                settings={settings[i] || {}}/>
            })}
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {customizerSettingsData: state.customizerSettingsData}
}

export default connect(mapStateToProps)(ValidatorNode)
