import React from "react";
import Group from "../../../../other/Group";
import Repeater from "../../../../other/repeater/Repeater";
import store from "../../../../../../store/store";
import {setUpdatedNode} from "../../../../../../store/customizer-settings/actions";
import ControllerContainer from "../../../../other/ControllerContainer";


const DEFAULT_DATA = []
const BLOCK_MESSAGE_TYPE = [
  {
    label: "Message",
    value: "message",
  }
]


export default class Discord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.content = this.content.bind(this);

    if(!props.selectNode.data.props.nodeData?.data) {
      const node = props.selectNode

      node.data.props.nodeData = {
        data: _.cloneDeep(DEFAULT_DATA)
      }

      store.dispatch(setUpdatedNode(node));
    }
  }

  data() {
    return this.props.selectNode.data.props.nodeData?.data || DEFAULT_DATA
  }

  changeValue(value, name, key) {
    const node = this.props.selectNode;

    const block = node.data.props.nodeData?.data.find((elem) => elem.key === key);

    block[name] = value;

    store.dispatch(setUpdatedNode(node));
  }

  content(props) {
    return <>
      <ControllerContainer label="Type">
        <select
          className="control-select control-field"
          value={props.data.type}
          onChange={(e) => this.changeValue(e.target.value, "type", props.data.key)}
        >
          {BLOCK_MESSAGE_TYPE.map(option => {
            return  <option value={option.value} key={option.value} >
              {option.label}
            </option> })}
        </select>
      </ControllerContainer>
      <ControllerContainer label="Value">
        <textarea
          className="control-field"
          style={{
            minHeight: 120
          }}
          value={props.data.value}
          onChange={(e) => { this.changeValue(e.target.value, "value", props.data.key)}}
        />
      </ControllerContainer>
    </>
  }

  onDelete(key) {
    const node = this.props.selectNode;
    const data = node.data.props.nodeData.data;

    node.data.props.nodeData.data = data.filter((elem) => elem.key !== key);

    store.dispatch(setUpdatedNode(node));
  }

  onAdd() {
    const node = this.props.selectNode;

    const block = {
      key: new Date().getTime(),
      content: "",
      type: "message",
      value: ""
    };

    node.data.props.nodeData.data.push(block);

    store.dispatch(setUpdatedNode(node));
  }

  render() {
    const data = this.data()

    return <Group
      active={this.props.activeSection === "discord"}
      onClick={() => this.props.toggleChevron("discord")}
      label="Settings"
    >
      <Repeater
        data={data}
        onAdd={this.onAdd}
        onDelete={this.onDelete}
        content={this.content}
      />
    </Group>
  }
}
