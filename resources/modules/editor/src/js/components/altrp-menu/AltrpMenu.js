import React, {Component} from "react";
import HorizontalVeticalMenu from "./HorizontalVeticalMenu";
import DropdownMenu from "./DropdownMenu";

import "./altrp-menu.scss";

class AltrpMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    let content = <div>create menu</div>;

    if(this.props.settings.repeater_menu_layout) {
      content = this.props.settings.menu_layout !== "dropdown" ?
        <HorizontalVeticalMenu settings={this.props.settings}/>
        :
        <DropdownMenu settings={this.props.settings}/>
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
