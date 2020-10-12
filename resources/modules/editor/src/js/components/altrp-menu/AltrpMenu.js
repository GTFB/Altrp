import React, {Component} from "react";
import HorizontalVeticalMenu from "./HorizontalVeticalMenu";
import DropdownMenu from "./DropdownMenu";

import "./altrp-menu.scss";

class AltrpMenu extends Component {

  render() {
    let content = <div>create menu</div>;
    let settings = this.props.settings;

    if(settings.repeater_menu_layout) {
      content = settings.menu_layout !== "dropdown" ?
        <HorizontalVeticalMenu settings={settings}/>
        :
        <DropdownMenu settings={settings}/>
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
