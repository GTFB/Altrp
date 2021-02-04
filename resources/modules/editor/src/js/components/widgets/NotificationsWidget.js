import React, { Component } from "react";

class NotificationsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      notified: false,
      noticeObject: {}
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  componentWillMount() {
    //Этот слушатель вешается на компонент при его создании,
    //сюда из this.props.element.getSettings() передавайте в значения ниже
    const channelName = "notifications.users"; // вбил для примера
    const eventName = "SendNotifications"; // вбил для примера
    //После этого происходит прослушивание канала, и если сервер выкидывает в канал изменения,
    //то через параметр {e} вы вытащите нужные данные
    Echo.channel(channelName).listen(eventName, e => {
      console.log(this.props.element.getSettings());
      console.log(e);
      const user = JSON.stringify(e.user);
      this.setState(s => ({ ...s, noticeObject: user, notified: true }));
      //Уведомление исчезнет через 10 секунд
      setTimeout(() => {
        this.setState(s => ({ ...s, noticeObject: "", notified: false }));
      }, 10000);
    });
  }

  onClick(e) {
    console.log(e);
  }

  render() {
    let wrapperClasses = "altrp-notifications-wrapper";
    return (
      <>
        {this.state.notified && <div>{this.state.noticeObject}</div>}
        <div className={wrapperClasses}> Notifications !!!</div>
      </>
    );
  }
}

export default NotificationsWidget;
