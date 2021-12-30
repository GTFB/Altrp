import React, {Component} from "react";
import PropertyComponent from "./PropertyComponent";
import {Button, MenuItem,} from "@blueprintjs/core";
import {Tooltip2} from "@blueprintjs/popover2";
import {Select} from "@blueprintjs/select";
import CHANGE_ACTION_OPTIONS from "../../const/CHANGE_ACTION_OPTIONS";

const COMPUTATIONAL_OPERATORS = [
  'addition',
  'subtraction',
  'multiplication',
  'division',
  'modulo division',
  'exponentiation'
]

class ChangeRepeater extends Component {

  render() {
    const {items} = this.props;
    return <div className="switcher-repeater">
      {items.map((item, idx) => {
        const { action} = item;
        const buttonText = CHANGE_ACTION_OPTIONS.find(o=>o.value === action)?.label || '';
        return <div className="switcher-repeater-item d-flex align-items-start"
                    key={item.id}>
          <Select
            items={CHANGE_ACTION_OPTIONS}
            popoverProps={{
              minimal:true,
            }}
            className="mr-1"
            filterable={false}
            onItemSelect={(v)=>{

              if(this.props.path && this.props.changeByPath){
                this.props.changeByPath(v.value, `${this.props.path}.${idx}.action`)
              }
              if (COMPUTATIONAL_OPERATORS.includes(v.value)) {
                this.addClick(v.value)
              }
            }}
            itemRenderer={(item, {handleClick, modifiers}) => {
              if (!modifiers.matchesPredicate) {
                return null;
              }
              return <MenuItem
                text={item.label}
                active={item.value === action}
                onClick={handleClick}
                label={item.objectInstance || ''}
                key={item.value}/>
            }}>
            <Button text={buttonText}/>
          </Select>
          <div className="changeNode-center">
            <PropertyComponent
              path={`${this.props.path}.${idx}.left`}
              changeByPath={this.props.changeByPath}
              withoutMethods={true}
              type="value"
              property={item?.left || {}}/>
            {action !== 'delete' && <PropertyComponent
              path={`${this.props.path}.${idx}.right`}
              changeByPath={this.props.changeByPath}
              type="value"
              property={item?.right || {}}/>}
          </div>
          <Tooltip2 content="Delete This Set Action">
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
      <Button icon="plus" onClick={() => this.addClick(false)}/>
    </div>
  }

  addClick = (value) => {
    if (this.props.addClick) {
      this.props.addClick(value)
    }
  }
}

export default ChangeRepeater
