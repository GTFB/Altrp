import renderAssetIcon from "../../../../../front-app/src/js/functions/renderAssetIcon";

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-list-ul {
    padding: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
  }

  .altrp-list-li {
    list-style: none;
    display: flex;
    position: relative;
    justify-items: center;
  }

  .altrp-list-ul-inline {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .altrp-list-ul-inline .altrp-list-label-content {
    margin-right: 10px;
  }

  .altrp-list-ul-inline .altrp-list-li:first-child .altrp-list-li-content {
    margin-left: 0 !important;
  }

  .altrp-list-ul-default .altrp-list-li:first-child .altrp-list-li-content {
    margin-top: 0 !important;
  }

  .altrp-list-ul-inline .altrp-list-li:last-child .altrp-list-li-content {
    margin-right: 0 !important;
  }

  .altrp-list-ul-default .altrp-list-li:last-child .altrp-list-li-content {
    margin-bottom: 0 !important;
  }

  .altrp-list-ul-default {
    flex-direction: column;
  }

  .altrp-list-icon svg {
    width: inherit;
    height: inherit;
  }

  .altrp-list-icon-top {
    margin-bottom: auto;
  }

  .altrp-list-icon-center {
    margin-bottom: auto;
    margin-top: auto;
  }

  .altrp-list-icon-bottom {
    margin-top: auto;
  }

  .altrp-list-icon-relative {
    position: relative;
  }

  .altrp-list-li-divider-default {
    position: absolute;
    border-top-style: solid;
    border-top-width: 1px;
    bottom: 0;
  }

  .altrp-list-li-divider {
    width: 100%
  }

  .altrp-list-li:last-child .altrp-list-li-divider-default {
    border-top: none;
  }

  .altrp-list-li:last-child .altrp-list-li-divider-inline {
    border-right: none;
  }

  .altrp-list-li-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
  }

  .altrp-list-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .altrp-list-icon, .altrp-list-icon svg {
    height: 25px;
    width: 25px;
  }
`);

class ListWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }

  render(){
    let list = null;
    let ul_classes = null;
    let divider = "";
    const { position_css_classes } = this.state.settings;

    ul_classes += this.state.settings.layout_meta_data == "inline" ? " altrp-list-ul-inline" : " altrp-list-ul-default";

    if (position_css_classes) {
      ul_classes += " " + position_css_classes;
    }
    let li_styles = {};

    if(this.state.settings.layout_meta_data != "inline") {
      if(this.state.settings.space_between_list_style) {
        li_styles = {
          marginTop: this.state.settings.space_between_list_style.size + "px",
          marginBottom: this.state.settings.space_between_list_style.size + "px"
        }
      }
    }else {
      if(this.state.settings.space_between_list_style) {
        li_styles = {
          marginLeft: this.state.settings.space_between_list_style.size + "px",
          marginRight: this.state.settings.space_between_list_style.size + "px"
        }
      }
    };

    let divider_classes = this.state.settings.layout_meta_data == "inline" ? "altrp-list-li-divider-inline" : "altrp-list-li-divider-default";
    if(this.state.settings.divider_switcher_list_style) {
      divider = <div className={"altrp-list-li-divider " + divider_classes}>
      </div>
    }

    if(this.state.settings.repeater_meta_data_section) {
      list = this.state.settings.repeater_meta_data_section.map((li, idx) => {
        let li_container = null;
        let li_label = null;
        let li_classes = "altrp-list-li ";
        let li_icon_classes = "";
        let li_icon_x = li.position_relative_x_custom_repeater;
        let li_icon_y = li.position_relative_y_custom_repeater;
        let link_icon = "";
        let link_url = "";
        let link_newTab = "";
        let link_noFollow = "";

        if(li.link_custom_repeater) {
          if(li.link_custom_repeater.url) {
            link_url = li.link_custom_repeater.url;
          };
          if(li.link_custom_repeater.openInNew) {
            link_newTab = "_blank"
          };
          if(!li.link_custom_repeater.noFollow) {
            link_noFollow = "nofollow"
          };
        };

        let li_icon_styles = {};

        if(li.position_relative_switcher_custom_repeater) {
          if(li_icon_x) {
            li_icon_styles = {
              ...li_icon_styles,
              left: li_icon_x.size + li_icon_x.unit
            };
          };

        if(li_icon_y) {
          li_icon_styles = {
            ...li_icon_styles,
            top: li_icon_y.size + li_icon_y.unit
          };
        };
      };

        li_icon_classes = li.position_relative_switcher_custom_repeater ? "altrp-list-icon-relative" : li_icon_classes;
        switch (li.vertical_alignment_icon_repeater) {
          case "top":
            li_icon_classes += " altrp-list-icon-top";
            break;
          case "center":
            li_icon_classes += " altrp-list-icon-center";
            break;
          case "bottom":
            li_icon_classes += " altrp-list-icon-bottom";
            break;
          default:
            li_icon_classes += " altrp-list-icon-center";
        }

        let li_icon = li.icon_select_repeater == "custom" ?
          <span className={"altrp-list-icon " + li_icon_classes} style={li_icon_styles}>
            {renderAssetIcon(li.icon_repeater)}
          </span> : null;

        if(li.link_switcher_custom_repeater) {
          if(!li.hover_all_switcher_custom_repeater) {
            link_icon = li_icon
          };
        };

        switch (li.type_repeater) {
          case "custom":
            li_label = <span className="altrp-list-label">{li.custom_repeater}</span>;

            li_classes = li_classes + "altrp-list-custom";

            li_container = <li key={idx} className={li_classes}>
              <div className="altrp-list-li-content" style={li_styles}>
                {link_icon}
                {
                  li.link_switcher_custom_repeater ? <a className="altrp-list-li-content altrp-list-li-link" href={link_url} target={link_newTab} rel={link_noFollow}>
                    {li.hover_all_switcher_custom_repeater ? li_icon : ""}
                    {li_label}
                  </a>
                    : <div className="altrp-list-li-content" style={li_styles}>
                      {li_icon}
                      {li_label}
                    </div>
                }
              </div>
              {divider}
            </li>
            break
        };

        return li_container

      })
    }

    return <div className="altrp-list">
      <ul className={"altrp-list-ul " + ul_classes}>
        {
          list
        }
      </ul>
    </div>
  }
}

export default ListWidget
