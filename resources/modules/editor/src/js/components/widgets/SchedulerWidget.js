const {Scheduler} = window.altrpLibs.devextreme

class SchedulerWidget extends Component {
  constructor(props) {
    super(props)

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }

  render() {
    const {View, Editing} = Scheduler;

    return (
      <Scheduler.default editing={false} defaultCurrentView='month' >
        <View type="day" />
        <View type="week" />
        <View type="month" />
      </Scheduler.default>
    );
  }
}

export default SchedulerWidget;