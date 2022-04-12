
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

  render() {
    let data = this.props.element.getResponsiveLockedSetting("data");

    return (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: data
          }}
        />
      </>
    );
  }
}

export default HtmlWidget;
