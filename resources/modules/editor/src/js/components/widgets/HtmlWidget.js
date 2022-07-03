
class HtmlWidget extends Component {
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
  shouldComponentUpdate(nextProps, nextState){
    let data = this.getLockedContent("data");
    return this.data !== data
  }

  /**
   * Получить css классы для html widget
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
    let data = this.getLockedContent("data");
    this.data = data
    let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")

    return (
      <>
        <div
          className={classes}
          dangerouslySetInnerHTML={{
            __html: data
          }}
        />
      </>
    );
  }
}

export default HtmlWidget;
