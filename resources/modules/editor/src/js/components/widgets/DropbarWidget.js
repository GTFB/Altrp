import React, {Component, Suspense} from "react";
import {
  getComponentByElementId,
  getHTMLElementById,
  isEditor,
  isSSR,
  parseURLTemplate, printElements,
  renderAssetIcon, scrollToElement
} from "../../../../../front-app/src/js/helpers";
import {Link} from "react-router-dom";
let Dropbar = React.lazy(() => import("../altrp-dropbar/AltrpDropbar"));

class DropbarWidget extends Component {
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
    if(props.baseRender){
      this.render = props.baseRender(this);
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
    e.persist();
    if (isEditor()) {
      e.preventDefault();
    } else if (this.props.element.getResponsiveSetting("actions", null, []).length) {
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
              this.props.element.getResponsiveSetting("form_confirm")
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

              if (this.props.element.getResponsiveSetting("text_after", null,"")) {
                alert(this.props.element.getResponsiveSetting("text_after", null, ""));
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
    } else if (this.props.element.getResponsiveSetting("hide_elements_trigger")) {
      this.props.toggleTrigger(
        this.props.element.getResponsiveSetting("hide_elements_trigger")
      );
    } else if (
      this.props.element
        .getResponsiveSetting("other_action_type", null,[])
        .includes("print_elements")
    ) {
      let IDs = this.props.element.getResponsiveSetting("print_elements_ids", null,"");
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
    const buttonText = this.props.element.getResponsiveSetting("button_text", "", "");
    const id = this.props.element.getResponsiveSetting("position_css_id", "", "")
    const customClasses = this.props.element.getResponsiveSetting("position_css_classes", "", null);
    const background_image = this.props.element.getResponsiveSetting(
      "background_image",
      null,
      {}
    );
    const buttonMedia = this.props.element.getResponsiveSetting("button_icon", "", {});
    const dropbarDelay = this.props.element.getResponsiveSetting("show_delay_dropbar_options");

    const showIcon = buttonMedia.url;

    if (this.state.pending) {
      classes.push("altrp-disabled");
    }

    const classes = ["altrp-btn", "dropbar"];

    if(customClasses) {
      classes.push(customClasses)
    }

    if (background_image.url) {
      classes.push("altrp-background-image");
    }

    classes.push(this.classStateDisabled());

    const buttonTemplate = (
      <button
        onClick={this.onClick}
        className={_.join(classes, " ")}
        id={id}
      >
        {buttonText}
        {
          showIcon ? (
            ! isSSR() && <span className="altrp-btn-icon">
          {renderAssetIcon(buttonMedia)}{" "}
          </span>
          ) : ""
        }
      </button>
    );
    return <div className="altrp-btn-wrapper">
      <Suspense fallback={<div>Загрузка...</div>}>
        <Dropbar
          elemenentId={this.props.element.getId()}
          settings={this.props.element.getSettings()}
          className="btn"
          element={this.props.element}
          getContent={this.getContent}
          showDelay={dropbarDelay}
        >
          {buttonTemplate}
        </Dropbar>
      </Suspense>
    </div>
  }
}


export default DropbarWidget;
