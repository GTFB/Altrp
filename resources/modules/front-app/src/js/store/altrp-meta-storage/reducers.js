import {CHANGE_ALTRP_META, REPLACE_ALTRP_META, REPLACE_ALTRP_META_FROM_LOCAL_STORAGE, replaceAltrpMeta} from './actions'
const { AltrpModel,setAltrpIndex, saveDataToLocalStorage, isSSR} = window.altrpHelpers;

const defaultAltrpMeta = window.altrpHelpers.getDataFromLocalStorage('altrpmeta', {});
// console.log();
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
      let {metaValue, metaName } = action;
      altrpMeta = _.cloneDeep(altrpMeta);
      if(_.isArray(metaValue)){
        setAltrpIndex(metaValue);
      }
      altrpMeta.setProperty(metaName, metaValue);
      saveDataToLocalStorage('altrpmeta', altrpMeta.getData())
    }break;
    case REPLACE_ALTRP_META:{
      let {metaValue, } = action;
      altrpMeta = new AltrpModel(metaValue);
      if(_.isArray(metaValue)){
        setAltrpIndex(metaValue);
      }
      saveDataToLocalStorage('altrpmeta', altrpMeta.getData())
    }break;
    case REPLACE_ALTRP_META_FROM_LOCAL_STORAGE:{
      let {metaValue } = action;
      altrpMeta = new AltrpModel(metaValue);
      if(_.isArray(metaValue)){
        setAltrpIndex(metaValue);
      }
    }break;
  }
  if(altrpMeta instanceof AltrpModel){
    return altrpMeta;
  }
  return new AltrpModel(altrpMeta);
}

if(! isSSR()){
  window.addEventListener('storage', ()=>{
    const altrpMeta = window.altrpHelpers.getDataFromLocalStorage('altrpmeta', {});
    if(altrpMeta !== undefined && _.isObject(altrpMeta)){
      appStore.dispatch(replaceAltrpMeta(altrpMeta, true));
    }
  })
}
