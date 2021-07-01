let Dropbar = React.lazy(() => import(/* webpackChunkName: 'AltrpDropbar' */"../altrp-dropbar/AltrpDropbar"));
import {
  getComponentByElementId,
  getHTMLElementById,
  isEditor, isSSR,
  parseURLTemplate,
  printElements,
  renderAssetIcon,
  scrollToElement
} from "../../../../../front-app/src/js/helpers";

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-btn-wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;

    & img {
      max-width: 100%;
    }
  }

  .altrp-btn {
    width: auto;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    flex-direction: row;
    background-color: #343B4C;
    color: #FFFFFF;
    padding-top: 20px;
    padding-right: 25px;
    padding-bottom: 20px;
    padding-left: 25px

    &_gray {
      background-color: #8E94AA;
      color: #fff;
    }

    &__icon {
      transform: scale(0.6);
    }

    &-icon {
      display: flex;
      justify-content: center;
    }

    & svg {
      height: 25px;
      width: 25px;
    }
  }
`);

const Link = window.Link;

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
      await import(/* webpackChunkName: 'ActionsManager' */
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
        await import(/* webpackChunkName: 'ActionsManager' */
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
        .getResponsiveSetting("other_action_type", '',[])
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
    const { link_link = {}, advanced_tooltip: tooltip } = this.state.settings;
    const { back } = history;
    const background_image = this.props.element.getResponsiveSetting(
      "background_image",
      null,
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

    let buttonText = this.props.element.getContent("button_text");
    let buttonMedia = { ...this.state.settings.button_icon };
    const showIcon = buttonMedia.url;

    if (this.state.pending) {
      classes += " altrp-disabled";
    }

    // classes +=
    //   this.state.settings.link_button_type === "dropbar"
    //     ? "altrp-btn-dropbar"
    //     : "";

    // let icon =
    //   buttonMedia && showIcon && buttonMedia.assetType ? (
    //     <span className={"altrp-btn-icon "}>
    //       {renderAssetIcon(buttonMedia)}{" "}
    //     </span>
    //   ) : (
    //     ""
    //   );

    let url = link_link.url
      ? link_link.url.replace(":id", this.getModelId() || "")
      : "";
    if (_.isObject(this.props.currentModel)) {
      url = parseURLTemplate(link_link.url || "", modelData);
    }

    classes += this.classStateDisabled();
    let button = <button
      onClick={this.onClick}
      className={classes}
      id={this.state.settings.position_css_id}
      title={tooltip || null}
    >
      {buttonText}
      {
        showIcon ? (
          ! isSSR() && <span className={"altrp-btn-icon "}>
          {renderAssetIcon(buttonMedia)}{" "}
          </span>
        ) : ""
      }
    </button>;
    // let buttonTemplate = (
    //   <button
    //     onClick={this.onClick}
    //     className={classes}
    //     id={this.state.settings.position_css_id}
    //     title={tooltip || null}
    //   >
    //     {buttonText}
    //     {
    //       showIcon ? (
    //         ! isSSR() && <span className={"altrp-btn-icon "}>
    //       {renderAssetIcon(buttonMedia)}{" "}
    //       </span>
    //       ) : ""
    //     }
    //   </button>
    // );

    // switch (this.props.element.getResponsiveSetting("link_button_type", null,"none")) {
    //   case "dropbar":
    //     button = (
    //       <Suspense fallback={<div>Загрузка...</div>}>
    //         <Dropbar
    //           elemenentId={this.props.element.getId()}
    //           settings={this.props.element.getSettings()}
    //           className="btn"
    //           element={this.props.element}
    //           getContent={this.getContent}
    //           showDelay={this.state.settings.show_delay_dropbar_options}
    //         >
    //           {buttonTemplate}
    //         </Dropbar>
    //       </Suspense>
    //     );
    //     break;
    //   default:
    //     button = buttonTemplate;
    // }

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
            {
              showIcon ? (
                ! isSSR() && <span className={"altrp-btn-icon "}>
                  {renderAssetIcon(buttonMedia)}{" "}
                </span>
              ) : ""
            }
          </a>
        );
      } else {
        link = (
          <Link to={url} onClick={this.onClick} className={classes} title={tooltip || null}>
            {" "}
            {buttonText || ""}
            {
              showIcon ? (
                ! isSSR() && <span className={"altrp-btn-icon "}>
                  {renderAssetIcon(buttonMedia)}{" "}
                </span>
              ) : ""
            }
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
          {
            showIcon ? (
              ! isSSR() && <span className={"altrp-btn-icon "}>
                {renderAssetIcon(buttonMedia)}{" "}
              </span>
            ) : ""
          }
        </button>
      );
    }

    return <div className="altrp-btn-wrapper">
      { link || button || buttonMedia }
    </div>;
    // return React.createElement(tag, buttonProps, <>{this.state.settings.button_text}{icon}</>);
  }
}


export default ButtonWidget;
