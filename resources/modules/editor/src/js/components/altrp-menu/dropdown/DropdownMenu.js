import React, {Component} from 'react';
import {iconsManager} from "../../../helpers";
import AltrpImage from "../../altrp-image/AltrpImage";
import AltrpLink from "../../altrp-link/AltrpLink";
import DropdownSub from "./DropdownSub";

class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      list: []
    };

    this.changeShow = this.changeShow.bind(this);
    this.setStateList = this.setStateList.bind(this);
  }

  changeShow() {
    this.setState((state) => ({ show: !state.show }))
  }

  componentDidMount() {
    this.setStateList();
  }

  componentDidUpdate(prevProps, prevState) {
    let propsRepeater = this.props.settings.repeater_menu_layout;

    if (prevState.list !== propsRepeater) {
      this.setStateList()
    }
  }

  setStateList() {
    let list = this.props.settings.repeater_menu_layout;
    list.forEach(liParent => {
      if(liParent.id_repeater_menu_layout) {
        let children = [];
        list.forEach(li => {
          if(liParent.id !== li.id) {
            if(li.parent_id_repeater_menu_layout) {
              if(li.parent_id_repeater_menu_layout === liParent.id_repeater_menu_layout) {
                list[li.id].childrenParent = true;
                children.push(li.id);
              }
            }
          }
        });
        if(list[liParent.id]) {
          list[liParent.id].children = children;
          if(liParent.id_repeater_menu_layout) {
          }
        }
      }
    });

    this.setState({ list });
  }

  render() {
    let list = this.state.list;

    let classes = "altrp-nav-menu-dropdown";

    switch (this.props.settings.align_dropdown_menu_layout) {
      case "left":
        classes += " altrp-nav-menu-dropdown-left";
        break;
      case "center":
        classes += " altrp-nav-menu-dropdown-center";
        break;
      case "right":
        classes += " altrp-nav-menu-dropdown-right";
        break;
      default:
    }

    let iconButton = (
      <AltrpImage
        image={this.props.settings.icon_dropdown_menu_layout}
        default={{
          name: "in_width",
          assetType: "icon",
          iconComponent: iconsManager().renderIcon("in_width")
        }}
        className="altrp-nav-menu-dropdown-button-icon"
      />
    );

    if(this.state.show && this.props.settings.active_icon_dropdown_menu_layout) {
      iconButton = (
        <AltrpImage
          image={this.props.settings.active_icon_dropdown_menu_layout}
          default={{
            name: "add",
            assetType: "icon",
            iconComponent: iconsManager().renderIcon("add")
          }}
          className="altrp-nav-menu-dropdown-button-icon altrp-nav-menu-dropdown-button-icon-close"
        />
      )
    }

    return (
      <div className={classes}>
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
                return (
                  !li.id_repeater_menu_layout ? (
                      !li.childrenParent ? (
                        <React.Fragment>
                          <li className="altrp-nav-menu-li" key={idx}>
                            <AltrpLink link={li.link_repeater_menu_layout} className="altrp-nav-menu-li-link altrp-nav-menu-li-link-label">
                              {
                                li.label_repeater_menu_layout
                              }
                            </AltrpLink>
                            {
                              this.props.settings.divider_switch_dropdown_menu_section ? <div className="altrp-nav-menu-dropdown-content-divider"/> : ""
                            }
                          </li>
                        </React.Fragment>
                      ) : ""
                    ) :
                    !li.childrenParent ? <li className="altrp-nav-menu-li altrp-nav-menu-li-sub" key={idx}>
                        <DropdownSub settings={this.props.settings} list={this.state.list} li={li}/>
                      </li>
                      : ""
                )})
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default DropdownMenu;
