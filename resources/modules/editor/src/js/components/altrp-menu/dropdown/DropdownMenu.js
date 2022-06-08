import React, {Component} from 'react';
import AltrpImage from "../../altrp-image/AltrpImage";
import DropdownSub from "./DropdownSub";
import LinkMenu from "../LinkMenu";

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
                const indexInArray = list.findIndex(item => item.id == li.id);
                list[indexInArray] && (list[indexInArray].childrenParent = true);
                // list[li.id] && (list[li.id].childrenParent = true);
                children.push(li.id);
              }
            }
          }
        });
        const parentIdRepeater = liParent.id_repeater_menu_layout;
        const parentIndexInArray = list.findIndex(item => item.id_repeater_menu_layout == parentIdRepeater);
        if (list[parentIndexInArray]) {
          list[parentIndexInArray].children = children;
          // if(liParent.id_repeater_menu_layout) {
          // }
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
    const icon_dropdown_menu_layout = this.props.element?.getResponsiveSetting('icon_dropdown_menu_layout');
    const active_icon_dropdown_menu_layout = this.props.element?.getResponsiveSetting('icon_dropdown_menu_layout');
    let iconButton = (
      <AltrpImage
        image={icon_dropdown_menu_layout}
        element={this.props.element}
        default={{
          name: "in_width",
          assetType: "icon",
          iconComponent: iconsManager.renderIcon("in_width")
        }}
        className="altrp-nav-menu-dropdown-button-icon"
      />
    );

    if(this.state.show && active_icon_dropdown_menu_layout) {
      iconButton = (
        <AltrpImage
          image={active_icon_dropdown_menu_layout}
          element={this.props.element}
          default={{
            name: "add",
            assetType: "icon",
            iconComponent: iconsManager.renderIcon("add")
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
        <div className={"altrp-nav-menu-ul-wrapper-dropdown altrp-nav-menu-dropdown-content" + (!this.state.show ? "" : " altrp-nav-menu-dropdown-content-show")}>
          <ul className="altrp-nav-menu-ul-dropdown">
            {
              list.map((li, idx) => {
                let link = <LinkMenu
                  defaultChildren={(<div className="altrp-nav-menu-li-link-dropdown altrp-nav-menu-li-link-label-dropdown"/>)}
                  modelData={this.props.modelData}
                  modelId={this.props.modelId || null}
                  link={li.link_repeater_menu_layout}
                  className="altrp-nav-menu-li-link-dropdown altrp-nav-menu-li-link-label-dropdown"
                >
                  {
                    li.label_repeater_menu_layout
                  }
                </LinkMenu>;

                return (
                  !li.id_repeater_menu_layout ? (
                      !li?.childrenParent ? (
                        <li className="altrp-nav-menu-li-dropdown" key={idx}>
                          {
                            link
                          }
                          {
                            this.props.settings.divider_switch_dropdown_menu_section ? <div className="altrp-nav-menu-dropdown-s-content-divider"/> : ""
                          }
                        </li>
                      ) : ""
                    ) :
                    !li?.childrenParent ? <li className="altrp-nav-menu-li-dropdown altrp-nav-menu-li-sub" key={idx}>
                        <DropdownSub
                          settings={this.props.settings}
                          list={this.state.list}
                          li={li}
                          modelData={this.props.modelData}
                          modelId={this.props.modelId}
                        />
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
