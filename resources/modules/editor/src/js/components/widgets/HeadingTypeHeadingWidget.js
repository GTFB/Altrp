import AltrpLink from "../altrp-link/AltrpLink";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import parseURLTemplate from "../../../../../front-app/src/js/functions/parseURLTemplate";

(window.globalDefaults = window.globalDefaults || []).push(`
.altrp-heading {
  display: block;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-right: 0;
  margin-bottom: 5px;
  margin-left: 0;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
}

.altrp-heading a {
  color: black;
}

.altrp-heading a:hover {
  color: black;
  text-decoration: none;
}

.altrp-heading-wrapper {
  display: flex;
}

.altrp-heading-sub-container-link {
  margin: 0;
}
`)

class HeadingTypeHeadingWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
   * Получить css классы для heading widget
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    let heading;
    let textStrokeSwitch = this.props.element.getResponsiveLockedSetting('style_text_stroke_switcher')

    let modelData = this.props.element.getCurrentModel().getData();
    const background_image = this.props.element.getLockedSettings('background_image', {});
    let text = this.getLockedContent('text');
    let link;
    const className = this.getClasses() + (this.state.settings.position_css_classes || "") + " altrp-heading altrp-heading--link " + (background_image.url ? ' altrp-background-image' : '') + (textStrokeSwitch ? "text-stroke-included" : "");

    if (this.state.settings.link_link && this.state.settings.link_link.url) {
      let linkProps = {
        rel: this.state.settings.link_link.noFollow ? "nofollow" : null,
        href: `mailto:mail@gmail.com`,
        //className: `${className} altrp-inherit altrp-inherit_wo-border`,
        className: ` altrp-inherit altrp-inherit_wo-border`,
      };

      linkProps.tag = this.state.settings.link_link.tag;
      linkProps.creativelink = this.getLockedContent("heading_settings_html_tag") !== "p" ? this.getLockedContent("creative_link_controller") : null;

      if (this.state.settings.link_link.openInNew) {
        linkProps.target = '_black';
      }
      if ((this.state.settings.link_link.tag === 'Link') && !isEditor()) {
        linkProps.to = this.state.settings.link_link.url.replace(':id', this.getModelId() || '');
        linkProps.href = this.state.settings.link_link.url.replace(':id', this.getModelId() || '');
      }
      if (_.isObject(modelData)) {
        linkProps.to = parseURLTemplate(this.state.settings.link_link.url, modelData);
        linkProps.href = parseURLTemplate(this.state.settings.link_link.url, modelData);
      }
      if (isEditor()) {
        linkProps.onClick = e => { e.preventDefault() }
      }

      link = (
        <AltrpLink {...linkProps}>
          {
            text
          }
        </AltrpLink>
      )
    }

    let headingContainer = link ?
      <React.Fragment>
        {
          React.createElement(
            this.state.settings.heading_settings_html_tag || 'h2',
            {
              className,
              id: this.state.settings.position_css_id || "",
            },
            link
          )
        }
      </React.Fragment>
      :
      <React.Fragment>
        {
          React.createElement(
            this.state.settings.heading_settings_html_tag || 'h2',
            {
              className,
              id: this.state.settings.position_css_id || "",
              dangerouslySetInnerHTML: { __html: text }
            },
          )
        }
      </React.Fragment>;
    heading = (
      <div className="altrp-heading-wrapper">
        {headingContainer}
      </div>
    );

    return heading
  }
}

export default HeadingTypeHeadingWidget
