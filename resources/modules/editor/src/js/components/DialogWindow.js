import React, { Component } from 'react';
import Logo from "../../svgs/logo.svg";
import '../../sass/dialog-content.scss'
import DialogTab from './DialogTab';
import DialogConditionsTab from './DialogConditionsTab';
import DialogTriggersTab from './DialogTriggersTab';

class DialogWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'Conditions',
      tabs: [
        { icon: 'conditions_tab', title: 'Conditions', desc: 'Apply current template to these pages' },
        { icon: 'triggers_tab', title: 'Triggers', desc: 'What action the user needs to do for the popup to open.' },
        { icon: 'triggers_tab', title: 'Advanced Rules', desc: 'Requirements that have to be met for the popup to open.' },
      ],
      
    }
  }

  handleOpen(title) {
    this.setState({
      activeTab: title,
    })
  };
  
  handleClose() {
    this.props.showModalWindow()
  };

  renderSwitch(activeTab) {
    switch (this.state.activeTab) {
      case 'Conditions':
        return <DialogConditionsTab />
      case 'Triggers':
        return <DialogTriggersTab />
      case 'Advanced Rules':
        return <div>ADVANCED</div>
      default:
        return null;
    }
  }

  // (this.state.activeTab === 'Conditions' && <DialogConditionsTab /> ||
  //   this.state.activeTab === 'Triggers' && <div>Triggers</div> ||
  //   this.state.activeTab === 'Advanced Rules' && <div>Advanced Rules</div>
  // )

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
                  return <div key={tab.title} onClick={() => this.handleOpen(tab.title)}>
                    <DialogTab active={this.state.activeTab === tab.title ? true : false} tab={tab} />
                  </div>
                })
              }
            </div>
            <div className="modal-body__content">
              {this.renderSwitch(this.state.activeTab)}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default DialogWindow;