import React, {Component} from "react";
import { styles } from "react-contexify/lib/utils/styles";

class HeadingWidget extends Component {
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
    let headingContainer = React.createElement(this.state.settings.heading_settings_html_tag || 'h2', {className: "altrp-heading " + this.state.settings.position_css_classes, id: this.state.settings.position_css_id || "",},
        this.state.settings.text);
    let link = null;
    // if(this.state.settings.link_link.url != null & this.state.settings.link_link.url != "") {
    //   link = <a href={this.state.settings.link_link.url} className="altrp-btn">{headingContainer}</a>
    // };

    return  headingContainer
  }
}

export default HeadingWidget