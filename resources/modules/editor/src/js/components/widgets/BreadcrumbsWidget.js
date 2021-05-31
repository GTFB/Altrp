import React, { Component, Suspense } from "react";


class BreadcrumbsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      pending: false
    };

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
    this.onClick = this.onClick.bind(this);
  }


  render() {
    return null;
  }
}

export default BreadcrumbsWidget;
