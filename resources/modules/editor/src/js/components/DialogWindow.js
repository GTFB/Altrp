import React, { Component } from 'react';
import Logo from "../../svgs/logo.svg";
import '../../sass/dialog-content.scss'
import DialogTab from './DialogTab';
import DialogConditionsTab from './DialogConditionsTab';

class DialogWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'Conditions',
      tabs: [
        { image: 'Image', title: 'Conditions', desc: 'Apply current template to these pages' },
        { image: 'Image', title: 'Triggers', desc: 'What action the user needs to do for the popup to open.' },
        { image: 'Image', title: 'Advanced Rules', desc: 'Requirements that have to be met for the popup to open.' },
      ],
    }
  }

  handleOpen(title) {
    this.setState({
      activeTab: title,
    })
  };

  handleClose() {
    console.log('closed');
    // this.setState({
    //   open: false,
    // })
  };

  render() {

    return (
      <div className="modal-overlay">
        <div className="modal-window">
          <div className="modal-header">
            <Logo className="modal-header__logo" />
            <button onClick={() => this.handleClose()}>X</button>
          </div>
          <div className="modal-body">
            <div className="modal-body__tabs">
              {
                this.state.tabs.map((tab, index) => {
                  return <div key={index} onClick={() => this.handleOpen(tab.title)}>
                    <DialogTab active={this.state.activeTab === tab.title ? true : false} tab={tab} />
                  </div>
                })
              }
            </div>
            <div className="modal-body__content">
              {
                (this.state.activeTab === 'Conditions' && <DialogConditionsTab /> ||
                  this.state.activeTab === 'Triggers' && <div>Triggers</div> ||
                  this.state.activeTab === 'Advanced Rules' && <div>Advanced Rules</div>
                )
              }
            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-footer__button modal-save">Save & close</button>
            <button className="modal-footer__button modal-next">Next</button>
          </div>
        </div>
      </div>
    )
  }
};

export default DialogWindow;