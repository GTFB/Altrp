import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import Chevron from "../../../../../editor/src/svgs/chevron.svg";
import Send from "./data/Send"
import Condition from "./data/Condition"
import Crud from "./data/Crud"
import store from "../../store/store"
import {setUpdatedNode} from "../../store/robot-settings/actions"
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import Resource from "../../../../../editor/src/js/classes/Resource";

export default class SelectedPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: []
    }
    this.toggle = this.toggle.bind(this);
    this.resource = new Resource({ route: "/admin/ajax/robots_options" });
  }

  async componentDidMount() {
    const robots = await this.resource.getAll();
    this.setState(s =>({...s, robots }));
}

  changeInput(e){
    const value = e.target.value;
    let node = {};
    if(this.props.selected) {
      node = this.props.selected;
      node.data.label = value;
    }
    if(this.props.selectEdge) {
      node = this.props.selectEdge;
      console.log(node.data);
      if(!node.data) node.data = {};
      node.data.text = value;
    }
    store.dispatch(setUpdatedNode(node));
  }

  changeSelectEdge(e, type){
    let node = this.props.selectEdge;
    node[type] = e.value;
    store.dispatch(setUpdatedNode(node));
  }

  changeSelect = (e, type = false) =>{
    let node = this.props.selected;
    if(type === "robot"){
      node.data.props.nodeData.id = e.value;
    } else {
      switch(e.value){
        case "crud":
          node.data.props.nodeData = {
            "type": "crud",
            "data": {
                "method": "",
                "body": {},
                "record_id": null,
                "model_id": ""
            }
          };
          break;
        case "send_notification":
          node.data.props.nodeData = {
            "type": "send_notification",
            "data": {
                "entities": "",
                "channels": [
                    "broadcast",
                    "telegram",
                    "mail"
                ],
                "content": {
                  "broadcast": {
                    "message": ""
                  },
                  "telegram": {
                    "message": ""
                  },
                  "mail": {
                    "subject": "",
                    "message": ""
                  }
              }

            }
          };
          break;
      }
    }

    store.dispatch(setUpdatedNode(node));
  }

  toggle() {
    const node = this.props.selectEdge;
    console.log(node.animated);
    
    if(node.animated === undefined) node.animated = false;
    
    node.animated = !node.animated;
    console.log(node.animated);

    store.dispatch(setUpdatedNode(node));
  }
 
  render() {
    const actionTypeOptions = [
      {label:'Send Notification', value: 'send_notification'},
      {label:'CRUD', value: 'crud'}
    ];
    const edgeTypeOptions = [
      {label:'default', value: 'default'},
      {label:'straight', value: 'straight'},
      {label:'step', value: 'step'},
      {label:'smoothstep', value: 'smoothstep'},
      {label:'custom', value: 'custom'}
    ];
    const conditionTypeOptions = [];
    const robotOptions = this.state.robots ?? [];
    const typeData = this.props.selected.data?.props?.nodeData?.type ?? '';
    const robot = this.props.selected.data?.props?.nodeData?.id ?? '';
    const edge = this.props.selectEdge?.type ?? '';
    let value = (this.props.selectEdge?.animated === true) ?? false;
    let switcherClasses = `control-switcher control-switcher_${value ? 'on' : 'off'}`;

    console.log(this.props.selectEdge);
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
                {(this.props.selected?.id || this.props.selectEdge?.id) ? (
                  <div className="controllers-wrapper">
                    {this.props.selected && <div className="controller-container controller-container_textarea">
                      <div className="controller-container__label">Text</div>
                      <input
                        type="text"
                        onChange={(e) => { this.changeInput(e) }}
                        value={ this.props.selected.data?.label }
                      ></input>
                    </div>}
                    {(this.props.selected?.type === "action") && <div>
                      <div className="controller-container controller-container_textarea">
                          <div className="controller-container__label">Method</div>
                          <AltrpSelect id="type-action"
                              value={_.filter(actionTypeOptions, item => typeData === item.value)}
                              onChange={e => {this.changeSelect(e)}}
                              options={actionTypeOptions}
                          />
                      </div>
                        <Send selected={this.props.selected || []}/>
                        {(this.props.selected?.data?.props?.nodeData?.type === "crud") && <Crud selected={this.props.selected || []}/>}
                      </div>}
                    {(this.props.selected?.type === "condition") && <div>
                      <div className="controller-container controller-container_textarea">
                          <div className="controller-container__label">Type</div>
                          <AltrpSelect id="type-condition"
                              value={_.filter(conditionTypeOptions, item => typeData === item.value)}
                              onChange={e => {this.changeSelect(e)}}
                              options={conditionTypeOptions}
                          />
                      </div>
                        <Condition selectNode={this.props.selected || []}/>
                      </div>}
                    {(this.props.selected?.type === "robot") && 
                      <div className="controller-container controller-container_textarea">
                          <div className="controller-container__label">Robot</div>
                          <AltrpSelect id="type-robot"
                              value={_.filter(robotOptions, item => robot === item.value)}
                              onChange={e => {this.changeSelect(e, "robot")}}
                              options={robotOptions}
                          />
                      </div>}

                    {this.props.selectEdge && <div>
                        <div className="controller-container controller-container_textarea">
                            <div className="controller-container__label">Type</div>
                            <AltrpSelect id="type-edge"
                                value={_.filter(edgeTypeOptions, item => edge === item.value)}
                                onChange={e => {this.changeSelectEdge(e, "type")}}
                                options={edgeTypeOptions}
                            />
                        </div>
                        <div className="robot_switcher">
                            <div className="robot_switcher__label">
                                Animated
                            </div>
                            <div className={switcherClasses} onClick={this.toggle}>
                                <div className="control-switcher__on-text">ON</div>
                                <div className="control-switcher__caret" />
                                <div className="control-switcher__off-text">OFF</div>
                            </div>
                        </div>

                        <div className="controller-container__label">Text</div>
                        <input
                          type="text"
                          onChange={(e) => { this.changeInput(e) }}
                          value={ this.props.selectEdge?.data?.text ?? '' }
                        ></input>

                      </div>}
                  </div>
                  
                ) : (
                  "Select a node or edge to edit"
                )}
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
