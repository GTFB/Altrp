import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import {isEditor} from "../../../../../front-app/src/js/helpers";

class ButtonWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      pending: false,
      redirect: false
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.onClick = this.onClick.bind(this);
  }

  async onClick(e) {
    if (isEditor()) {
      console.log(this.state.settings);
    } else {
      this.setState(state => ({ ...state, pending: true }));
      this.props.element.getForms().forEach(
        /**
         * @param {AltrpForm} form
         */ async form => {
          try {
            let res = await form.submit(this.hasMore());
            if (res.success) {
              let redirect = this.state.settings.redirect_after
                ? this.state.settings.redirect_after
                : false;
              this.setState(state => ({ ...state, pending: false, redirect }));
            } else if(res.message){
              alert(res.message);
            }
            this.setState(state => ({ ...state, pending: false }));
          } catch (e) {
            this.setState(state => ({ ...state, pending: false }));
          }
        }
      );
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} push={true} />;
    }
    let classes =
      "altrp-btn " + (this.state.settings.position_css_classes || "");
    if (this.state.pending) {
      classes += " altrp-disabled";
    }
    let button = (
      <button
        onClick={this.onClick}
        className={classes}
        id={this.state.settings.position_css_id}
      >
        {this.state.settings.button_text || ""}
      </button>
    );
    let link = null;
    if (this.state.settings.link_link.url) {
      if(this.state.settings.link_link.tag === 'a' || isEditor()) {

        link = (
            <a href={this.state.settings.link_link.url} onClick={this.onClick} className={classes}>
              {" "}
              {this.state.settings.button_text || ""}
            </a>
        );
      } else {
        link = (
            <Link to={this.state.settings.link_link.url} onClick={this.onClick} className={classes}>
              {" "}
              {this.state.settings.button_text || ""}
            </Link>
        );
      }
    }

    return link || button;
  }
}

export default ButtonWidget;
