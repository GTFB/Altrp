import React, { Component } from "react";


class NotificationsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
      
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    
  }

  onClick(e) {
    console.log(e);
  }

  render() {
   return <div onClick={this.onClick}>
    notifications 2
    </div>
  }
}

export default NotificationsWidget;
