import mutate from "dot-prop-immutable";
import store from "../store/store";
import {setUpdatedNode} from "../store/customizer-settings/actions";

function changeByPath (path, value){
  let node = this.getNode();
  node = mutate.set(node, `data.${path}`, value)
  store.dispatch(setUpdatedNode(node));
}

function getNode(){
  return this.props.customizerSettingsData?.find(n => {
    return this.props.selectNode?.id == n.id
  });
}

export default function decorate(node){
  node.changeByPath = changeByPath.bind(node)
  node.getNode = getNode.bind(node)
}

window.customizerNodeDecorate = decorate
