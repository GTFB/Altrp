import React, {Component} from "react";
import './styles.scss';
import {Tab} from "react-tabs";
import cx from 'clsx';

class AdminTab extends Component {
  render(){
    const {
      children,
      className,
      disabled,
      disabledClassName,
      focus, // unused
      id,
      panelId,
      selected,
      selectedClassName,
      tabIndex,
      tabRef,
      ...attributes
    } = this.props;
    return <Tab {...attributes}
                className={cx(className, {
                  [selectedClassName]: selected,
                  [disabledClassName]: disabled,
                })}
                ref={(node) => {
                  this.node = node;
                  if (tabRef) tabRef(node);
                }}
                role="tab"
                id={id}
                aria-selected={selected ? 'true' : 'false'}
                aria-disabled={disabled ? 'true' : 'false'}
                aria-controls={panelId}
                tabIndex={tabIndex || (selected ? '0' : null)}/>
  }
}

export default AdminTab