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
    Echo.channel("notification." + 1).listen("SendNotifications", e => {
      console.log(e);
      this.setState(s => ({
        ...s,
        notified: true,
        noticeObject: e
      }));
      setTimeout(() => {
        this.setState(s => ({
          ...s,
          notified: false,
          noticeObject: {}
        }));
      }, 2000);
    });
  }

  onClick(e) {
    console.log(e);
  }

  render() {
    let wrapperClasses = "altrp-heading-wrapper";
    let advancedHeading = "";
   return (
    <>
      {this.state.notified && <div>{this.state.noticeObject}</div>}
      <div className={wrapperClasses}> Notifications !!!        
      </div>
    </>
  );
  }
}

export default NotificationsWidget;
