import React, {Component} from 'react';

class HorizontalVeticalMenu extends Component {
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
        classesLi += " altrp-nav-menu-li-before altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-overline";
        break;
      case "underLine":
        classesLi += " altrp-nav-menu-li-after altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-underLine";
        break;
      case "doubleLine":
        classesLi += " altrp-nav-menu-li-after altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-before altrp-nav-menu-li-doubleLine";
        break;
      case "framed":
        classesLi += " altrp-nav-menu-li-after altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-framed altrp-nav-menu-li-before";
        break;
      case "background":
        classesLi += " altrp-nav-menu-li-background";
        break;
      case "text":
        classesLi += " altrp-nav-menu-li-animation-text";
        break

    }

    console.log(this.props.settings.repeater_menu_layout);
    return (
      <ul style={stylesUl} className={"altrp-nav-menu-ul altrp-nav-menu-ul-" + layout}>
        {
          this.props.settings.repeater_menu_layout.map((li, idx) => {
            let url = li.link_repeater_menu_layout !== undefined ? li.link_repeater_menu_layout.url : "";

            return (
              <li style={stylesLi} key={idx} className={classesLi}>
                <a href={url} style={stylesLink} className="altrp-nav-menu-li-link">

                  <span className="altrp-nav-menu-li-link-label">
                    {li.label_repeater_menu_layout}
                  </span>
                </a>
              </li>
            )
          })
        }
      </ul>
    );
  }
}

export default HorizontalVeticalMenu;
