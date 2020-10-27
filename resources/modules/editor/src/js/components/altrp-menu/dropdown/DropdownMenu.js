import React, {Component} from 'react';
import {iconsManager} from "../../../helpers";
import {Link} from "react-router-dom";
import AltrpImage from "../../altrp-image/AltrpImage";
import AltrpLink from "../../altrp-link/AltrpLink";

class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.changeShow = this.changeShow.bind(this);
  }

  changeShow() {
    this.setState((state) => ({ show: !state.show }))
  }

  render() {
    let list = this.props.settings.repeater_menu_layout;

    let iconButton = (
      <AltrpImage
        image={this.props.settings.icon_dropdown_menu_layout}
        className="altrp-nav-menu-dropdown-button-icon"
      />
    );

    if(this.state.show && this.props.settings.active_icon_dropdown_menu_layout) {
      iconButton = (
        <AltrpImage
          image={this.props.settings.active_icon_dropdown_menu_layout}
          className="altrp-nav-menu-dropdown-button-icon altrp-nav-menu-dropdown-button-icon-close"
        />
      )
    }

    return (
      <div className="altrp-nav-menu-dropdown">
        <div className="altrp-nav-menu-dropdown-wrapper">
          <div className="altrp-nav-menu-dropdown-button" onClick={this.changeShow}>
            {
              iconButton
            }
          </div>
        </div>
        <div className={"altrp-nav-menu-ul-wrapper altrp-nav-menu-dropdown-content" + (!this.state.show ? "" : " altrp-nav-menu-dropdown-content-show")}>
          <ul className="altrp-nav-menu-ul">
            {
              list.map((li, idx) => {
                return <li className="altrp-nav-menu-li" key={idx}>
                  <AltrpLink link={li.link_repeater_menu_layout}  className="altrp-nav-menu-li-link">
                    <span className="altrp-nav-menu-li-link-label">
                      {
                        li.label_repeater_menu_layout
                      }
                    </span>
                  </AltrpLink>
                </li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default DropdownMenu;
