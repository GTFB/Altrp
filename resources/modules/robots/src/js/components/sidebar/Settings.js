import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import Chevron from "../../../../../editor/src/svgs/chevron.svg";
import store from "../../store/store"
import {setCurrentRobot} from "../../store/current-robot/actions"
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import Resource from "../../../../../editor/src/js/classes/Resource";

export default class Settings extends React.Component {
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

  robotSelect = (e, type) => {
    let robot = this.props.robot;
    robot[type] = e.value;
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
                <div className={"settings-section "}>
                  <div className="settings-section__title d-flex">
                    <div className="settings-section__icon d-flex">
                      <Chevron />
                    </div>
                    <div className="settings-section__label">Настройки Робота</div>
                  </div>
                </div>
                <div className="controllers-wrapper">
                    <div className="controller-container controller-container_textarea">
                    <div className="controller-container__label">Model</div>
                    <AltrpSelect id="model_id"
                        value={_.filter(modelOptions, item => model === item.value)}
                        onChange={e => {this.robotSelect(e, "model_id")}}
                        options={modelOptions}
                    />
                    </div>
                    <div className="controller-container controller-container_textarea">
                    <div className="controller-container__label">Start condition</div>
                    <AltrpSelect id="start_condition"
                        value={_.filter(startOptions, item => start === item.value)}
                        onChange={e => {this.robotSelect(e, "start_condition")}}
                        options={startOptions}
                    />
                    </div>
                </div>
                </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
