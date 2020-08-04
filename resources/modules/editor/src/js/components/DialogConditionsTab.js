import React, { Component } from 'react';
import '../../sass/dialog-content.scss';
import { iconsManager } from '../../../../front-app/src/js/helpers';

export default class DialogConditionsTab extends Component {
  render() {
    return (
      <div className="modal-condition-tab">
        <div className="modal-condition-image">
          {
            iconsManager().renderIcon('conditions_tab')
          }
        </div>
        <div className="modal-condition-title">Where Do You Want to Display Your Template?</div>
        <div className="modal-condition-text">
          Set the conditions that determine where your Template is used throughout your site.<br />
          For example, choose 'Entire Site' to display the template across your site.
        </div>
        <div className="modal-condition-button-wrapper">
          <button className="modal-condition-button">Add condition</button>
        </div>
        
        <div className="modal-footer">
            <button className="modal-footer__button modal-save">Save & close</button>
            <button className="modal-footer__button modal-next">Next</button>
          </div>
      </div>
    )
  }
};
