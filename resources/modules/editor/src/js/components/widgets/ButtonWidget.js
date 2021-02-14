import React, { Component, Suspense } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
let Dropbar = React.lazy(() => import("../altrp-dropbar/AltrpDropbar"));
import {
  getComponentByElementId,
  getHTMLElementById,
  isEditor,
  parseURLTemplate,
  printElements,
  renderAssetIcon,
  scrollToElement
} from "../../../../../front-app/src/js/helpers";
import { togglePopup } from "../../../../../front-app/src/js/store/popup-trigger/actions";
import { toggleTrigger } from "../../../../../front-app/src/js/store/hide-triggers/actions";

class ButtonWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      pending: false
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.onClick = this.onClick.bind(this);
  }
  /**
   * Компонент удаляется со страницы
   */
  async _componentWillUnmount() {
    const actionsManager = (
      await import(
        "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
      )
    ).default;
    actionsManager.unregisterWidgetActions(this.props.element.getId());
  }

  /**
   * Клик по кнопке
   * @param e
   * @return {Promise<void>}
   */
  async onClick(e) {
    if (isEditor()) {
      e.preventDefault();
    } else if (this.props.element.getSettings("actions", []).length) {
      e.preventDefault();
      e.stopPropagation();
      const actionsManager = (
        await import(
          "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
        )
      ).default;
      await actionsManager.callAllWidgetActions(
        this.props.element.getIdForAction(),
        'click',
        this.props.element.getSettings("actions", []),
        this.props.element
      );
    }
    if (this.props.element.getForms().length) {
      this.setState(state => ({ ...state, pending: true }));
      this.props.element.getForms().forEach(
        /**
         * @param {AltrpForm} form
         */ async form => {
          try {
            let res = await form.submit(
              this.getModelId(),
              this.props.element.getSettings("form_confirm")
            );
            if (res.success) {
              let {
                redirect_to_prev_page,
                redirect_after
              } = this.state.settings;
              if (redirect_to_prev_page) {
                return history.back();
              }
              if (redirect_after) {
                redirect_after = parseURLTemplate(redirect_after, res.data);
                return this.props.history.push(redirect_after);
              }

              if (this.props.element.getSettings("text_after", "")) {
                alert(this.props.element.getSettings("text_after", ""));
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
    // else      if (
    //   this.props.element.getSettings("popup_trigger_type") &&
    //   this.props.element.getSettings("popup_id")
    // ) {
    //   this.props.appStore.dispatch(
    //     togglePopup(this.props.element.getSettings("popup_id"))
    //   );
    //   /**
    //    * Проверим надо ли по ID скроллить к элементу
    //    */
    // }
    else if (
      e.target.href &&
      e.target.href
        .replace(window.location.origin + window.location.pathname, "")
        .indexOf("#") === 0
    ) {
      let elementId = e.target.href
        .replace(window.location.origin + window.location.pathname, "")
        .replace("#", "");
      const element = getHTMLElementById(elementId);
      if (element) {
        e.preventDefault();
        scrollToElement(mainScrollbars, element);
      }
    } else if (this.props.element.getSettings("hide_elements_trigger")) {
      this.props.toggleTrigger(
        this.props.element.getSettings("hide_elements_trigger")
      );
    } else if (
      this.props.element
        .getSettings("other_action_type", [])
        .includes("print_elements")
    ) {
      let IDs = this.props.element.getSettings("print_elements_ids", "");
      IDs = IDs.split(",");
      let elementsToPrint = [];
      IDs.forEach(elementId => {
        if (!elementId || !elementId.trim()) {
          return;
        }
        getHTMLElementById(elementId.trim()) &&
          elementsToPrint.push(getHTMLElementById(elementId));
        if (getComponentByElementId(elementId.trim())?.getStylesHTMLElement) {
          let stylesElement = getComponentByElementId(
            elementId.trim()
          ).getStylesHTMLElement();
          if (stylesElement) {
            elementsToPrint.push(stylesElement);
          }
        }
      });
      if (_.get(window, "stylesModule.stylesContainer.current")) {
        elementsToPrint.push(
          _.get(window, "stylesModule.stylesContainer.current")
        );
      }
      elementsToPrint.push(document.head);
      printElements(elementsToPrint);
    }
  }

  render() {
    const { link_link = {}, advanced_tooltip: tooltip } = this.state.settings;
    const { back } = history;
    const background_image = this.props.element.getSettings(
      "background_image",
      {}
    );
      
    let modelData = this.props.element.hasCardModel()
      ? this.props.element.getCardModel().getData()
      : this.props.currentModel.getData();
    let classes =
      "altrp-btn " + (this.state.settings.position_css_classes || "");
    if (background_image.url) {
      classes += " altrp-background-image";
    }

    let buttonText = this.getContent("button_text") || "";
    let buttonMedia = { ...this.state.settings.button_icon };
    if (this.state.pending) {
      classes += " altrp-disabled";
    }

    classes +=
      this.state.settings.link_button_type === "dropbar"
        ? "altrp-btn-dropbar"
        : "";

    let icon =
      buttonMedia && buttonMedia.assetType ? (
        <span className={"altrp-btn-icon "}>
          {renderAssetIcon(buttonMedia)}{" "}
        </span>
      ) : (
        ""
      );

    let url = link_link.url
      ? link_link.url.replace(":id", this.getModelId() || "")
      : "";
    if (_.isObject(this.props.currentModel)) {
      url = parseURLTemplate(link_link.url || "", modelData);
    }

    classes += this.classStateDisabled();
    let button;
    let buttonTemplate = (
      <button
        onClick={this.onClick}
        className={classes}
        id={this.state.settings.position_css_id}
        title={tooltip || null}
      >
        {buttonText}
        <span className={"altrp-btn-icon "}>
          {renderAssetIcon(buttonMedia)}{" "}
        </span>
      </button>
    );

    switch (this.props.element.getSettings("link_button_type", "none")) {
      case "dropbar":
        button = (
          <Suspense fallback={<div>Загрузка...</div>}>
            <Dropbar
              elemenentId={this.props.element.getId()}
              settings={this.props.element.getSettings()}
              className="btn"
              element={this.props.element}
              getContent={this.getContent}
              showDelay={this.state.settings.show_delay_dropbar_options}
            >
              {buttonTemplate}
            </Dropbar>
          </Suspense>
        );
        break;
      default:
        button = buttonTemplate;
    }

    let link = null;
    if (
      this.state.settings.link_link?.url &&
      !this.state.settings.link_link.toPrevPage
    ) {
      if (this.state.settings.link_link.tag === "a" || isEditor()) {
        let target = _.get(this.state.settings, "link_link.openInNew")
          ? "blank"
          : "";
        link = (
          <a
            href={url}
            onClick={this.onClick}
            className={classes}
            target={target}
            title={tooltip || null}
          >
            {" "}
            {buttonText || ""}
            <span className={"altrp-btn-icon "}>
              {renderAssetIcon(buttonMedia)}{" "}
            </span>
          </a>
        );
      } else {
        link = (
          <Link to={url} onClick={this.onClick} className={classes} title={tooltip || null}>
            {" "}
            {buttonText || ""}
            <span className={"altrp-btn-icon "}>
              {renderAssetIcon(buttonMedia)}{" "}
            </span>
          </Link>
        );
      }
    }

    if (_.get(this.state, "settings.link_link.toPrevPage")) {
      link = (
        <button
          onClick={() => (isEditor() ? null : back())}
          className={classes}
          id={this.state.settings.position_css_id}
          title={tooltip || null}
        >
          {buttonText}
          <span className={"altrp-btn-icon "}>
            {renderAssetIcon(buttonMedia)}{" "}
          </span>
        </button>
      );
    }

    return link || button || buttonMedia;
    // return React.createElement(tag, buttonProps, <>{this.state.settings.button_text}{icon}</>);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTrigger: string => dispatch(toggleTrigger(string))
  };
};

// export default connect(null, mapDispatchToProps)(withRouter(ButtonWidget));
export default ButtonWidget;
