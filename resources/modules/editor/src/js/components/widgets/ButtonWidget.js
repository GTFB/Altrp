import React, { Component } from "react";
import {Link, Redirect, withRouter } from 'react-router-dom';
import {isEditor} from "../../../../../front-app/src/js/helpers";
import { renderAssetIcon } from "../../helpers";
import "../../../sass/altrp-button.scss";

class ButtonWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      pending: false,
      // redirect: false
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
                this.props.history.goBack();
              }

              if (redirect_after) {
                this.props.history.push(redirect_after);
              }
              // let redirect = this.state.settings.redirect_after
              //   ? this.state.settings.redirect_after
              //   : false;
              // this.setState(state => ({ ...state, pending: false, redirect }));
            } else if(res.message){
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
    const { button_icon, alignment_icon_style, spacing_icon_style, color_icon_style } = this.state.settings;
    let iconStyles;
    if (alignment_icon_style)  {
    iconStyles = alignment_icon_style == "left" ? 
      { paddingRight: spacing_icon_style.size + spacing_icon_style.unit} :
      { paddingLeft: spacing_icon_style.size + spacing_icon_style.unit }
    }

    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} push={true} />;
    // }
    let classes =
      "altrp-btn " + (this.state.settings.position_css_classes || "");
    let buttonMedia = {...this.state.settings.button_icon};
    if (this.state.pending) {
      classes += " altrp-disabled";
    }
    let button = (
      <button
        onClick={this.onClick}
        className={classes}
        id={this.state.settings.position_css_id}
      >
        {/*{button_icon && button_icon.assetType === 'icon' && alignment_icon_style === "left" && icon}*/}
        {this.state.settings.button_text || ""}
{/*<<<<<<< HEAD*/}
        {/*{button_icon && button_icon.assetType === 'icon' && alignment_icon_style === "right" && icon}*/}
{/*=======*/}
        {button_icon && button_icon.assetType && <span className={"altrp-btn-icon "}>{ renderAssetIcon( buttonMedia ) } </span>}
      </button>
    );
    let link = null;
    if (this.state.settings.link_link.url) {
      if(this.state.settings.link_link.tag === 'a' || isEditor()) {

        link = (
            <a href={this.state.settings.link_link.url} onClick={this.onClick} className={classes}>
              {button_icon && button_icon.assetType === 'icon' && alignment_icon_style === "left" && icon}
              {this.state.settings.button_text || ""}
              {button_icon && button_icon.assetType === 'icon' && alignment_icon_style === "right" && icon}
            </a>
        );
      } else {
        link = (
            <Link to={this.state.settings.link_link.url} onClick={this.onClick} className={classes}>
              {button_icon && button_icon.assetType === 'icon' && alignment_icon_style === "left" && icon}
              {this.state.settings.button_text || ""}
              {button_icon && button_icon.assetType === 'icon' && alignment_icon_style === "right" && icon}
            </Link>
        );
      }
    }

    return link || button || buttonMedia;
  }
}

export default withRouter(ButtonWidget);
