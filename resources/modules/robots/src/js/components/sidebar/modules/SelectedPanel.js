import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import Action from "./data/Action"
import ConditionNode from "./data/ConditionNode"
import RobotNode from "./data/RobotNode"
import Bot from "./data/Bot"
import StartNode from "./data/StartNode"
import Edge from "./data/Edge"
import store from "../../../store/store"
import { setUpdatedNode, setRobotSettingsData } from "../../../store/robot-settings/actions"
import Chevron from "../../../../../../editor/src/svgs/chevron.svg";
// import {setCurrentRobot} from "../../../store/current-robot/actions"
// import Resource from "../../../../../../editor/src/js/classes/Resource";
// import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";

export default class SelectedPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startConditionOptions: [],
      activeSection: "general",
    }
    this.toggleChevron = this.toggleChevron.bind(this);
  }

  changeInput(e){
    const value = e.target.value;
    let node = {};
    if(this.props.selectNode) {
      node = this.props.selectNode;
      node.data.label = value;
    }
    if(this.props.selectEdge) {
      node = this.props.selectEdge;
      console.log(node.data);
      if(!node.data) node.data = {};
      node.data.text = value;
    }
    store.dispatch(setUpdatedNode(node));

    // вызов принудительного рендера flow
    const elements = store.getState()?.robotSettingsData;
    const newElements = _.cloneDeep(elements);
    store.dispatch(setRobotSettingsData(newElements));

  }

  changeSelectEdge(e, type){
    let node = this.props.selectEdge;
    node[type] = e.value;
    store.dispatch(setUpdatedNode(node));
  }

  toggleChevron(type) {
    console.log(type);
  }

  render() {

    return (
      <div className="panel settings-panel d-flex">
        <div className="panel-tabs d-flex">
        </div>

        <div className="settings-controllers">
          <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
            <div id="settingsControllers">
                {(this.props.selectNode?.id || this.props.selectEdge?.id) ? (
                  <div>
                    <div className={"settings-section " + (this.state.activeSection === "general" ? 'open' : '')}>
                      <div className="settings-section__title d-flex" onClick={() => this.toggleChevron("general")}>
                        <div className="settings-section__icon d-flex">
                          <Chevron />
                        </div>
                        <div className="settings-section__label">Settings </div>
                      </div>
                      <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
                      {this.props.selectNode && <div className="controller-container controller-container_textarea">
                        <div className="controller-container__label control-select__label controller-label" >Name</div>
                        <textarea
                          className="control-field controller-field"
                          type="text"
                          // rows="3"
                          style={{lineHeight: '125%'}}
                          onChange={(e) => { this.changeInput(e) }}
                          value={ this.props.selectNode.data?.label }
                        />
                      </div>}
                      {this.props.selectEdge && <Edge
                                                  robot={ this.props.robot }
                                                  selectEdge={this.props.selectEdge || []}
                                                />}
                      </div>
                    </div>

                      {(this.props.selectNode?.type === "documentAction" ||
                        this.props.selectNode?.type === "crudAction" ||
                        this.props.selectNode?.type === "apiAction" ||
                        this.props.selectNode?.type === "messageAction") && <Action
                                                                        activeSection={this.state.activeSection}
                                                                        toggleChevron={this.toggleChevron}
                                                                        robot={ this.props.robot }
                                                                        selectNode={this.props.selectNode || []}
                                                                      />}
                      {(this.props.selectNode?.type === "condition") && <ConditionNode
                                                                          activeSection={this.state.activeSection}
                                                                          toggleChevron={this.toggleChevron}
                                                                          robot={ this.props.robot }
                                                                          selectNode={this.props.selectNode || []}
                                                                        />}
                      {(this.props.selectNode?.type === "robot") && <RobotNode
                                                                      activeSection={this.state.activeSection}
                                                                      toggleChevron={this.toggleChevron}
                                                                      robot={ this.props.robot }
                                                                      selectNode={this.props.selectNode || []}
                                                                    />}
                      {(this.props.selectNode?.type === "bot") && <Bot
                                                                      activeSection={this.state.activeSection}
                                                                      toggleChevron={this.toggleChevron}
                                                                      robot={ this.props.robot }
                                                                      selectNode={this.props.selectNode || []}
                                                                    />}
                      {(this.props.selectNode?.type === "start") && <StartNode
                                                                      activeSection={this.state.activeSection}
                                                                      toggleChevron={this.toggleChevron}
                                                                      robot={ this.props.robot }
                                                                      selectNode={this.props.selectNode || []}
                                                                    />}

                  </div> ) : (<div className="controllers-wrapper">
                    Select a node or edge to edit
                  </div>)}
              </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
