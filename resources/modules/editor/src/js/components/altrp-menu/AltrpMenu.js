import React, {Component} from "react";
import HorizontalVeticalMenu from "./horizontalVertical/HorizontalVeticalMenu";
import DropdownMenu from "./DropdownMenu";

import "./altrp-menu.scss";

class AltrpMenu extends Component {

  render() {
    let content = <div>create menu</div>;
    let settings = this.props.element.getSettings();

    if(settings.repeater_menu_layout) {
      content = settings.menu_layout !== "dropdown" ?
        <HorizontalVeticalMenu settings={settings} idElement={this.props.element.getId()}/>
        :
        <DropdownMenu settings={settings} idElement={this.props.element.getId()}/>
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
