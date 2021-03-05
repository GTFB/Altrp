import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import Select from "react-select";

import Chevron from "../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../store/store";
import {setCurrentRobot} from "../../../store/current-robot/actions";
import Resource from "../../../../../../editor/src/js/classes/Resource";

export default class RobotSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelOptions: [],
    }
    this.toggleChevron = this.toggleChevron.bind(this);
    this.modelOptionsResource = new Resource({ route: '/admin/ajax/models_without_preset' });
  }

  async componentDidMount() {
    const model = await this.modelOptionsResource.getAll();
    this.setState(s =>({...s, modelOptions: model.options }));
  }

  changeSelect = (e, type) => {
    let robot = this.props.robot;
    robot[type] = e.target.value;
    store.dispatch(setCurrentRobot(robot));
  }

  toggleChevron(type) {
    console.log(type);
  }
 
  render() {
    const {modelOptions} = this.state;
    const model = this.props.robot?.model_id ?? '';
    const start = this.props.robot?.start_condition ?? '';

    const startOptions = model ? [
      {label:'created', value: 'created'},
      {label:'updated', value: 'updated'},
      {label:'deleted', value: 'deleted'},
      {label:'logged_in', value: 'logged_in'},
      {label:'action', value: 'action'}
    ] : [
      {label:'logged_in', value: 'logged_in'},
      {label:'action', value: 'action'}
    ];

    return (
      <div className="panel settings-panel d-flex">
        <div className="settings-controllers">
          <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
            <div id="settingsControllers">
              <div>

                <div className="settings-section open">
                  <div className="settings-section__title d-flex">
                    <div className="settings-section__icon d-flex">
                      <Chevron />
                    </div>
                    <div className="settings-section__label">Settings Robot</div>
                  </div>

                  <div className="controllers-wrapper">
                      <div className="controller-container controller-container_select">
                        <div className="controller-container__label control-select__label controller-label">Model</div>
                        <div className="control-container_select-wrapper controller-field">
                          <select className="control-select control-field"
                              value={model || ''}
                              onChange={e => {this.changeSelect(e, "model_id")}}
                          >
                              <option disabled value="" />
                              {modelOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                          </select>
                        </div>
                      </div>

                      <div className="controller-container controller-container_select" >
                        <div className="controller-container__label control-select__label controller-label">Start</div>
                        <div className="control-container_select-wrapper controller-field">
                          <select className="control-select control-field"
                              value={start || ''}
                              onChange={e => {this.changeSelect(e, "start_condition")}}
                          >
                              <option disabled value="" />
                              {startOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                          </select>
                        </div>
                      </div>
                  </div> {/* ./controllers-wrapper */}
                </div> {/* ./settings-section */}

              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
