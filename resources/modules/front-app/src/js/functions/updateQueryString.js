import qs from 'qs'
import {changeCurrentPageProperty} from "../store/current-page/actions";
/**
 *
 * @param paramName{string}
 * @param paramValue{any}
 */
const updateQueryString = (paramName, paramValue) => {

  if(!paramName || ! _.isString(paramName)){
    return
  }
  let _qs = qs.parse(location.search.replace('?',''))

  if(! _qs[paramName] && ! paramValue){
    return;
  }
  if(_.isEqual(_qs[paramName], paramValue)){
    return;
  }
  _qs[paramName] = paramValue
  if(!paramValue || _.isObject(paramValue) && _.isEmpty(paramValue)){
    delete _qs[paramName]
  }
  const newLocation = new URL(location.toString());
  newLocation.search = qs.stringify(_qs)

  history.pushState({
    altrpQueryNavigation: true
  }, '',newLocation.toString());
  const event = new CustomEvent('altrp-query-updated',
    {
      detail:{
        data: {..._qs}
      }
    })
  window.dispatchEvent(event)
  document.dispatchEvent(event)
  if(appStore){
    appStore.dispatch(changeCurrentPageProperty('params', {..._qs}))
  }
}

export default updateQueryString
