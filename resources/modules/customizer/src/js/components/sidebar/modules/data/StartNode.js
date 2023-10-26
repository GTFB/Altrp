import {MultiSelect} from "@blueprintjs/select";
import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../../store/store";
import {setUpdatedNode} from "../../../../store/customizer-settings/actions";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";
import ControllerContainer from "../../other/ControllerContainer";
import {Button, MenuItem, Switch} from "@blueprintjs/core";

class StartNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  changeByPath = (e, path) => {

    let node = this.getNode();
    let value = _.isString(e?.target?.value) ? e.target.value : e;

    if(path === "static_method" || path === "async_method") {
      const nodeValue = mutate.get(node, `data.${path}`)

      value = !nodeValue
    }

    node = mutate.set(node, `data.${path}`, value)

    store.dispatch(setUpdatedNode(node));
  }

  getNode(){
    let node =  this.props.customizerSettingsData?.find(n=>{
      return this.props.selectNode?.id == n.id
    });
    return node;
  }

  itemsEqual(item1, item2) {
    return item1?.value === item2?.value
  }

  render() {
    const node = this.getNode();
    const {request_type, static_method, async_method} = node?.data;
    const customizerType = this.props.customizer?.type;

    let _methodParams = node?.data?.methodParams || [];

    const methodParams = _methodParams.map(i=>({
      value: i,
      label: i
    }))
    const requestTypeOptions = [
      {
        value: 'get',
        label: 'Get',
      },
      {
        value: 'post',
        label: 'Post',
      },
      {
        value: 'put',
        label: 'Put',
      },
      {
        value: 'delete',
        label: 'Delete',
      },
    ];
    return (
      <div>

        <div className="settings-section open">
          <div className="settings-section__title d-flex">
            <div className="settings-section__icon d-flex">
              <Chevron/>
            </div>
            <div className="settings-section__label">Settings Start</div>
          </div>

          <div className="controllers-wrapper">
            {
              customizerType === "method" && (
                <>
                  <ControllerContainer label="Static">
                    <Switch
                      checked={static_method || false}
                      onChange={(e) => this.changeByPath(e, "static_method")}
                    />
                  </ControllerContainer>
                  <ControllerContainer label="Async">
                    <Switch
                      checked={async_method || false}
                      onChange={(e) => this.changeByPath(e, "async_method")}
                    />
                  </ControllerContainer>
                </>
              )
            }
            {this.shouldShowRequestType() && <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">Request Type:</div>
              <div className="control-container_select-wrapper controller-field">
                <select className="control-select control-field"
                        value={request_type || ''}
                        onChange={e => {
                          this.changeByPath(e, "request_type")
                        }}
                >
                  {requestTypeOptions.map(option => {
                    return <option value={option.value} key={option.value || 'null'}>{option.label}</option>
                  })}
                </select>
              </div>
            </div>}
            {this.shouldShowMethodParams() &&
            <div className="controller-container controller-container_select controller-container_validator-params">
              <div className="settings-section__label QueryBuilderNode__label">Method Params:</div>

              <MultiSelect
                placeholder={`Select or Add Params`}
                itemsEqual={this.itemsEqual}
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
                  />
                }}
                itemPredicate={(query, item) => {
                  if (query === undefined || query.length === 0) {
                    return true
                  }
                  return `${item?.label?.toLowerCase() || ''}`.indexOf(query.toLowerCase()) >= 0;
                }}
                items={[]}
                noResults={<MenuItem disabled={true} text={'No results'}/>}
                onItemSelect={this.onItemSelect}
                selectedItems={methodParams}
                resetOnSelect={true}
                tagInputProps={{
                  onRemove: this.handleTagRemove,
                  rightElement: <Button icon="cross" minimal={true} className={` altrp-clear`} onClick={this.handleClear} />,
                }}
                tagRenderer={this.tagRender}
              >
              </MultiSelect>

            </div>}
          </div>
        </div>

      </div>
    );
  }

  onItemSelect = (value)=>{
    const node = this.getNode();

    let methodParams = [...node?.data?.methodParams || []];
    let settings = {...node?.data?.settings || {}}
    methodParams = [...methodParams]
    if(!methodParams.includes(value.value)){
      methodParams.push(value.value)
      settings[value.value] = {}
    }
    this.changeByPath(methodParams, 'methodParams')
    this.changeByPath(settings, 'settings')

  }
  shouldShowRequestType() {

    const customizerType = this.props.customizer?.type;

    return customizerType == 'api'
  }

  createNewItemFromQuery = (title) => {
    console.log(title)

    return {label: title, value: title};
  }
  shouldShowMethodParams() {

    const customizerType = this.props.customizer?.type;

    return customizerType == 'method'
  }
  handleTagRemove = (tag)=>{
    const node = this.getNode();

    let methodParams = node?.data?.methodParams || [];
    let settings = node?.data?.settings || {};
    settings = {
      ...settings
    }
    delete settings[tag]
    methodParams = methodParams.filter(i=>i !== tag)
    this.changeByPath(methodParams, 'methodParams')
    this.changeByPath(settings, 'settings')

  }
  createNewItemRenderer = (query, active, handleClick) => {
    const node = this.getNode();
    let methodParams = node?.data?.methodParams || [];

    if(methodParams.includes(query)){

      return (
        <MenuItem
          icon="disable"
          text={`Has been added`}
          shouldDismissPopover={false}
        />)
    }
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
}
function mapStateToProps(state){
  return {
    customizerSettingsData:state.customizerSettingsData
  }
}
export default connect(mapStateToProps)(StartNode)
const popoverProps = {
  fill: true,
  popoverClassName: 'customizer-multiselect-popover'
}
