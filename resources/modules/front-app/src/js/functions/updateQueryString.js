import qs from 'qs'
import { changeCurrentPageProperty} from "../store/current-page/actions";
/**
 *
 * @param paramName{string | {}}
 * @param paramValue{any}
 */
const updateQueryString = (paramName, paramValue = null) => {

  if(!paramName || ! _.isString(paramName) && ! _.isObject(paramName)){
    return
  }

  let newParams = {}
  if(_.isObject(paramName)){
    newParams = {
      ...paramName
    }
  } else {
    newParams[paramName] = paramValue
  }
  let _qs = qs.parse(location.search.replace('?',''))


  _.each(newParams, (paramValue, paramName)=>{
    if(! paramValue
      && paramName != 0 ){
      delete _qs[paramName];
      delete newParams[paramName];
      return
    }
    if(_.isObject(paramValue) && _.isEmpty(paramValue)){
      delete _qs[paramName]
      delete newParams[paramName]
      return
    }
    _qs[paramName] = paramValue
  })

  if(_.isEqual(_qs, qs.parse(location.search.replace('?','')))){
    return;
  }

  const newLocation = new URL(location.toString());
  newLocation.search = qs.stringify(_qs)

  history.pushState({
    altrpQueryNavigation: true
  }, '',newLocation.toString());
  const event = new CustomEvent('altrp-query-updated',
    {
      detail:{
        data: {
          _qs,
          changed: newParams
        },

      }
    })
  window.dispatchEvent(event)
  document.dispatchEvent(event)
  if(appStore){
    appStore.dispatch(changeCurrentPageProperty('params', {..._qs}))
  }
}

export default updateQueryString
