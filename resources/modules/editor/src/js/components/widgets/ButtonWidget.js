import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import getComponentByElementId from "../../../../../front-app/src/js/functions/getComponentByElementId";
import getHTMLElementById from "../../../../../front-app/src/js/functions/getHTMLElementById";
import parseURLTemplate from "../../../../../front-app/src/js/functions/parseURLTemplate";
import printElements from "../../../../../front-app/src/js/functions/printElements";
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";
import scrollToElement from "../../../../../front-app/src/js/functions/scrollToElement";

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-btn-wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;


  }

  .altrp-btn svg {
    display: block;
  }
  .altrp-btn:hover {
    text-decoration: none;
    color: #fff;
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

    & img {
      height: 25px;
      width: 25px;
    }
  }

  .btn-container-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .btn-container-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .altrp-btn-icon-right img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .altrp-btn-icon-right svg {
    width: 100%;
    height: 100%;
  }

  .altrp-btn-icon-left img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .altrp-btn-icon-left svg {
    width: 100%;
    height: 100%;
  }

  .altrp-btn-icon-top img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .altrp-btn-icon-top svg {
    width: 100%;
    height: 100%;
  }

  .altrp-btn-icon-bottom img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .altrp-btn-icon-bottom svg {
    width: 100%;
    height: 100%;
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
    } else if (this.props.element.getResponsiveLockedSetting("actions", null, []).length) {
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
        this.props.element.getLockedSettings("actions", []),
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
              this.props.element.getResponsiveLockedSetting("form_confirm")
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

              if (this.props.element.getResponsiveLockedSetting("text_after", null,"")) {
                alert(this.props.element.getResponsiveLockedSetting("text_after", null, ""));
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
    } else if (this.props.element.getResponsiveLockedSetting("hide_elements_trigger")) {
      this.props.toggleTrigger(
        this.props.element.getResponsiveLockedSetting("hide_elements_trigger")
      );
    } else if (
      this.props.element
        .getResponsiveLockedSetting("other_action_type", '',[])
        .includes("print_elements")
    ) {
      let IDs = this.props.element.getResponsiveLockedSetting("print_elements_ids", null,"");
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

  /**
   * Получить css классы для кнопки
   */
  getClasses = ()=>{
    let classes = 'altrp-btn ';
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    const { link_link = {}, advanced_tooltip: tooltip } = this.state.settings;
    const { back } = history;
    const background_image = this.props.element.getResponsiveLockedSetting(
      "background_image",
      null,
      {}
    );

    let modelData = this.props.element.hasCardModel()
      ? this.props.element.getCardModel().getData()
      : this.props.currentModel.getData();
    let classes =
      this.getClasses() + (this.state.settings.position_css_classes || "");
    if (background_image.url) {
      classes += " altrp-background-image_btn";
    }
    let buttonText = this.getLockedContent("button_text");
    let buttonMediaRight = { ...this.state.settings.button_icon_right };
    let buttonMediaLeft = { ...this.state.settings.button_icon_left };
    let buttonMediaTop = { ...this.state.settings.button_icon_top };
    let buttonMediaBottom = { ...this.state.settings.button_icon_bottom };

    const showIcon = buttonMediaRight.url || buttonMediaLeft.url || buttonMediaTop.url || buttonMediaBottom.url;

    let existingIconsString = '';

    if (showIcon) {
      if (buttonMediaRight.url) {
        existingIconsString += 'r'
      }

      if (buttonMediaLeft.url) {
        existingIconsString += 'l'
      }

      if (buttonMediaTop.url) {
        existingIconsString += 't'
      }

      if (buttonMediaBottom.url) {
        existingIconsString += 'b'
      }
    }

    existingIconsString = existingIconsString.split('').sort().join('');
    let buttonInner = <span className="altrp-btn-text">{buttonText || ""}</span>

    if (existingIconsString === 'r') {
      buttonInner = (
        <div className="btn-container-row">
          <div className="altrp-btn-text">{buttonText}</div>
          <div className={"altrp-btn-icon-right "}>
            {renderAsset(buttonMediaRight)}{" "}
          </div>
        </div>
      )
    }


    if (existingIconsString === 'l') {
      buttonInner = (
        <div className="btn-container-row">
          <div className={"altrp-btn-icon-left "}>
            {renderAsset(buttonMediaLeft)}{" "}
          </div>
          <div className="altrp-btn-text">{buttonText}</div>
        </div>
      )
    }

    if (existingIconsString === 't') {
      buttonInner = (
        <div className="btn-container-column">
          <div className={"altrp-btn-icon-top "}>
            {renderAsset(buttonMediaTop)}{" "}
          </div>
          <div className="altrp-btn-text">{buttonText}</div>
        </div>
      )
    }

    if (existingIconsString === 'b') {
      buttonInner = (
        <div className="btn-container-column">
          <div className="altrp-btn-text">{buttonText}</div>
          <div className={"altrp-btn-icon-bottom "}>
            {renderAsset(buttonMediaBottom)}{" "}
          </div>
        </div>
      )
    }

    if (existingIconsString === 'blrt') {
      buttonInner = (
        <div className="btn-container-column">
          <span className={"altrp-btn-icon-top "}>
            {renderAsset(buttonMediaTop)}{" "}
          </span>
          <div className="btn-container-row">
            <span className={"altrp-btn-icon-left "}>
              {renderAsset(buttonMediaLeft)}{" "}
            </span>
            <div className="altrp-btn-text">{buttonText}</div>
            <span className={"altrp-btn-icon-right "}>
              {renderAsset(buttonMediaRight)}{" "}
            </span>
          </div>
          <span className={"altrp-btn-icon-bottom "}>
            {renderAsset(buttonMediaBottom)}{" "}
          </span>
        </div>
      )
    }

    if (existingIconsString === 'brt') {
      buttonInner = (
        <div className="btn-container-column">
          <span className={"altrp-btn-icon-top "}>
            {renderAsset(buttonMediaTop)}{" "}
          </span>
          <div className="btn-container-row">
            <div className="altrp-btn-text">{buttonText}</div>
            <span className={"altrp-btn-icon-right "}>
              {renderAsset(buttonMediaRight)}{" "}
            </span>
          </div>
          <span className={"altrp-btn-icon-bottom "}>
            {renderAsset(buttonMediaBottom)}{" "}
          </span>
        </div>
      )
    }

    if (existingIconsString === 'blt') {
      buttonInner = (
         <div className="btn-container-column">
          <span className={"altrp-btn-icon-top "}>
            {renderAsset(buttonMediaTop)}{" "}
          </span>
          <div className="btn-container-row">
            <span className={"altrp-btn-icon-left "}>
              {renderAsset(buttonMediaLeft)}{" "}
            </span>
            <div className="altrp-btn-text">{buttonText}</div>
          </div>
          <span className={"altrp-btn-icon-bottom "}>
            {renderAsset(buttonMediaBottom)}{" "}
          </span>
        </div>
      )
    }

    if (existingIconsString === 'lrt') {
      buttonInner = (
        <div className="btn-container-column">
          <span className={"altrp-btn-icon-top "}>
            {renderAsset(buttonMediaTop)}{" "}
          </span>
          <div className="btn-container-row">
            <span className={"altrp-btn-icon-left "}>
              {renderAsset(buttonMediaLeft)}{" "}
            </span>
            <div className="altrp-btn-text">{buttonText}</div>
            <span className={"altrp-btn-icon-right "}>
              {renderAsset(buttonMediaRight)}{" "}
            </span>
          </div>
        </div>
      )
    }

    if (existingIconsString === 'blr') {
      buttonInner = (
        <div className="btn-container-column">
          <div className="btn-container-row">
            <span className={"altrp-btn-icon-left "}>
              {renderAsset(buttonMediaLeft)}{" "}
            </span>
            <div className="altrp-btn-text">{buttonText}</div>
            <span className={"altrp-btn-icon-right "}>
              {renderAsset(buttonMediaRight)}{" "}
            </span>
          </div>
          <span className={"altrp-btn-icon-bottom "}>
            {renderAsset(buttonMediaBottom)}{" "}
          </span>
        </div>
      )
    }

    if (existingIconsString === 'rt') {
      buttonInner = (
        <div className="btn-container-column">
          <span className={"altrp-btn-icon-top "}>
            {renderAsset(buttonMediaTop)}{" "}
          </span>
          <div className="btn-container-row">
            <div className="altrp-btn-text">{buttonText}</div>
            <span className={"altrp-btn-icon-right "}>
              {renderAsset(buttonMediaRight)}{" "}
            </span>
          </div>
        </div>
      )
    }

    if (existingIconsString === 'lt') {
      buttonInner = (
        <div className="btn-container-column">
          <span className={"altrp-btn-icon-top "}>
            {renderAsset(buttonMediaTop)}{" "}
          </span>
          <div className="btn-container-row">
            <span className={"altrp-btn-icon-left "}>
              {renderAsset(buttonMediaLeft)}{" "}
            </span>
            <div className="altrp-btn-text">{buttonText}</div>
          </div>
        </div>
      )
    }

    if (existingIconsString === 'bt') {
      buttonInner = (
        <div className="btn-container-column">
          <span className={"altrp-btn-icon-top "}>
            {renderAsset(buttonMediaTop)}{" "}
          </span>
          <div className="btn-container-row">
            <div className="altrp-btn-text">{buttonText}</div>
          </div>
          <span className={"altrp-btn-icon-bottom "}>
            {renderAsset(buttonMediaBottom)}{" "}
          </span>
        </div>
      )
    }

    if (existingIconsString === 'br') {
      buttonInner = (
        <div className="btn-container-column">
          <div className="btn-container-row">
            <div className="altrp-btn-text">{buttonText}</div>
            <span className={"altrp-btn-icon-right "}>
              {renderAsset(buttonMediaRight)}{" "}
            </span>
          </div>
          <span className={"altrp-btn-icon-bottom "}>
            {renderAsset(buttonMediaBottom)}{" "}
          </span>
        </div>
      )
    }

    if (existingIconsString === 'lr') {
      buttonInner = (
        <div className="btn-container-column">
          <div className="btn-container-row">
            <span className={"altrp-btn-icon-left "}>
              {renderAsset(buttonMediaLeft)}{" "}
            </span>
            <div className="altrp-btn-text">{buttonText}</div>
            <span className={"altrp-btn-icon-right "}>
              {renderAsset(buttonMediaRight)}{" "}
            </span>
          </div>
        </div>
      )
    }

    if (existingIconsString === 'bl') {
      buttonInner = (
        <div className="btn-container-column">
          <div className="btn-container-row">
            <span className={"altrp-btn-icon-left "}>
              {renderAsset(buttonMediaLeft)}{" "}
            </span>
            <div className="altrp-btn-text">{buttonText}</div>
          </div>
          <span className={"altrp-btn-icon-bottom "}>
            {renderAsset(buttonMediaBottom)}{" "}
          </span>
        </div>
      )
    }

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
    //       {renderAsset(buttonMedia)}{" "}
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

    let button = <button
      onClick={this.onClick}
      className={classes}
      id={this.state.settings.position_css_id}
      title={tooltip || null}
    >
      {buttonInner}
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
    //       {renderAsset(buttonMedia)}{" "}
    //       </span>
    //       ) : ""
    //     }
    //   </button>
    // );

    // switch (this.props.element.getResponsiveLockedSetting("link_button_type", null,"none")) {
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
      let target = _.get(this.state.settings, "link_link.openInNew")
        ? "_blank"
        : "";
      if (this.state.settings.link_link.tag === "a" || isEditor()) {
        link = (
          <a
            href={url}
            onClick={this.onClick}
            className={classes}
            target={target}
            title={tooltip || null}
          >
            {" "}
            {buttonInner}
          </a>
        );
      } else {
        link = (
          <Link to={url} href={url} onClick={this.onClick} target={target} className={classes} title={tooltip || null}>
            {" "}
            {buttonInner}
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
          {buttonInner}
        </button>
      );
    }
    return <div className="altrp-btn-wrapper">
      {link || button || buttonMediaRight || buttonMediaLeft || buttonMediaTop || buttonMediaBottom}
    </div>;
    // return React.createElement(tag, buttonProps, <>{this.state.settings.button_text}{icon}</>);
  }
}


export default ButtonWidget;
