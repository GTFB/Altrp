import AltrpTemplate from'../altrp-template/AltrpTemplate';

class TemplateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateGUID: this.props.element.getSettings('template'),
    };
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }

  render() {
    //console.log(this.props.element.getSettings());
    return <AltrpTemplate settings={this.props.element.getSettings() || {}}/>
  }
}

export default TemplateWidget
