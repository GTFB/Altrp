import DefaultIcon from '../../../svgs/icon.svg'
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";

(window.globalDefaults = window.globalDefaults || []).push(`
  .icon-widget-wrapper {
    display: flex;
  }

  .icon-widget__icon {
    width: auto;
    display: flex;
    justify-content: center;
  }

  .icon-widget__icon * {
    width: auto;
  }

  .content {
    width: 100%;
  }
`);

class IconWidget extends Component {
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
  }

  async _componentWillUnmount() {
    const actionsManager = (
      await import(/* webpackChunkName: 'ActionsManager' */
        "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
      )
    ).default;
    actionsManager.unregisterWidgetActions(this.props.element.getId());
  }

  /**
   * Получить css классы для icon widget
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
    const titleText = this.state.settings.title_text === undefined ? 'Title' : this.state.settings.title_text
    const classes = this.getClasses() + (this.state.settings.position_css_classes || "")
    return (
      <div className={`${classes} icon-widget-wrapper`}>
        <span className={`${classes} icon-widget__icon`}>{this.state.settings.icon?.id ? renderAsset(this.state.settings.icon) : <DefaultIcon />}</span>
        <div className={`${classes} content`}>
          {React.createElement(this.state.settings.title_tag || 'h3', {
            className: `${classes} title`,
          }, titleText)}
          <div className={`${classes} description`}>{this.state.settings.description === undefined ? 'Icon description' : this.state.settings.description}</div>
        </div>
      </div>
    )
  }
}


export default IconWidget;
