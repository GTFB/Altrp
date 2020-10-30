import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {isEditor} from "../../../../../front-app/src/js/helpers";

class AltrpLink extends Component {
  render() {
    let classes = this.props.className;

    let settings = {
      attributes: "",
      openInNew: false,
      noFollow: false,
      url: "/",
      tag: "a",
      toPrevPage: false
    };
    if(this.props.link) {
      settings = {
        ...settings,
        ...this.props.link
      }
    }

    let rel = "";
    if(settings.noFollow) {
      rel = "noFollow"
    }

    let link = settings.tag === "a" ? (
      <a href={settings.url} rel={rel} onClick={isEditor() ? (e) => e.preventDefault() : ""} className={classes}>
        {
          this.props.children
        }
      </a>
    ) : (
      <Link className={classes} onClick={isEditor() ? (e) => e.preventDefault() : ""} to={settings.url}>
        {
          this.props.children
        }
      </Link>
    );

    return link
  }
}

export default AltrpLink;
