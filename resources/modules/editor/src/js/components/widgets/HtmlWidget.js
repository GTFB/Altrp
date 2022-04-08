
class HtmlWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }

  render() {
    let data = this.getLockedContent("data");
    return (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: data
          }}
        ></div>
      </>
    );
  }
}

export default HtmlWidget;
