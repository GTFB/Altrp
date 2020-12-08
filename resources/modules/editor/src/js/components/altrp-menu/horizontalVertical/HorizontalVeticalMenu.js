import React, {Component} from 'react';
import Dropdown from "./Dropdown";
import {isEditor, parseURLTemplate, renderAsset} from "../../../../../../front-app/src/js/helpers";
import AltrpLink from "../../altrp-link/AltrpLink";
import LinkMenu from "../LinkMenu";

class HorizontalVeticalMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: props.settings.repeater_menu_layout,
    };

    this.children = React.createRef();

    this.setStateList = this.setStateList.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
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
                children.push(li.id);
              }
            }
          }
        });
        if(list[liParent.id]) {
          list[liParent.id].children = children;
          if(liParent.id_repeater_menu_layout) {
            list[liParent.id].showDropdown = false;
          }
        }
      }
    });

    this.setState({ list });
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

  showDropdown(id) {
    this.setState(state => {
      let list = state.list;

      list[id].showDropdown = true;

      return {
        ...this.state,
        list
      }
    })
  }

  hideDropdown(id) {
    this.setState(state => {
      let list = state.list;
      list[id].showDropdown = false;
      return {
        ...this.state,
        list
      }
    })
  }

  render() {

    let layout = this.props.settings.menu_layout;
    let classesLi = "altrp-nav-menu-li";

    let stylesUl = {};
    let stylesLi = {};
    let stylesLink = {};

    function ifHorElseVer(horStyles, verStyles) {
      if (layout === "horizontal") {
        stylesUl = horStyles
      } else {
        stylesLink = verStyles
      }
    }
    switch (this.props.settings.hor_ver_align_menu_layout) {
      case "start":
        ifHorElseVer({ justifyContent: "flex-start" }, { justifyContent: "flex-start" });
        break;
      case "center":
        ifHorElseVer({ justifyContent: "center" }, { justifyContent: "center" });
        break;
      case "end":
        ifHorElseVer({ justifyContent: "flex-end" }, { justifyContent: "flex-end" });
        break;
      case "stretch":
        stylesLi = { flexGrow: 1 };
        break
    }

    let pointerVariant = this.props.settings.hor_ver_pointer_menu_layout;

    switch (pointerVariant) {
      case "none":
        break;
      case "overLine":
        classesLi += " altrp-nav-menu-li-before altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-overline altrp-nav-menu-li-pointer";
        break;
      case "underLine":
        classesLi += " altrp-nav-menu-li-after altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-underLine altrp-nav-menu-li-pointer";
        break;
      case "doubleLine":
        classesLi += " altrp-nav-menu-li-after altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-before altrp-nav-menu-li-doubleLine altrp-nav-menu-li-pointer";
        break;
      case "framed":
        classesLi += " altrp-nav-menu-li-after altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-framed altrp-nav-menu-li-before altrp-nav-menu-li-pointer";
        break;
      case "background":
        classesLi += " altrp-nav-menu-li-background altrp-nav-menu-li-pointer";
        break;
      case "text":
        classesLi += " altrp-nav-menu-li-animation-text altrp-nav-menu-li-pointer";
        break

    }

    let chevron = iconsManager.renderIcon('chevron');

    let chevronMedia = this.props.settings.chevron_media_main_menu_style;

    if(chevronMedia && Object.keys(chevronMedia).length !== 0) {
      chevron = renderAsset(chevronMedia);
    }

    return (
      <ul style={stylesUl} className={"altrp-nav-menu-ul altrp-nav-menu-ul-" + layout} ref={this.children}>
        {
          this.state.list.map((li, idx) => {
            const tag = li.link_repeater_menu_layout || "a";

            let link = <LinkMenu
              defaultChildren={(<div className="altrp-nav-menu-li-link"/>)}
              modelData={this.props.modelData}
              modelId={(tag === 'Link') && ! isEditor() ? this.props.modelId : null}
              link={li.link_repeater_menu_layout}
              className="altrp-nav-menu-li-link"
            >
              <div className="altrp-nav-menu-li-link-label">
                {li.label_repeater_menu_layout}
              </div>
              {
                li.id_repeater_menu_layout ? (
                  <div className="altrp-nav-menu-li-link-icon">
                    {
                      chevron
                    }
                  </div>
                ) : ""
              }
            </LinkMenu>;

            return (
              !li.parent_id_repeater_menu_layout ? (
                <li
                  style={stylesLi}
                  key={idx}
                  className={classesLi}
                  onMouseEnter={() => this.showDropdown(li.id)}
                  onMouseLeave={() => this.hideDropdown(li.id)}
                  data-key={li.id_repeater_menu_layout ? li.id_repeater_menu_layout : ""}
                >
                  <div className="altrp-nav-menu-li-link-wrapper">
                    {
                      link
                    }
                  </div>
                  {
                    li.id_repeater_menu_layout ? <Dropdown
                      modelId={this.props.modelId}
                      modelData={this.props.modelData}
                      settings={this.props.settings}
                      chevron={chevron}
                      idElement={this.props.idElement}
                      show={li.showDropdown}
                      id={li.id_repeater_menu_layout}
                      childrenRef={this.children}
                      children={li.children}
                      list={this.state.list}/> : ""
                  }
                </li>
              ) : ""
            )
          })
        }
      </ul>
    );
  }
}

export default HorizontalVeticalMenu;
