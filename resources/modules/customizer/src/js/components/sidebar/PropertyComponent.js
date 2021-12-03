import React, {Component} from "react";
import {Alignment, Button, ControlGroup, HTMLSelect, InputGroup, MenuItem, TextArea} from "@blueprintjs/core";
import PROPERTY_OPTIONS from "../../const/PROPERTY_OPTIONS";
import VALUES_OPTIONS from "../../const/VALUES_OPTIONS";
import {Select} from "@blueprintjs/select";
import METHODS_OPTIONS from "../../const/METHODS_OPTIONS";
import MethodEditComponent from "./MethodEditComponent";
import altrpRandomId from "../../../../../front-app/src/js/helpers/functions/altrp-random-id";
import SESSION_OPTIONS from "../../const/methods-options/SESSION_OPTIONS";

class PropertyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  onChange = (e) => {
    if (this.props.changeByPath && this.props.path) {
      this.props.changeByPath(e, `${this.props.path}.path`)
    } else if (this.props.onChange) {
      this.props.onChange(e)
    }
  }
  onTextareaChange = (e) => {
    if (this.props.changeByPath && this.props.path) {
      this.props.changeByPath(e, `${this.props.path}.expression`)
    } else if (this.props.onChange) {
      this.props.onChange(e)
    }
  }
  onSelect = (e) => {
    if (this.props.changeByPath && this.props.path) {
      this.props.changeByPath(e, `${this.props.path}.namespace`)


      this.props.changeByPath('', `${this.props.path}.method`)
      const newParameters = [];
      this.props.changeByPath(newParameters, `${this.props.path}.methodSettings.parameters`)
    } else if (this.props.onSelect) {
      this.props.onSelect(e)
    }
  }
  /**
   * При изменении метода нужно передеать массив из пустых параметров для их настройки в MethodEditComponent
   * @param v
   */
  onItemSelect = (v) => {
    if (this.props.changeByPath && this.props.path) {
      this.props.changeByPath(v.value, `${this.props.path}.method`)
      const newParameters = [];
      v?.parameters?.forEach(() => {
        newParameters.push({
          id: altrpRandomId()
        })
      })
      this.props.changeByPath(newParameters, `${this.props.path}.methodSettings.parameters`)
    } else if (this.props.onItemSelect) {
      this.props.onItemSelect(v.value)
    }
  }

  itemRenderer = (item, {handleClick, modifiers}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const {method} = this.props.property;
    return <MenuItem
      text={item.label}
      active={item.value === method}
      onClick={handleClick}
      label={item.objectInstance || ''}
      key={item.value}/>
  }
  onQueryChange= (s)=>{
    console.log(s);
  }

  render() {
    let options = [];

    const {namespace, path, method, expression} = this.props.property;
    const {type, withoutMethods} = this.props;
    switch (type) {
      case 'value': {
        options = VALUES_OPTIONS
      }
        break
      default: {
        options = PROPERTY_OPTIONS
      }
    }
    let showMethod = false;
    let methodOptions = METHODS_OPTIONS
    let {showMethodEdit} = this.state;
    if (namespace === 'context'
      || namespace === 'this'
      || ! namespace
    ) {
      showMethod = true;
    }
    if(namespace === 'session' && ! path) {
      showMethod = true;
      methodOptions = SESSION_OPTIONS;
    }
    let buttonText = 'None'
    const currentMethod = METHODS_OPTIONS.find(o => o.value == method);
    if (currentMethod?.objectInstance) {
      buttonText = `${currentMethod?.objectInstance}::${currentMethod?.label || ''}`
    }

    return <>
      <ControlGroup>
        <HTMLSelect options={options} onChange={this.onSelect} value={namespace || ''}/>
        {namespace !== 'expression' &&
        <InputGroup fill={true}
                    placeholder="property"
                    onChange={this.onChange}
                    value={path || ''}/>}
        {namespace === 'expression' &&
        <TextArea fill={true}
                  placeholder="php expression"
                  height={7}
                  onChange={this.onTextareaChange}
                  value={expression || ''}/>}
      </ControlGroup>
      {!withoutMethods && showMethod && <ControlGroup fill={true}>
        <Select items={methodOptions}
                onItemSelect={this.onItemSelect}
                onQueryChange={this.onQueryChange}
                matchTargetWidth={true}
                fill={true}
                popoverProps={{
                  minimal: true,
                  fill: true,
                }}
                itemRenderer={this.itemRenderer}
        >
          <Button
            fill={true}
            alignText={Alignment.LEFT}
            text={buttonText}
          />
        </Select>
        <Button
          disabled={!method}
          text={'Edit'}
          onClick={this.methodEditToggle}
        />
      </ControlGroup>}
      {!withoutMethods && method && currentMethod && <MethodEditComponent
        methodSettings={this.props.property?.methodSettings || {}}
        show={showMethod && showMethodEdit}
        method={currentMethod}
        methodEditToggle={this.methodEditToggle}
        changeByPath={this.props.changeByPath}
        path={`${this.props.path}.methodSettings`}/>}
    </>;
  }

  methodEditToggle = (e) => {
    e.preventDefault();
    this.setState(state => ({...state, showMethodEdit: !this.state.showMethodEdit}));
  }
}

export default PropertyComponent
