import React, { Component,  } from "react";

class RootComponent extends Component {
  constructor(props) {
    super(props);
    let {element, elementId, baseRender} = props;
    if(! element && elementId && window.altrpElements[elementId || '']){
      element = window.altrpElements[elementId || ''];
    }
    this.state = {
      settings: element?.getSettings() || {},
    };
    element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(baseRender){
      this.render = baseRender(this);
    }
    this.element = element;
  }

  async _componentDidMount() {
    let hiddenElementsTriggers = this.state.settings.hidden_elements_triggers;
    // if (hiddenElementsTriggers && _.isString(hiddenElementsTriggers)) {
    //   hiddenElementsTriggers = hiddenElementsTriggers
    //     .split(",")
    //     .map(item => item.trim());
    //   this.props.setDefaultTriggers(hiddenElementsTriggers);
    // }

    const actionsManager = (
        await import(
            "../../../../front-app/src/js/classes/modules/ActionsManager.js"
            )
    ).default;
    await actionsManager.callAllWidgetActions(
        this.element.getIdForAction(),
        'load',
        this.element.getResponsiveSetting("page_load_actions", []),
        this.element
    );
  }

  render() {
    let classes = `sections-wrapper ${this.element
      .getSelector()
      .replace(".", "")} ${this.element.hasCardModel() ? 'sections-wrapper_card' : ''}`;
    let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
    return (
      <div className={classes}>
        {this.element.children.map(section => {
          return(
            <ElementWrapper
              ElementWrapper={ElementWrapper}
              rootElement={this.element}
              key={section.getIdForAction()}
              component={section.componentClass}
              baseRender={this.props.baseRender}
              element={section}
            />
          )})
        }
      </div>
    );
  }
}

export default RootComponent;
(window.altrpComponents = window.altrpComponents || {})['RootComponent'] = RootComponent;
