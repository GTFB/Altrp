import isEditor from "../../../../front-app/src/js/functions/isEditor";
import redirect from "../../../../front-app/src/js/functions/redirect";
import getDataByPath from "../../../../front-app/src/js/functions/getDataByPath";
import replaceContentWithData from "../../../../front-app/src/js/functions/replaceContentWithData";

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
    //overflow: hidden;
    // top: auto;
    // right: auto;
    // left: auto;
    // bottom: auto;
  }

  .background_section {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-size: unset;
  }

  .section-video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .altrp-section_section-boxed.altrp-section_section-boxed {
    padding-left: calc((100vw - ${window.container_width || 1440}px) / 2);
    padding-right: calc((100vw - ${window.container_width || 1440}px) / 2);
    width: 100vw;
  }
  .popup-content .altrp-section_section-boxed.altrp-section_section-boxed{
    width:100%;
    padding-left: 0;
    padding-right: 0;
  }

  .altrp-section .section-video-controllers {
    object-fit:cover;
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
    this.element = this.props.element;
  }

  /**
   * Обрабатываем клик по секции
   * @param e
   */
  onClick = e => {
    if (isEditor()) {
      return;
    }
    const sectionLink = this.props.element.getLockedSettings("link_link");
    if(sectionLink?.url){
      redirect(sectionLink, e, this.props.element.getCurrentModel().getData());
    }
  };

  /**
   * Курсор для ссылки
   * @return {boolean}
   */
  sectionIsLink = () =>{
    if (isEditor()) {
      return false;
    }
    return !!  replaceContentWithData(_.get(this, "props.element.settings.link_link.url", ), this.props.element.getCurrentModel().getData());
  }

  render() {
    let styles = {
      maxWidth: "100%"
    };

    let path_image = this.element.getSettings('path_image')
    if(path_image){
      path_image = getDataByPath(path_image, this.element.getCardModel())
    }
    // if(path_image){
    //   styles.backgroundImage = `url("${path_image}")`
    // }
    let deleteOverflowHidden = this.props.element.getResponsiveLockedSetting("switch_overflow_hidden_section")
    if (deleteOverflowHidden) styles.overflow = 'initial'
    const background_image = this.props.element.getLockedSettings(
      "background_image",
      {}
    );
    const background_image_hover = this.props.element.getResponsiveLockedSetting(
      "background_image",
      ":hover",
      {},
    );
    const {  isFixed } = this.props.element.getLockedSettings();
    const widthType = this.props.element.getResponsiveSetting('layout_content_width_type')


    let sectionClasses = [
      "altrp-section",
      `altrp-section_columns-${this.props.element.getColumnsCount()}`
    ];
    let sectionBackground = [
      'background_section',
    ]
    if (this.sectionIsLink()) {
      sectionClasses.push("altrp-pointer");
    }
    if (background_image.url || background_image_hover /*  && !isScrollEffect */) {
      sectionBackground.push("altrp-background-image" + this.props.element.getId());
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

    const bgStyles = {
    }
    if(path_image){
      bgStyles.backgroundImage = `url(${path_image})`
    }

    const layout_html_tag =
      this.props.element.getLockedSettings("layout_html_tag") || "div";

    const position_style_css_classes = this.props.element.getLockedSettings("position_style_css_classes") || "";
    const position_style_css_id = this.props.element.getLockedSettings("position_style_css_id") || "";
    const background_video_poster = this.props.element.getResponsiveLockedSetting("url_video-poster") || "";
    const background_video_url = this.props.element.getResponsiveLockedSetting("url_video") || "";
    const background_video_url_webm = this.props.element.getResponsiveLockedSetting("url_video-webm") || "";
    const background__section = background_video_url || background_video_url_webm ? (
      <video preload='metadata' poster={background_video_poster} muted loop autoPlay playsInline className="section-video section-video-controllers">
        <source src={background_video_url_webm || 'none'} type="video/webm" className="section-video-source" />
        <source src={background_video_url || 'none'} type="video/mp4" className="section-video-source" />
      </video>
    ) : (
      <span className={sectionBackground.join(" ")} style={bgStyles}/>
    )


    return React.createElement(
      layout_html_tag,
      {
        style: styles,
        className:
          sectionClasses.join(" ") +
          " " +
          (this.isActive() ? 'active ' : '') +
          position_style_css_classes,
        id: position_style_css_id,
        onClick: this.onClick,
        columns: this.props.element.children || [],
        settings: this.props.element.getSettings()
      },
      background__section,
     sectionWrapper
    );

  }
}

export default SectionComponent;
