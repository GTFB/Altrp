import React, {Component} from "react";
import PropertyComponent from "./PropertyComponent";
import {Button, MenuItem,} from "@blueprintjs/core";
import {Tooltip2} from "@blueprintjs/popover2";
import {Select} from "@blueprintjs/select";
import CONDITIONS_OPTIONS from "../../../../../front-app/src/js/constants/CONDITIONS_OPTIONS";

const SIMPLE_OPERATORS = [
  'false',
  'true',
  'empty',
  'not_empty',
  'null',
  'not_null',
  'else',
]
const OPTIONS = [
  {
    value: "true",
    label: "True"
  },
  {
    value: "false",
    label: "False"
  },
  ...CONDITIONS_OPTIONS,
]
class SwitcherRepeater extends Component {

  render() {
    const {items} = this.props;

    return <div className="switcher-repeater">
      {items.map((item, idx) => {
        const { operator} = item;
        const buttonText = OPTIONS.find(o=>o.value === operator)?.label || '';
        return <div className="switcher-repeater-item d-flex align-items-start"
                    key={item.id}>
          <Select
            items={OPTIONS}
            popoverProps={{
              minimal:true,
            }}
            className="mr-1"
            filterable={false}
            onItemSelect={(v)=>{

              if(this.props.path && this.props.changeByPath){
                this.props.changeByPath(v.value, `${this.props.path}.${idx}.operator`)
              }
            }}
            itemRenderer={(item, {handleClick, modifiers}) => {
              if (!modifiers.matchesPredicate) {
                return null;
              }
              return <MenuItem
                text={item.label}
                active={item.value === operator}
                onClick={handleClick}
                label={item.objectInstance || ''}
                key={item.value}/>
            }}>
            <Button text={buttonText}/>
          </Select>
          <div style={{flexGrow: 1}}>
            {SIMPLE_OPERATORS.indexOf(operator) === -1
            &&
            <PropertyComponent
              onSelect={v => {
                if (this.props.changeByPath && this.props.path) {
                  this.props.changeByPath(v, `${this.props.path}.${idx}.property`)
                }
              }}
              onChange={v => {
                if (this.props.changeByPath && this.props.path) {
                  this.props.changeByPath(v, `${this.props.path}.${idx}.path`)
                }
              }}
              path={`${this.props.path}.${idx}`}
              changeByPath={this.props.changeByPath}
              type="value"
              property={item}/>}
          </div>
          <Tooltip2 content="Delete This Condition">
            <Button icon='delete'
                    onClick={() => {
                      if (this.props.deleteById) {
                        this.props.deleteById(item.id)
                      }
                    }}
                    minimal={true}
                    className="ml-1"/>
          </Tooltip2>

        </div>
      })}
      <Button icon="plus" onClick={this.addClick}/>
    </div>
  }

  addClick = (e) => {
    if (this.props.addClick) {
      this.props.addClick(e)
    }
  }
}

export default SwitcherRepeater
