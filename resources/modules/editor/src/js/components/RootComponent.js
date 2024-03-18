import React, { Component } from "react";
import isEditor from "../../../../front-app/src/js/functions/isEditor";

class RootComponent extends Component {
  constructor(props) {
    super(props);
    //console.error('u');

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

  async _componentDidMount() {
    let hiddenElementsTriggers = this.state.settings.hidden_elements_triggers;
    // if (hiddenElementsTriggers && _.isString(hiddenElementsTriggers)) {
    //   hiddenElementsTriggers = hiddenElementsTriggers
    //     .split(",")
    //     .map(item => item.trim());
    //   this.props.setDefaultTriggers(hiddenElementsTriggers);
    // }
    if(! isEditor() && this.props.element.getResponsiveSetting("page_load_actions", [])?.length){
      const actionsManager = (
        await import(
          /* webpackChunkName: 'ActionsManager' */"../../../../front-app/src/js/classes/modules/ActionsManager.js"
          )
      ).default;

      await actionsManager.callAllWidgetActions(
        this.props.element.getIdForAction(),
        'load',
        this.props.element.getResponsiveSetting("page_load_actions", []),
        this.props.element
      );
    }
  }

  render() {
    let classes = `sections-wrapper ${this.props.element
      .getSelector()
      .replace(".", "")} ${this.props.element.hasCardModel() ? 'sections-wrapper_card' : ''}`;
    let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
    return (
      <div className={classes} style={{position: 'relative'}}>
        {this.props.element.children.map(section => {
          return(
            <ElementWrapper
              ElementWrapper={ElementWrapper}
              rootElement={this.props.element}
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
