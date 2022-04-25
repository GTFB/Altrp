import React from "react";

export default class ControllerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="controller-container controller-container_select">
      <div className="controller-container__label control-select__label controller-label">{ this.props.label }</div>
      <div className="control-container_select-wrapper controller-field">
        { this.props.children }
      </div>
    </div>
  }
}
