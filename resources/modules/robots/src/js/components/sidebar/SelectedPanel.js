import * as React from "react";

import Scrollbars from "react-custom-scrollbars";
import {isNode} from 'react-flow-renderer';

import Chevron from "../../../../../editor/src/svgs/chevron.svg";
import Send from "./data/Send"
import Crud from "./data/Crud"
import store from "../../store/store"
import {setUpdatedNode} from "../../store/robot-settings/actions"
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";


export default class SelectedPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  changeInput = e =>{
    let selected = this.props.selected;
    selected.data.label = e.target.value;
    store.dispatch(setUpdatedNode(selected));
  }

  changeSelect = e =>{
    let selected = this.props.selected;
    selected.data.props.nodeData.type = e.value;
    selected.data.props.nodeData.data = {};
    store.dispatch(setUpdatedNode(selected));
  }
  
  render() {
    const typeOptions = [
      {label:'Send Mail', value: 'send_mail'},
      {label:'Send Notification', value: 'send_notification'},
      {label:'CRUD', value: 'crud'}
    ];
    const typeAction = this.props.selected.data?.props?.nodeData?.type ?? '';
    // console.log(this.props.selected);
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
                      <div className="controller-container controller-container_textarea">
                          <div className="controller-container__label">Method</div>
                          <AltrpSelect id="type-action"
                                          value={_.filter(typeOptions, item => typeAction === item.value)}
                                          onChange={e => {this.changeSelect(e)}}
                                          options={typeOptions} />
                      </div>
                        {/* <Send selected={this.props.selected || []}/> */}
                        {(this.props.selected?.data?.props?.nodeData?.type === "crud") && <Crud selected={this.props.selected || []}/>}
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
