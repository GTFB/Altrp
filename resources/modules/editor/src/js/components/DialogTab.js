import React, { Component } from 'react';
import '../../sass/dialog-content.scss'

class DialogTab extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={"modal-tab-wrapper " + (this.props.active ? 'modal-tab-wrapper-active' : '')}>
        <div className="modal-tab__image">{this.props.tab.image}</div>
        <div className="modal-tab__content">
          <div className="modal-tab__title">{this.props.tab.title}</div>
          <div className="modal-tab__description">{this.props.tab.desc}</div>
        </div>
      </div>
    )
  }
}

export default DialogTab;