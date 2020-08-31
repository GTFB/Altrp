import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import {isEditor, renderAssetIcon} from "../../../../../front-app/src/js/helpers";

class ButtonWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      pending: false,
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
            let res = await form.submit(this.getModelId());
            if (res.success) {
              const { redirect_to_prev_page, redirect_after } = this.state.settings;
              if (redirect_to_prev_page) {
                return this.props.history.goBack();
              }

              if (redirect_after) {
                return this.props.history.push(redirect_after);
              }
            } else if (res.message) {
              alert(res.message);
            }
            this.setState(state => ({ ...state, pending: false }));
          } catch (e) {
            console.error(e);
            this.setState(state => ({ ...state, pending: false }));
          }
        }
      );
    }
  }

  render() {
    const { link_link } = this.state.settings;
    const { goBack } = this.props.history;
    let classes =
      "altrp-btn " + (this.state.settings.position_css_classes || "");
    let buttonMedia = { ...this.state.settings.button_icon };
    if (this.state.pending) {
      classes += " altrp-disabled";
    }
    let button = (
      <button
        onClick={link_link.toPrevPage && !isEditor() ? goBack : this.onClick}
        className={classes}
        id={this.state.settings.position_css_id}
      >
        {this.state.settings.button_text || ""}
        {buttonMedia && buttonMedia.assetType && <span className={"altrp-btn-icon "}>{renderAssetIcon(buttonMedia)} </span>}
      </button>
    );
    let link = null;
    
    if (link_link?.url && !link_link.toPrevPage) {
      if (this.state.settings.link_link.tag === 'a' || isEditor()) {

        link = (
          <a href={this.state.settings.link_link.url} onClick={this.onClick} className={classes}>
            {" "}
            {this.state.settings.button_text || ""}
            <span className={"altrp-btn-icon "}>{renderAssetIcon(buttonMedia)} </span>
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

    return link || button || buttonMedia;
  }
}

export default withRouter(ButtonWidget);