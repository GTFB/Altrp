import React, { Component } from "react";
import FrontPopup from "./FrontPopup";

class AreaComponent extends Component {

  componentWillUnmount() {
    window.stylesModule.removeStyleById(this.rootElement.id);
  }

  render() {
    let classes = [`app-area`, `app-area_${this.props.id}`];
    /**
     * Если это попап
     */
    if (this.props.area.getTemplates().length) {
      return (
        <div className={classes.join(" ")}>
          {this.props.area.getTemplates().map(template => {
            return (
              <FrontPopup key={template.id} template={template} />
            )
          })}
        </div>
      );
    }
    /**
     * Если шаблон привязанный к странице удалили, то ничего не отрисовываем
     */
    if (!this.props.template.data) {
      return <div className={classes.join(" ")} />;
    }
    this.rootElement = window.frontElementsFabric.parseData(
      this.props.template.data,
      null,
      this.props.page,
      this.props.models
    );
    return (
      <div className={classes.join(" ")}>
        {React.createElement(this.rootElement.componentClass, {
          element: this.rootElement,
          children: this.rootElement.children
        })}
      </div>
    );
  }
}

export default AreaComponent;
