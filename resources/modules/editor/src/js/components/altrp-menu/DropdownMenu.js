import React, {Component} from 'react';
import {iconsManager} from "../../helpers";
import {Link} from "react-router-dom";

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

    return (
      <div className="altrp-nav-menu-dropdown">
        <div className="altrp-nav-menu-dropdown-wrapper">
          <div className="altrp-nav-menu-dropdown-button" onClick={this.changeShow}>
            {
              iconsManager().renderIcon(!this.state.show ? "in_width" : "add", {
                className: "altrp-nav-menu-dropdown-button-icon" + (!this.state.show ? "" : " altrp-nav-menu-dropdown-button-icon-close")
              })
            }
          </div>
        </div>
        <div className={"altrp-nav-menu-ul-wrapper altrp-nav-menu-dropdown-content" + (!this.state.show ? "" : " altrp-nav-menu-dropdown-content-show")}>
          <ul className="altrp-nav-menu-ul">
            {
              list.map((li, idx) => {
                console.log(li);

                let url = "";
                if(li.link_repeater_menu_layout) {
                  url = li.link_repeater_menu_layout.url || ""
                };

                return <li className="altrp-nav-menu-li" key={idx}>
                  <Link to={url} className="altrp-nav-menu-li-link">
                    <span className="altrp-nav-menu-li-link-label">
                      {
                        li.label_repeater_menu_layout
                      }
                    </span>
                  </Link>
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
