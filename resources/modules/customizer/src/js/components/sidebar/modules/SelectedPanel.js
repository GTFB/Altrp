import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import CustomizerNode from "./data/CustomizerNode"
import StartNode from "./data/StartNode"
import Edge from "./data/Edge"
import store from "../../../store/store"
import { setUpdatedNode, setCustomizerSettingsData } from "../../../store/customizer-settings/actions"
import Chevron from "../../../../../../editor/src/svgs/chevron.svg";
import SwitchNode from "./data/SwitchNode";
import ChangeNode from "./data/ChangeNode";
import ReturnNode from "./data/ReturnNode";
import {connect} from "react-redux";
import mutate from "dot-prop-immutable";
// import {setCurrentCustomizer} from "../../../store/current-customizer/actions"
// import Resource from "../../../../../../editor/src/js/classes/Resource";
// import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";

 class SelectedPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startConditionOptions: [],
      activeSection: "general",
    }
    this.toggleChevron = this.toggleChevron.bind(this);
  }

   changeByPath = (e, path) => {
     let node = this.getNode();
     let value = _.isString(e?.target?.value) ? e.target.value : e;
     node = mutate.set(node, `data.${path}`, value)
     store.dispatch(setUpdatedNode(node));
   }

   getNode(){
     let node =  this.props.customizerSettingsData?.find(n=>{
       return this.props.selectNode?.id == n.id
     });
     if( ! node && this.props.selectEdge){
       node= this.props.selectEdge
     }
     return node;
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
      if(!node.data) node.data = {};
      node.data.text = value;
    }
    store.dispatch(setUpdatedNode(node));

    // вызов принудительного рендера flow
    const elements = store.getState()?.customizerSettingsData;
    const newElements = _.cloneDeep(elements);
    store.dispatch(setCustomizerSettingsData(newElements));

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
    const node =this.getNode();
    const {label = ''} = node?.data || {};
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
                          onChange={(e) => { this.changeByPath(e, 'label') }}
                          value={ label }
                        />
                      </div>}
                      {this.props.selectEdge && <Edge
                                                  customizer={ this.props.customizer }
                                                  selectEdge={this.props.selectEdge || []}
                                                />}
                      </div>
                    </div>
                      {/*{(this.props.selectNode?.type === "switch") && <SwitchNode*/}
                      {/*                                                    activeSection={this.state.activeSection}*/}
                      {/*                                                    toggleChevron={this.toggleChevron}*/}
                      {/*                                                    customizer={ this.props.customizer }*/}
                      {/*                                                    selectNode={this.props.selectNode || []}*/}
                      {/*                                                  />}*/}
                      {/*{(this.props.selectNode?.type === "return") && <ReturnNode*/}
                      {/*                                                    activeSection={this.state.activeSection}*/}
                      {/*                                                    toggleChevron={this.toggleChevron}*/}
                      {/*                                                    customizer={ this.props.customizer }*/}
                      {/*                                                    selectNode={this.props.selectNode || []}*/}
                      {/*                                                  />}*/}
                      {/*{(this.props.selectNode?.type === "change") && <ChangeNode*/}
                      {/*                                                    activeSection={this.state.activeSection}*/}
                      {/*                                                    toggleChevron={this.toggleChevron}*/}
                      {/*                                                    customizer={ this.props.customizer }*/}
                      {/*                                                    selectNode={this.props.selectNode || []}*/}
                      {/*                                                  />}*/}
                      {/*{(this.props.selectNode?.type === "customizer") && <CustomizerNode*/}
                      {/*                                                activeSection={this.state.activeSection}*/}
                      {/*                                                toggleChevron={this.toggleChevron}*/}
                      {/*                                                customizer={ this.props.customizer }*/}
                      {/*                                                selectNode={this.props.selectNode || []}*/}
                      {/*                                              />}*/}
                      {/*{(this.props.selectNode?.type === "start") && <StartNode*/}
                      {/*                                                activeSection={this.state.activeSection}*/}
                      {/*                                                toggleChevron={this.toggleChevron}*/}
                      {/*                                                customizer={ this.props.customizer }*/}
                      {/*                                                selectNode={this.props.selectNode || []}*/}
                      {/*                                              />}*/}
                    {this.props.nodeState.filter(item => this.props.selectNode?.type === item.name).map(obj => {
                      return (
                        <obj.selectedNode
                          key={obj.name}
                          activeSection={this.state.activeSection}
                          toggleChevron={this.toggleChevron}
                          customizer={ this.props.customizer }
                          selectNode={this.props.selectNode || []}
                        />
                      )
                    })}
                  </div> )
                  : (<div className="controllers-wrapper">
                    Select a node or edge to edit
                  </div>)}
              </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    customizerSettingsData: state.customizerSettingsData,
    nodeState: state.nodeStoreData.nodes
  }
}
export default connect(mapStateToProps)(SelectedPanel)
