import React, {Component} from "react";
import {Button, ControlGroup, Label, MenuItem, Tag} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";
import PropertyComponent from "./PropertyComponent";

class MethodParamsComponent extends Component {


  itemRenderer = (item, {handleClick, modifiers}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const { method} = this.props.property;
    return <MenuItem
      text={item.label}
      active={item.value === method}
      onClick={handleClick}
      label={item.objectInstance || ''}
      key={item.value}/>
  }
  onItemSelect = (v) => {
    if (this.props.changeByPath && this.props.path) {
      this.props.changeByPath(v.value, `${this.props.path}.type`)
    } else if (this.props.onItemSelect) {
      this.props.onItemSelect(v.value)
    }
  }

  render() {
    const {
      types, name, required
    } =
      this.props.parameterSettings
    ;
    return <div className="rounded border border-light p-2 mb-2">
      <h5>Parameter: <code>{name}</code></h5>
      {required && (
        <div className="parameter__required">Parameter is Required</div>
      )}
      <PropertyComponent path={`${this.props.path}.value`}
                         type="value"
                         withoutMethods={true}
                         property={this.props.parameter?.value || {}}
                         changeByPath={this.props.changeByPath}/>
        Available Parameter Types:<br/>
        {types.map(t=>{
          return <Tag key={t.label} className="mr-1">{t.label}</Tag>
        })}
    </div>
  }
}

export default MethodParamsComponent
