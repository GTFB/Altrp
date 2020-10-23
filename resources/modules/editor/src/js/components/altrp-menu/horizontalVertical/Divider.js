import React, {Component} from 'react';

class Divider extends Component {
  render() {
    let classes = "altrp-nav-menu-ul-dropdown-hor-ver-li-divider";

    return this.props.settings.switch_divider_dropdown_hor_ver_menu_section ? <hr className={classes}/> : ""
  }
}

export default Divider;
