import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import {isEditor, parseURLTemplate, renderAssetIcon} from "../../../../../front-app/src/js/helpers";

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
    const { link_link = {} } = this.state.settings;
    const { goBack } = this.props.history;
    let classes =
      "altrp-btn " + (this.state.settings.position_css_classes || "");
    let buttonMedia = { ...this.state.settings.button_icon };
    if (this.state.pending) {
      classes += " altrp-disabled";
    }
    // this.getContent('button_text');
    // this.props.element.getSettings('button_text');
    //todo: убрать лишние компоненты, создавать вомпонент при помощи React.createElement
    /*let tag = 'a';

    if(this.props.element.getSettings('form_id')){
      tag = 'button';
    } else if (this.props.element.getSettings('link_link', {})['tag'] === 'Link' && ! isEditor()){
      tag = Link;
    }

    const buttonProps = {
      className: classes,
      // to:
    };
    console.log( this.props);
    buttonProps.to = link_link.url ? link_link.url.replace(':id', this.getModelId() || '') : '';
    buttonProps.href =  link_link.url ? link_link.url.replace(':id', this.getModelId() || '') : '';
    if(_.isObject(this.state.modelData) && link_link.url){
      buttonProps.to = parseURLTemplate(link_link.url, this.state.modelData);
      buttonProps.href = parseURLTemplate(link_link.url, this.state.modelData);
    }
    let icon = (buttonMedia && buttonMedia.assetType) ? <span className={"altrp-btn-icon "}>{renderAssetIcon(buttonMedia)} </span> : '';

*/
    let url = link_link.url ? link_link.url.replace(':id', this.getModelId() || '') : '';
    if(_.isObject(this.props.currentModel)){
      // console.log(this.props.currentModel);
      // console.log(link_link.url);
      url = parseURLTemplate(link_link.url || '', this.props.currentModel.getData());
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
          <a href={url} onClick={this.onClick} className={classes}>
            {" "}
            {this.state.settings.button_text || ""}
            <span className={"altrp-btn-icon "}>{renderAssetIcon(buttonMedia)} </span>
          </a>
        );
      } else {
        link = (
          <Link to={url} onClick={this.onClick} className={classes}>
            {" "}
            {this.state.settings.button_text || ""}
            <span className={"altrp-btn-icon "}>{renderAssetIcon(buttonMedia)} </span>
          </Link>
        );
      }
    }



    return link || button || buttonMedia;
    // return React.createElement(tag, buttonProps, <>{this.state.settings.button_text}{icon}</>);
  }

}

export default withRouter(ButtonWidget);