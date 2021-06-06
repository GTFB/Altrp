import React, { Component } from "react";
import AltrpMenu from "../altrp-menu/AltrpMenu";
import AltrpBreadcrumbs from "../altrp-breadcrumbs/AltrpBreadcrumbs";

class NavWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }

  render() {
    let content;
    let modelData = this.element.hasCardModel()
      ? this.element.getCardModel().getData()
      : this.props.currentModel.getData();

    switch (this.element.getContent("type_type", "menu")) {
      case "menu":
        content = <AltrpMenu modelData={modelData}
                             currentScreen={this.props.currentScreen}
                             modelId={this.getModelId()}
                             element={this.element}/>;
        break;
      case "breadCrumbs":
        content = <AltrpBreadcrumbs element={this.element} />;
        break
    }

    return content || '';
  }
}

export default NavWidget;
