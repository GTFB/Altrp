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
  }

  onAppointmentAdding = async e => {
    const {appointmentData} = e;

    const resource = new Resource({route: this.state.settings.create_url, dynamicURL: true});

    const res = await resource.post({
      start_date: appointmentData.startDate,
      end_date: appointmentData.end_date
    });
  }

  onAppointmentDeleting = async e => {
    const {appointmentData} = e;

    const resource = new Resource({route: this.state.settings.delete_url, dynamicURL: true});

    const res = await resource.delete(appointmentData.id);
  }

  onAppointmentUpdating = async e => {
    const {newData} = e;

    console.log({newData});

    const resource = new Resource({route: this.state.settings.update_url, dynamicURL: true});

    const res = await resource.put(newData.id, {
      ...newData,
      start_date: newData.startDate,
      end_date: newData.endDate,
    });
  }

  _componentDidMount = async () => {
    const resource = new Resource({route: this.state.settings.get_url, dynamicURL: true});
    const {data} = await resource.getAll();

    this.setState({dataSource: data.map(item => ({
      startDate: item.start_date,
      endDate: item.end_date,
      ...item
    }))});
  }

  onAppointmentFormOpening = data => {
    const {form} = data;

    const settings = this.state.settings.repeater_fields_section || [];

    const fields = settings.map(el => ({
      label: {
        text: el.label_repeater
      },
      name: el.field_name_repeater,
      editorType: el.input_type_repeater,
      colSpan: 2
    }));

    console.log({fields});

    form.option('items', [
      {
        label: {
          text: 'Subject'
        },
        dataField: 'text',
        editorType: 'dxTextBox',
        editorOptions: {
          width: '100%',
        },
        colSpan: 2
      },
      {
        dataField: 'startDate',
        editorType: 'dxDateBox',
        editorOptions: {
          width: '100%',
          type: 'datetime'
        }
      }, 
      {
        name: 'endDate',
        dataField: 'endDate',
        editorType: 'dxDateBox',
        editorOptions: {
          width: '100%',
          type: 'datetime'
        }
      },
      ...fields,
    ]);
  }

  render() {
    const {View, Button} = Scheduler;

    return (
      <Scheduler.default 
        defaultCurrentView='month'
        onAppointmentAdding={this.onAppointmentAdding}
        onAppointmentDeleting={this.onAppointmentDeleting}
        onAppointmentUpdating={this.onAppointmentUpdating}
        onAppointmentFormOpening={this.onAppointmentFormOpening}
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