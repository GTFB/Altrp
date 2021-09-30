import Resource from '../../classes/Resource';

const {Scheduler} = window.altrpLibs.devextreme

class SchedulerWidget extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      dataSource: [],
      settings: props.element.getSettings()
    }

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
    
    this.getData();
  }

  onAppointmentAdding = async e => {
    const {appointmentData} = e;

    const resource = new Resource({route: this.state.settings.create_url, dynamicURL: true});

    const res = await resource.post({
      start_date: appointmentData.startDate,
      end_date: appointmentData.end_date,
      subject: appointmentData.text
    });
  }

  onAppointmentDeleting = async e => {
    const {appointmentData} = e;

    const resource = new Resource({route: this.state.settings.delete_url, dynamicURL: true});

    const res = await resource.delete(appointmentData.id);
  }

  onAppointmentUpdating = async e => {
    const {newData} = e;

    const resource = new Resource({route: this.state.settings.update_url, dynamicURL: true});

    console.log({newData});

    const res = await resource.put(newData.id, {
      ...newData,
      start_date: newData.startDate,
      end_date: newData.endDate,
      subject: newData.text,
    });
  }

  getData = async () => {
    const resource = new Resource({route: this.state.settings.get_url, dynamicURL: true});
    const {data} = await resource.getAll();

    this.setState({dataSource: data.map(item => ({
      startDate: item.start_date,
      endDate: item.end_date,
      text: item.subject,
      ...item
    }))});
  }

  render() {
    const {View, Button} = Scheduler;

    return (
      <Scheduler.default 
        defaultCurrentView='month'
        onAppointmentAdding={this.onAppointmentAdding}
        onAppointmentDeleting={this.onAppointmentDeleting}
        onAppointmentUpdating={this.onAppointmentUpdating}
        dataSource={this.state.dataSource}
      >
        <View type="day" />
        <View type="week" />
        <View type="month" />
      </Scheduler.default>
    );
  }
}

export default SchedulerWidget;