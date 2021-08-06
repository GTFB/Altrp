const { isEditor, redirect } = window.altrpHelpers;

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-section {
    display: flex;
    &.altrp-section--boxed > .altrp-element {
      margin: 0 auto;
    }
    &.altrp-section--full-width,
    &.altrp-section--boxed {
      width: 100vw;
    }
  }

  .altrp-section-full-fill {
    display: flex;
    width: 100vh;
  }

  .altrp-section-full-fill .altrp-section {
    width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }

  .altrp-section {
    position: relative;
    top: auto;
    right: auto;
    left: auto;
    bottom: auto;
  }

  .altrp-section_section-boxed.altrp-section_section-boxed {
    padding-left: calc((100vw - ${window.container_width || 1440}px) / 2);
    padding-right: calc((100vw - ${window.container_width || 1440}px) / 2);
    width: 100vw;
  }
`);

class SectionComponent extends Component {
  constructor(props) {
    super(props);
    if (!props.children.length) {
      throw `Section Component Must Contain at Least One Column as Child`;
    }
    this.state = {
      children: props.children,
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }

  /**
   * Обрабатываем клик по секции
   * @param e
   */
  onClick = e => {
    if (isEditor()) {
      return;
    }
    const sectionLink = this.props.element.getSettings("link_link");
    redirect(sectionLink, e, this.props.element.getCurrentModel().getData());
  };

  /**
   * Курсор для ссылки
   * @return {boolean}
   */
  sectionIsLink() {
    if (isEditor()) {
      return false;
    }
    return !!_.get(this, "props.element.settings.link_link.url");
  }

  render() {
    let styles = {
      maxWidth: "100%"
    };
    const background_image = this.props.element.getSettings(
      "background_image",
      {}
    );
    const background_image_hover = this.props.element.getResponsiveSetting(
      "background_image",
      ":hover",
      {},
    );
    const {  isFixed } = this.props.element.getSettings();
    const widthType = this.props.element.getSettings()
      .layout_content_width_type;


    let sectionClasses = [
      "altrp-section",
      `altrp-section_columns-${this.props.element.getColumnsCount()}`
    ];
    if (this.sectionIsLink()) {
      sectionClasses.push("altrp-pointer");
    }
    if (background_image.url || background_image_hover /*  && !isScrollEffect */) {
      sectionClasses.push("altrp-background-image");
    }

    if (widthType === "boxed" && !isFixed) {
      sectionClasses.push("altrp-section_boxed");
    }
    if (widthType === "section_boxed" && !isFixed) {
      sectionClasses.push("altrp-section_section-boxed");
      delete styles.maxWidth;
    }

    if (widthType === "full" && !isFixed) {
      sectionClasses.push("altrp-section--full-width");
      delete styles.maxWidth;
    }

    let ElementWrapper = window.SectionElementWrapper || this.props.ElementWrapper || window.ElementWrapper;
    let sectionWrapper = this.state.children.map(column => (
      <ElementWrapper
        ElementWrapper={ElementWrapper}
        key={column.getIdForAction()}
        rootElement={this.props.rootElement}
        baseRender={this.props.baseRender}
        component={column.componentClass}
        element={column}
      />
    ));

    const fitToContent = this.props.element.getResponsiveSetting("layout_height", "", "default")
    if (fitToContent === "fit") {
      sectionClasses.push("section-fit-to-content");
    }
    const layout_html_tag =
      this.props.element.getSettings("layout_html_tag") || "div";


    return React.createElement(
      layout_html_tag,
      {
        style: styles,
        className:
          sectionClasses.join(" ") +
          " " +
          (this.isActive() ? 'active ' : '') +
          this.state.settings.position_style_css_classes,
        id: "",
        onClick: this.onClick,
        columns: this.props.element.children || [],
        settings: this.props.element.getSettings()
      },
     sectionWrapper
    );

  }
}

export default SectionComponent;
