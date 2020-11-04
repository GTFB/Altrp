import React, { Component, Suspense } from "react";

class AddItemButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={this.props.onAddItem}>Добавить виджет</button>
    );
  }
}

export default AddItemButton;