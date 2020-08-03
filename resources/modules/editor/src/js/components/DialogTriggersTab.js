import React, { Component } from 'react';
import '../../sass/dialog-content.scss';
import { iconsManager } from '../../../../front-app/src/js/helpers';

export default class DialogTriggersTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trigger: [
        { icon: 'icon', }
      ]
    }
  }
  render() {
    return (
      <div className="modal-triggers-tab">

      </div>
    )
  }
};
