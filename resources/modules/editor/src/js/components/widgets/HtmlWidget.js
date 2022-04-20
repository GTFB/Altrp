
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
  render() {
    let data = this.getLockedContent("data");
    this.data = data
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
