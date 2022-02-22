import * as _ from "lodash";

export default function objectToStylesString(styles = {}){
  return _.map(styles, (value, key)=>{
    return `${key}=${value};`
  }).join('')
}
