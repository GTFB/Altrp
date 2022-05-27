import { Switch } from "@blueprintjs/core";
const {TemplateLoader} = window.altrpHelpers;

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-tabs-switcher_wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  .altrp-tabs-switcher {
    width: 100%;
  }

  .altrp-tabs-switcher_switch-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% + 4px)
  }

  label.bp3-switch.bp3-switch.altrp-tabs-switcher_switch {
    margin: 0;
    padding: 0;

    & span.bp3-control-indicator.bp3-control-indicator {
      width: 50px;
      height: 25px;
      margin: 0;

      &:before {
        height: calc(25px - 4px);
        width: calc(25px - 4px);
      }
    }

    & input:checked ~ span.bp3-control-indicator.bp3-control-indicator {
      &:before {
        left: calc(100% - 25px);
      }
    }
  }

  .altrp-tabs-switcher_label {
    font-weight: 100;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }

  .altrp-tabs-switcher_label-one {
    margin-right: 10px;
  }

  .altrp-tabs-switcher_label-two {
    margin-left: 10px;
  }
`);

class TabsSwitcherWidget extends Component {
  constructor(props) {
    super(props);
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
    this.state = {
      switcher: false
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState((s) => ({
      ...s,
      switcher: !s.switcher
    }))
  }

  /**
   * Получить css классы для TabsSwitcherWidget
   */
  getClasses = ()=>{
    let classes = `altrp-tabs-switcher_switch `;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    // section 1
    const oneTitle = this.props.element.getResponsiveLockedSetting("one_title", "", "");
    const oneType = this.props.element.getResponsiveLockedSetting("one_type", "", "text");
    const oneWysiwyg = this.props.element.getResponsiveLockedSetting("one_wysiwyg", "", "");
    const oneTemplate = this.props.element.getResponsiveLockedSetting("one_template", "", "");
    // section 2
    const twoTitle = this.props.element.getResponsiveLockedSetting("two_title", "", "");
    const twoType = this.props.element.getResponsiveLockedSetting("two_type", "", "text");
    const twoWysiwyg = this.props.element.getResponsiveLockedSetting("two_wysiwyg", "", "");
    const twoTemplate = this.props.element.getResponsiveLockedSetting("two_template", "", null);
    let classes = this.getClasses()

    function getContent(type, contentValue) {
      if(type === "text") {
        return <div
          className={`altrp-tabs-switcher_content-text ${contentValue.className}`}
          dangerouslySetInnerHTML={{ __html: contentValue.wysiwyg }}
        />
      } else if(type === "template") {
        if(contentValue.template) {
          return <TemplateLoader
            templateId={contentValue.template}
          />
        }
      }
    }

    let content = !this.state.switcher ?
      getContent(oneType, {
        wysiwyg: oneWysiwyg,
        template: oneTemplate,
        className: "altrp-tabs-switcher_content-one"
      }) :
      getContent(twoType, {
        wysiwyg: twoWysiwyg,
        template: twoTemplate,
        className: "altrp-tabs-switcher_content-two"
      });

    return <div className="altrp-tabs-switcher">
      <div className="altrp-tabs-switcher_wrapper">
        <div className="altrp-tabs-switcher_label altrp-tabs-switcher_label-one">
          {oneTitle}
        </div>
        <div className="altrp-tabs-switcher_switch-wrapper">
          <Switch
            checked={this.state.switcher}
            onChange={this.onChange}
            className={classes}
          />
        </div>
        <div  className="altrp-tabs-switcher_label altrp-tabs-switcher_label-two">
          {twoTitle}
        </div>
      </div>
      <div className="altrp-tabs-switcher_content">
        {content}
      </div>
    </div>
  }
}

export default TabsSwitcherWidget
