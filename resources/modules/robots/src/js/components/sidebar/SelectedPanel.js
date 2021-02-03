import * as React from "react";

import Scrollbars from "react-custom-scrollbars";
import {isNode} from 'react-flow-renderer';

import Chevron from "../../../../../editor/src/svgs/chevron.svg";
import Send from "./data/Send"
import Crud from "./data/Crud"
import store from "../../store/store"
import {setUpdatedNode} from "../../store/robot-settings/actions"

export default class SelectedPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  changeInput = e =>{
    let selected = this.props.selected;
    selected.data.label = e.target.value;
    store.dispatch(setUpdatedNode(selected));
  }
  
  render() {
    return (
      <div className="panel settings-panel d-flex">
        <div className="settings-controllers">
          <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
            <div id="settingsControllers">
              <div className="settings-section open">
                <div className="settings-section__title d-flex">
                  <div className="settings-section__icon d-flex">
                    <Chevron />
                  </div>
                  <div className="settings-section__label">Настройки</div>
                </div>
                {this.props.selected?.id ? (
                  <div className="controllers-wrapper">
                    <div className="controller-container controller-container_textarea">
                      <div className="controller-container__label">Text</div>
                      <input
                        type="text"
                        onChange={(e) => { this.changeInput(e) }}
                        value={ this.props.selected.data?.label }
                      ></input>
                    </div>
                    {(this.props.selected?.type === "action") && <div>
                        <Send selected={this.props.selected || []}/>
                        {/* <Crud data={this.props.nodes[this.props.selected.id]?.properties.data || []}/> */}
                      </div>}
                  </div>
                ) : (
                  "Select a node to edit"
                )}
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
