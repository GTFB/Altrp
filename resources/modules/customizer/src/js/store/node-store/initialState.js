import {SwitchObj} from "../../components/sidebar/modules/nodes-obj/SwitchObj";
import {ChangeObj} from "../../components/sidebar/modules/nodes-obj/ChangeObj";
import {StartObj} from "../../components/sidebar/modules/nodes-obj/StartObj";
import {ReturnObj} from "../../components/sidebar/modules/nodes-obj/ReturnObj";
// import {ConditionObj} from "../../components/sidebar/modules/nodes-obj/robot/ConditionObj";
import {DocumentObj} from "../../components/sidebar/modules/nodes-obj/robot/DocumentObj";
import {CrudObj} from "../../components/sidebar/modules/nodes-obj/robot/CrudObj";
import {ApiObj} from "../../components/sidebar/modules/nodes-obj/robot/ApiObj";
import {MessageObj} from "../../components/sidebar/modules/nodes-obj/robot/MessageObj";
import {CustomizerObj} from "../../components/sidebar/modules/nodes-obj/robot/CustomizerObj";
import {DiscordObj} from "../../components/sidebar/modules/nodes-obj/robot/DiscordObj";
import {Handle} from "react-flow-renderer";
import {QueryBuilderObj} from "../../components/sidebar/modules/nodes-obj/QueryBuilderObj";
import {ValidatorObj} from "../../components/sidebar/modules/nodes-obj/ValidatorObj";
// import {BotObj} from "../../components/sidebar/modules/nodes-obj/robot/BotObj";

export const initialState = {
  nodes: [
    StartObj,
    SwitchObj,
    ChangeObj,
    QueryBuilderObj,
    ValidatorObj,
    ReturnObj,
    // ConditionObj,
    DocumentObj,
    CrudObj,
    ApiObj,
    MessageObj,
    CustomizerObj,
    // BotObj
    DiscordObj,
  ]
}
