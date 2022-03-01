import {SwitchObj} from "../../components/sidebar/modules/nodes-obj/SwitchObj";
import {ChangeObj} from "../../components/sidebar/modules/nodes-obj/ChangeObj";
import {StartObj} from "../../components/sidebar/modules/nodes-obj/StartObj";
import {ReturnObj} from "../../components/sidebar/modules/nodes-obj/ReturnObj";
import { ListenerObj } from "../../components/sidebar/modules/nodes-obj/ListenerNode";

export const initialState = {
  nodes: [StartObj, SwitchObj, ChangeObj, ListenerObj, ReturnObj]
}
