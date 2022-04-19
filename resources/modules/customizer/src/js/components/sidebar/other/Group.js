import React from "react";
import Chevron from "../../../../../../editor/src/svgs/chevron.svg";

export default class Group extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"settings-section " + (this.props.active ? '' : 'open')}>
        <div className="settings-section__title d-flex" onClick={this.props.onClick}>
          <div className="settings-section__icon d-flex">
            <Chevron />
          </div>
          <div className="settings-section__label">{this.props.label}</div>
        </div>
        <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
          {
            this.props.children
          }
        </div>
      </div>
    );
  }
}
