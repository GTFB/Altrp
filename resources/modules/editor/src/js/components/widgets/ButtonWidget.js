import React, { Component, Suspense } from "react";
import {Link, Redirect, withRouter } from 'react-router-dom';
import {isEditor, parseURLTemplate, renderAssetIcon} from "../../../../../front-app/src/js/helpers";
import AltrpModel from "../../classes/AltrpModel";
let Dropbar = React.lazy(() => import('../altrp-dropbar/AltrpDropbar'));

//button
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
            let res = await form.submit(this.getModelId(), this.props.element.getSettings('form_confirm'));
            if (res.success) {
              let { redirect_to_prev_page, redirect_after } = this.state.settings;
              if (redirect_to_prev_page) {
                return this.props.history.goBack();
              }
              if (redirect_after) {

                redirect_after = parseURLTemplate(redirect_after, res.data);
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
    const background_image = this.props.element.getSettings('background_image', {});

    let modelData = this.props.element.hasCardModel()
        ? this.props.element.getCardModel().getData()
        : this.props.currentModel.getData();
    let classes = "altrp-btn " + (this.state.settings.position_css_classes || "");
    if (background_image.url) {
      classes += ' altrp-background-image';
    }

    let buttonText = this.getContent('button_text') || '';


    let buttonMedia = { ...this.state.settings.button_icon };
    if (this.state.pending) {
      classes += " altrp-disabled";
    }

    classes += this.state.settings.link_button_type === "dropbar" ? "altrp-btn-dropbar" : ""

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

    let url = link_link.url ? link_link.url.replace(':id', this.getModelId() || '') : '';
    if(_.isObject(this.props.currentModel)){
      // console.log(this.props.currentModel);
      // console.log(link_link.url);
      url = parseURLTemplate(link_link.url || '', modelData);
    }

    classes += this.classStateDisabled();
    let button = (
      this.state.settings.link_button_type === "none" ? (
        <button
          onClick={this.onClick}
          className={classes}
          id={this.state.settings.position_css_id}
        >
          {buttonText}
          <span className={"altrp-btn-icon "}>{ renderAssetIcon( buttonMedia ) } </span>
        </button>
      ) : (
        <Suspense fallback={<div>Загрузка...</div>}>
          <Dropbar
            settings={this.props.element.getSettings()}
            className="btn"
            showDelay={this.state.settings.show_delay_dropbar_options}
          >
            <button
              onClick={this.onClick}
              className={classes}
              id={this.state.settings.position_css_id}
            >
              {buttonText}
              <span className={"altrp-btn-icon "}>{ renderAssetIcon( buttonMedia ) } </span>
            </button>
          </Dropbar>
        </Suspense>
      )


    );

    let link = null;

    if (this.state.settings.link_link?.url && !this.state.settings.link_link.toPrevPage) {
      if (this.state.settings.link_link.tag === 'a' || isEditor()) {

        link = (
          <a href={url} onClick={this.onClick} className={classes}>
            {" "}
            {buttonText || ""}
            <span className={"altrp-btn-icon "}>{renderAssetIcon(buttonMedia)} </span>
          </a>
        );
      } else {
        link = (
          <Link to={url} onClick={this.onClick} className={classes}>
            {" "}
            {buttonText || ""}
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
