import React, {Component} from "react";
import { renderAssetIcon } from "../../helpers"

class ListWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }

  render(){
    let list = null
    let ul_classes = null

    ul_classes = this.state.settings.layout_meta_data == "inline" ? "altrp-list-ul-inline" : ulClasses;

    if(this.state.settings.repeater_meta_data_section) {
      list = this.state.settings.repeater_meta_data_section.map((li, idx) => {
        let li_container = null;
        let li_link = null;
        let li_icon = null;

        li_icon = li.icon_select_repeater == "custom" ?
          <span className="altrp-list-icon">{renderAssetIcon(
            li.icon_repeater
          )}</span>
          : null;

        switch (li.type_repeater) {
          case "custom":

            li_container = <li key={idx} className="altrp-list-li altrp-list-custom">
              {
                li.icon_select_repeater == "custom" ?
              }
              <span className="altrp-list-label">
                {li.custom_repeater}
              </span>
            </li>
            break
        }

        if(li.link_custom_repeater) {
          console.log(li.link_custom_repeater)
          li_link = <a href={li.link_custom_repeater.url} target={li.link_custom_repeater.openInNew ? "_blank" : null} rel={li.link_custom_repeater.nofollow ? "nofollow" : null} className="altrp-list-li-link" key={idx}>{liContainer}</a>
          if(li.link_custom_repeater.url == "") {
            li_link = null
          }
        }

        return li_link || li_container

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
