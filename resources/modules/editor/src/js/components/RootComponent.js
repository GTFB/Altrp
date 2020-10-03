import React, {Component} from "react";
import FrontElement from "../../../../front-app/src/js/classes/FrontElement";

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children,
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }


  render() {
    let classes = `sections-wrapper ${this.props.element
        .getSelector()
        .replace(".", "")}`;

    return (
        <div className={classes}>{this.props.element.getSettings('test-text-4')}
            {this.state.children.map(section => (
                <ElementWrapper
                    key={section.getId()}
                    component={section.componentClass}
                    element={section}
                />
            ))}
        </div>
    );
  }
}

export default RootComponent;
