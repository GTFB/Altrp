import DefaultIcon from '../../../svgs/icon.svg'
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";

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

  render() {
    const titleText = this.state.settings.title_text === undefined ? 'Title' : this.state.settings.title_text
    return (
      <div className='icon-widget-wrapper'>
        <span className="icon-widget__icon">{this.state.settings.icon?.id ? renderAsset(this.state.settings.icon) : <DefaultIcon />}</span>
        <div className="content">
          {React.createElement(this.state.settings.title_tag || 'h3', {
            className: 'title',
          }, titleText)}
          <div className="description">{this.state.settings.description === undefined ? 'Icon description' : this.state.settings.description}</div>
        </div>
      </div>
    )
  }
}


export default IconWidget;
