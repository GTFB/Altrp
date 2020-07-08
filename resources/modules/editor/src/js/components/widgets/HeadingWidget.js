import React, {Component} from "react";
import { styles } from "react-contexify/lib/utils/styles";
import {Link} from 'react-router-dom'
import {isEditor} from "../../helpers";

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
    let text = this.state.settings.text;
    if(this.state.settings.link_link && this.state.settings.link_link.url){
      let linkProps = {
        rel: this.state.settings.link_link.noFollow ? "nofollow" : null,
        href: this.state.settings.link_link.url,
      };
      let tag = 'a';
      if((this.state.settings.link_link.tag === 'Link') && ! isEditor()){
        tag = Link;
        linkProps.to = this.state.settings.link_link.url;
      }
      text = React.createElement(tag, linkProps, text);
    }
    let headingContainer = React.createElement(this.state.settings.heading_settings_html_tag || 'h2', {className: "altrp-heading " + this.state.settings.position_css_classes, id: this.state.settings.position_css_id || "",},
        text);
    // let link = null;

    // if(this.state.settings.link_link && this.state.settings.link_link.url) {
    //   link = <a href={this.state.settings.link_link.url} rel={!this.state.settings.link_link.noFollow ? "nofollow" : null} className="altrp-btn">{headingContainer}</a>
    // }

    return headingContainer
  }
}

export default HeadingWidget