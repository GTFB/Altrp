import React, { Component } from "react";
import NotificationIcon from "../../../svgs/notification.svg";
import "../../../sass/altrp-notifications.scss";

class NotificationsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      model: false,
      notified: false,
      noticeObject: {},
      noticeArray: [],
      countMessages: false,
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.onClickIcon = this.onClickIcon.bind(this);
    this.onClickMessage = this.onClickMessage.bind(this);
  }

  componentWillMount() {

    console.log(this.state.settings);

    if (typeof this.state.settings.repeaterModels === "object") {

      // Проверка на наличие добавленного репитера
      if(!this.state.settings.repeaterModels.length) {
        console.log('не настроен виджет Notifications');
        return;
      }

      this.state.settings.repeaterModels.forEach(item => {

        // Проверка на наличие выбранной модели
        if(!item.model.dataSource || !item.model.dataSource.label){
          console.log('не настроена модель в виджете Notifications');
          return;
        }
        // Имя модели
        const modelName = item.model.dataSource.label;
        // Канал
        let channelName = `altrpchannel.${modelName}`;
        // Ивент с его неймспейсом
        let eventName = `.App\\Events\\AltrpEvents\\${modelName}Event`;

        // Подключение слушателя
        Echo.channel(channelName).listen(eventName, e => {
          const data = e[_.keys(e)[0]]; // {text:'value', ...:..., ...}

          // console.log(e, "eX");
          // console.log(data, "dataX");

          const text = item.text;
          const subtext = item.subtext;

          const noticeObject = {
            text: _.get(data, text),
            subtext: _.get(data, subtext)
          };

          // console.log(noticeObject, "noticeObjectX");


          this.setState(s => ({ ...s, noticeObject: noticeObject, noticeArray: [...s.noticeArray, noticeObject] }));

          let countMessages = this.state.noticeArray.length;
          console.log(countMessages);

          this.setState(s => ({ ...s, countMessages: countMessages, notified: true }));

          console.log(JSON.stringify(e));
          console.log(this.state.noticeArray);

          //Уведомление исчезнет через 5 секунд
          setTimeout(() => {
            this.setState(s => ({ ...s, noticeObject: "", notified: false }));
          }, 5000);
        });
      });
    }
  }

  onClickIcon() {
    let notified = this.state.notified;
    this.setState(s => ({ ...s, notified: !notified}));
    // console.log('open: ' + !notified);
  }

  onClickMessage(notification) {
    if (!this.state.notified) return;
    let noticeArray = this.state.noticeArray;
    // this.setState(s => ({ ...s, noticeArray: [...s.noticeArray, notification]}));
    console.log('message: ' + notification);
  }

  render() {
    let wrapperClasses = "altrp-notification-wrapper";

    return (
      <>        
        <div className={wrapperClasses}>

          <a href="#" className="box-notification-icon" onClick={this.onClickIcon}>
            <NotificationIcon className="notification-icon"/>
            {this.state.countMessages && <span className="count-messages">{this.state.countMessages}</span>}
          </a>
          <ul className="box-notification-messages">
            {this.state.notified && this.state.countMessages && this.state.noticeArray.map((notification, index) => <li className="notification-message" onClick={this.onClickMessage(notification)} key={index}>
              <div>Новое уведомление:</div>
              {notification.text && <p>Field 1: {notification.text}</p>}
              {notification.subtext && <p>Field 2: {notification.subtext}</p>}
            </li>)}
          </ul>

        </div>
      </>
    );
  }
}

export default NotificationsWidget;
