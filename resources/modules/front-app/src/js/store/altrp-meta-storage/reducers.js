import {CHANGE_ALTRP_META} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";
import {setAltrpIndex} from "../../helpers";

const defaultAltrpMeta = {
  
};
/**
 *
 * @param {{}} altrpMeta
 * @param {{}}  action
 *   {
 *     type: {string},
 *     metaValue: {},
 *     metaName: {string},
 *   }
 */
export function altrpMetaReducer(altrpMeta, action) {
  altrpMeta = altrpMeta || new AltrpModel(defaultAltrpMeta);
  switch (action.type) {
    case CHANGE_ALTRP_META:{
      let metaValue = action.metaValue;
      altrpMeta = _.cloneDeep(altrpMeta);
      if(_.isArray(metaValue)){
        setAltrpIndex(metaValue);
      }
      altrpMeta.setProperty(action.metaName, metaValue);
    }break;
  }
  if(altrpMeta instanceof AltrpModel){
    return altrpMeta;
  }
  return new AltrpModel(altrpMeta);
}