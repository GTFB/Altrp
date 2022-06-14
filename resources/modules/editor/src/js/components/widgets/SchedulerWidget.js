import Resource from '../../classes/Resource';
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import ruLocale from '@fullcalendar/core/locales/ru'
import enLocale from '@fullcalendar/core/locales/en-gb'
import {InputGroup, TextArea} from '@blueprintjs/core'



class SchedulerWidget extends Component {
  constructor(props) {
    super(props)

    const settings = props.element.getSettings()

    this.state = {
      startEvents: [],
      settings: settings,
      popup: {
        status: null
      }
    }

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }

    this.popupLocalization = {
      'en-gb': {
        create: 'Create',
        cancel: 'Cancel',
        title: 'Title',
        delete: 'Delete',
        done: 'Done'
      },
      ru: {
        create: 'Создать',
        cancel: 'Отменить',
        title: 'Название',
        delete: 'Удалить',
        done: 'Закончить'
      }
    }

    this.calendar = React.createRef();
  }

  getFormattedEvents = async () => {
    const getUrl = this.props.element.getResponsiveLockedSetting('get_url')

    if (!getUrl) {
      return []
    }

    const resource = new Resource({route: getUrl, dynamicURL: true});

    const {data} = await resource.getAll();

    const formattedData = data.map(el => {
      if (el.end === '0000-00-00 00:00:00') {
        delete el.end

        if (el.start.indexOf('00:00:00') !== -1) {
          el.start = el.start.substr(0, 10)
        }
      }

      return el
    })

    return formattedData
  }


  _componentDidMount = async () => {

    const formattedData = await this.getFormattedEvents()
    this.setState({
      startEvents: formattedData
    });
  }

  closePopup = () => {
    this.setState({
      popup: {
        status: null
      }
    })
  }

  dateClickHandler = async e => {
    this.setState({
      popup: {
        status: 'create',
        payload: {
          event: e
        },
        formData: {}
      }
    })
  }

  createEvent = async e => {
    e.preventDefault()

    const resource = new Resource({route: this.state.settings.create_url, dynamicURL: true});

    const event = {
      ...this.state.popup.formData,
      start: this.state.popup.payload.event.dateStr
    }

    const res = await resource.post(event);

    const newEvents = await this.getFormattedEvents()

    this.setState({
      startEvents: newEvents
    })

    this.closePopup()
  }

  eventChangeHandler = async e => {
    try {
      const resource = new Resource({route: this.state.settings.update_url, dynamicURL: true});
      const event = JSON.parse(JSON.stringify(e.event))

      const {id} = event

      const res = await resource.put(+id, {
        start: event.start,
        end: event.end
      });
    } catch (error) {
      console.log({error});
    }
  }

  openEvent = e => {
    const event = JSON.parse(JSON.stringify(e.event));
    this.setState({
      popup: {
        status: 'edit',
        payload: {
          event: e.event
        },
        formData: {
          ...event,
          ...event.extendedProps
        }
      }
    })
  }

  editEvent = async e => {
    e.preventDefault()

    const resource = new Resource({route: this.state.settings.update_url, dynamicURL: true});
    const event = this.state.popup.formData

    const id = this.state.popup.payload.event.id

    const api = this.calendar.current.getApi()

    let currentEvent = JSON.parse(JSON.stringify(this.state.popup.payload.event))
    currentEvent = {...currentEvent, ...currentEvent.extendedProps}

    for (const key in event) {
      currentEvent[key] = event[key]
    }

    delete currentEvent.extendedProps
    delete currentEvent.updated_at
    delete currentEvent.deleted_at
    delete currentEvent.created_at
    const res = await resource.put(+id, currentEvent);

    this.setState({
      startEvents: api.getEvents().map(el => {
        if (el.id == currentEvent.id) {
          return currentEvent
        }

        return el
      })
    })

    this.closePopup()
  }

  deleteEvent = async () => {
    const resource = new Resource({route: this.state.settings.update_url, dynamicURL: true});
    const eventId = this.state.popup.payload.event.id
    this.closePopup()

    this.state.popup.payload.event.remove()

    await resource.delete(eventId)
  }

  eventInputHandler = e => {
    this.setState({
      popup: {
        ...this.state.popup,
        formData: {
          ...this.state.popup.formData,
          [e.target.name]: e.target.value
        }
      }
    })
  }

  /**
   * Получить css классы для scheduler widget
   */
  getClasses = ()=>{
    let classesState = ``;
    if(this.isActive()){
      classesState += 'active '
    }
    if(this.isDisabled()){
      classesState += 'state-disabled '
    }
    return classesState;
  }

  render() {
    let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    const lang = this.props.element.getResponsiveLockedSetting('lang', '', 'en-gb')
    const popupText = this.popupLocalization[lang]
    return (
      <div className={`${classes} popup-wrapper`}>
        <FullCalendar
          locale={locales[lang]}
          plugins={[dayGridPlugin, interaction, timeGridPlugin]}
          initialView='dayGridMonth'
          events={this.state.startEvents}
          editable={true}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth'
          }}
          dateClick={this.dateClickHandler}
          eventClick={this.openEvent}
          eventChange={this.eventChangeHandler}
          ref={this.calendar}
        />

        {!!this.state.popup.status && <div className={`${classes} popup`}>
            <form onSubmit={() => {this.state.popup.status === 'create' ? this.createEvent() : this.editEvent()}}>
              <div className={`${classes} popup__body`}>
                <div className={`${classes} popup__field-title`}>
                  {popupText?.title}
                </div>
                <InputGroup type="text" name="title" onChange={this.eventInputHandler} className={`${classes} popup__text-field`} value={this.state.popup.formData.title || ''} />

                {this.state.settings.repeater_fields_section?.map(el => <div key={el.field_name_repeater}>
                  <div className={`${classes} popup__field-title`}>
                    {el.label_repeater}
                  </div>
                  {(el.input_type_repeater === 'text' || !el.input_type_repeater) && (
                    <InputGroup type="text" name={el.field_name_repeater} onChange={this.eventInputHandler} className={`${classes} popup__text-field`} value={this.state.popup.formData[el.field_name_repeater] || ''} />
                  )}
                  {el.input_type_repeater ==='textarea' && (
                    <TextArea name={el.field_name_repeater} onChange={this.eventInputHandler} className={`${classes} popup__text-field popup__textarea`} value={this.state.popup.formData[el.field_name_repeater] || ''}></TextArea>
                  )}
                </div>)}
              </div>
              <div className={`${classes} popup__actions`}>
                {this.state.popup.status == 'create'
                  ? <input type="button" className={`${classes} button`} value={popupText.create} onClick={this.createEvent} />
                  : <input type="button" className={`${classes} button`} value={popupText.done} onClick={this.editEvent} />
                }
                <input type="button" className={`${classes} button`} value={popupText.cancel} onClick={this.closePopup} />
                {this.state.popup.status == 'edit' && <input type="button" className={`${classes} button button-danger`} value={popupText.delete} onClick={this.deleteEvent} />}
              </div>
            </form>
          </div>
        }
      </div>
    );
  }
}

export default SchedulerWidget;
