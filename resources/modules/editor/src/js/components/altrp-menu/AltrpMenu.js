import React, {Component} from "react";
import DropdownMenu from "./dropdown/DropdownMenu";
import ("./altrp-menu.scss");
import isEditor from "../../../../../front-app/src/js/functions/isEditor";

class AltrpMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  async _componentDidMount(){
    const HorizontalVerticalMenu = (await import(/* webpackChunkName: 'HorizontalVerticalMenu' */"./horizontalVertical/HorizontalVerticalMenu")).default;
    this.setState(state => ({...state, HorizontalVerticalMenu}));
  }
  render() {
    let content = <div>{isEditor() ? 'create menu' : ''}</div>;
    let layout = this.state.settings.menu_layout;
    let currentBreakpoint = {};
    let breakpoint = this.state.settings.breakpoint_dropdown_menu_layout;

    switch (breakpoint) {
      case "never":
        currentBreakpoint = {
          type: "never",
          size: 0
        };
        break;
      case "mobile":
        currentBreakpoint = {
          type: "mobile",
          size: 768
        };
        break;
      case "tablet":
        currentBreakpoint = {
          type: "tablet",
          size: 1025
        };
        break;
      default:
    }

    if(breakpoint !== "never") {
      let bodyWidth = document.body.offsetWidth;

      if(isEditor()) {
        bodyWidth = document.getElementById("editorWindow").offsetWidth
      }

      if(bodyWidth <= currentBreakpoint.size) {
        layout = "dropdown"
      }
    }
    if(this.state.settings.repeater_menu_layout && this.state.HorizontalVerticalMenu) {
      content = layout !== "dropdown" ?
        <this.state.HorizontalVerticalMenu modelId={this.props.modelId}
                                currentScreen={this.props.currentScreen}
                                modelData={this.props.modelData}
                                settings={this.props.element.getSettings()}
                                element={this.props.element}
                                idElement={this.props.element.getId()}/>
        :
        <DropdownMenu modelId={this.props.modelId} modelData={this.props.modelData} settings={this.state.settings} idElement={this.props.element.getId()}/>
    }
    return (
      <div className="altrp-nav-menu">
        {
          content
        }
      </div>
    );
  }
}

export default AltrpMenu
