import React, { Component } from "react";
import {Link, Redirect, withRouter } from 'react-router-dom';
import {placeElement} from "../../helpers";
import {isEditor, parseURLTemplate, renderAssetIcon} from "../../../../../front-app/src/js/helpers";
import AltrpModel from "../../classes/AltrpModel";

//dropbar
class Dropbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      activePosition: { class: "", position: "" },
      positionVariants: placeElement(true).variants,
      contentPosition: {},
    };

    this.show = this.show.bind(this);
    this.leaveHide = this.leaveHide.bind(this);
    this.enterShow = this.enterShow.bind(this);
    this.changePosition = this.changePosition.bind(this);

    this.children = React.createRef();
    this.object = React.createRef();
  };

  show() {
    if(this.props.settings.show_delay_dropbar_options.size || this.props.settings.hide_delay_dropbar_options.size) {
      if(!this.state.show) {
        setTimeout(() => {
          this.setState((state) => ({ show: !state.show }));
        }, this.props.settings.show_delay_dropbar_options.size);
      } else {
        setTimeout(() => {
          this.setState((state) => ({ show: !state.show }));
        }, this.props.settings.hide_delay_dropbar_options.size);
      }
    } else {
      this.setState((state) => ({ show: !state.show }));
    }

    this.changePosition();
  };

  leaveHide() {

    if(this.props.settings.hide_delay_dropbar_options.size) {
      setTimeout(() => {
        this.setState({ show: false });
      }, this.props.settings.hide_delay_dropbar_options.size)
    } else {
      this.setState({ show: false });
    }
  };

  enterShow(e) {
    let current = e.currentTarget;
    if(this.props.showDelay.size && !this.state.show) {
      setTimeout(() => {
        if(this.children.current === current) {
          this.setState({ show: true });
        } else {
          this.setState({ show: false });
        }
      }, this.props.showDelay.size);
    } else {
      this.setState((state) => ({ show: !state.show }));
    }
    this.changePosition();
  };

  changePosition() {
    let offset = this.props.settings.offset_dropbar_options;
    let position = placeElement(false,
      {
        target: this.children.current,
        object: this.object.current,
        place: this.state.activePosition.position
      });

    switch (position.vector) {
      case "verBottom":
        position.position.top += Number(offset.size);
        break;
      case "verTop":
        position.position.top += -Number(offset.size);
        break;
      case "horLeft":
        position.position.right += Number(offset.size);
        break;
      case "horRight":
        position.position.left += Number(offset.size);
        break;
    };

    this.setState({ contentPosition: position.position });
  }

  componentDidUpdate(prevProps) {
    if(this.props.settings.mode_dropbar_options !== prevProps.settings.mode_dropbar_options) {
      this.setState({ show: false });
    };

    if(prevProps.settings.offset_dropbar_options !== this.props.settings.offset_dropbar_options) {
      this.setState({ offset: this.props.settings.offset_dropbar_options, show: false });
    };

    if(this.props.settings.position_dropbar_options !== prevProps.settings.position_dropbar_options) {
      this.setState({ activePosition: this.state.positionVariants.find(pos => pos.position === this.props.settings.position_dropbar_options), show: false });
    };
  }

  componentDidMount() {
    this.setState({ activePosition: this.state.positionVariants.find(pos => pos.position === this.props.settings.position_dropbar_options) });
  }

  render() {
    const children = React.Children.only(this.props.children);

    let mainClass = "altrp-dropbar-" + this.props.className;

    let contentPosition = "";
    if(this.state.activePosition) {
      contentPosition = " altrp-dropbar-variant-" + this.state.activePosition.class || "";
    }

    let contentStyles = {};

    if(this.props.settings.width_dropbar_options) {
      contentStyles = {width: this.props.settings.width_dropbar_options.size + "px"}
    }

    return (
      <div className={"altrp-dropbar altrp-dropbar-" + mainClass + contentPosition}>
        <span className={"altrp-dropbar-children-wrapper " + mainClass + "-wrapper"}>
          {
            React.cloneElement(children,
              {
                ref: this.children,
                onClick: this.props.settings.mode_dropbar_options === "click" ? this.show : null,
                onMouseEnter: this.props.settings.mode_dropbar_options === "hover" ? this.enterShow : null,
                onMouseLeave: this.props.settings.mode_dropbar_options === "hover" ? this.leaveHide : null
              }
            )
          }
          <div
            style={{...this.state.contentPosition, ...contentStyles}} ref={this.object}
            className={"altrp-dropbar-container " + mainClass + "-containter" + (this.state.show ? " altrp-dropbar-container-show" : " altrp-dropbar-container-hide")}
          >
          {
            React.createElement("div",
              {
                className: "altrp-dropbar-content " + mainClass + "-content",
                dangerouslySetInnerHTML: {
                  __html: this.props.settings.content_dropbar_section
                },
              }
            )
          }
        </div>
        </span>
      </div>
    );
  };
};

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
    } else if (this.props.element.getForms().length){
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

              if(this.props.element.getSettings('text_after', '')){
                alert(this.props.element.getSettings('text_after', ''));
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

    classes += this.state.settings.link_button_type === "dropbar" ? "altrp-btn-dropbar" : "";

    let icon = (buttonMedia && buttonMedia.assetType) ? <span className={"altrp-btn-icon "}>{renderAssetIcon(buttonMedia)} </span> : '';

    let url = link_link.url ? link_link.url.replace(':id', this.getModelId() || '') : '';
    if(_.isObject(this.props.currentModel)){
      // console.log(this.props.currentModel);
      // console.log(link_link.url);
      url = parseURLTemplate(link_link.url || '', modelData);
    }

    classes += this.classStateDisabled();
    let button = (
      this.props.element.getSettings('link_button_type', 'none') === "none" ? (
        <button
          onClick={this.onClick}
          className={classes}
          id={this.state.settings.position_css_id}
        >
          {buttonText}
          <span className={"altrp-btn-icon "}>{ renderAssetIcon( buttonMedia ) } </span>
        </button>
      ) : (
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
      )


    );

    let link = null;
    if (this.state.settings.link_link?.url && !this.state.settings.link_link.toPrevPage) {
      if (this.state.settings.link_link.tag === 'a' || isEditor()) {
        let target = _.get(this.state.settings, 'link_link.openInNew') ? 'blank' : '';
        link = (
          <a href={url} onClick={this.onClick} className={classes} target={target}>
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

    if (_.get(this.state, 'settings.link_link.toPrevPage')) {
      link = <button
        onClick={goBack}
        className={classes}
        id={this.state.settings.position_css_id}
      >
        {buttonText}
        <span className={"altrp-btn-icon "}>{renderAssetIcon(buttonMedia)} </span>
      </button>
    }



    return link || button || buttonMedia;
    // return React.createElement(tag, buttonProps, <>{this.state.settings.button_text}{icon}</>);
  }

}

export default withRouter(ButtonWidget);
