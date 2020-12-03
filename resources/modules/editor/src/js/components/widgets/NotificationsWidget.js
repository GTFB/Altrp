import React, { Component } from "react";
import Query from "../../classes/Query";

class NotificationsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      model: false,
      notified: false,
      noticeObject: {}
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  componentWillMount() {

    let settings = this.props.element.getSettings('notifi_query');

    if (settings && typeof settings.dataSource !== 'undefined'){

      this.state.model = settings.dataSource.label;

      //Этот слушатель вешается на компонент при его создании,
      //сюда из this.props.element.getSettings() передавайте в значения ниже
      const channelName = "altrpchannel." + this.state.model;
      const eventName = ".App\\Events\\AltrpEvents\\" + this.state.model + "Event";
      //После этого происходит прослушивание канала, и если сервер выкидывает в канал изменения,
      //то через параметр {e} вы вытащите нужные данные
      console.log(channelName);
      console.log(eventName);

      Echo.channel(channelName).listen(eventName, e => {
        console.log(e);
        const notification = JSON.stringify(e);
        this.setState(s => ({ ...s, noticeObject: notification, notified: true }));
        //Уведомление исчезнет через 10 секунд
        setTimeout(() => {
          this.setState(s => ({ ...s, noticeObject: "", notified: false }));
        }, 10000);
      });
    }
  }

  onClick() {
    console.log('model: ' + this);
  }

  render() {
    let wrapperClasses = "altrp-notification-wrapper";

    return (
      <>
        <div className={wrapperClasses} onClick={this.onClick}>
          --------------------- <br/>

        {this.state.notified && <div>
          <p>Новое уведомление!!!</p>
          {this.state.noticeObject}
          </div>}
        {!this.state.model && <div>
          <p>Уведомления не настроены.</p>          
          </div>}
        
          ---------------------</div>
      </>
    );
  }
}

export default NotificationsWidget;
