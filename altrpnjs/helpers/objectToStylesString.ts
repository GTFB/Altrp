import * as _ from "lodash";
import { string } from '@ioc:Adonis/Core/Helpers';

export default function objectToStylesString(styles = {}){
  return _.map(styles, (value, key)=>{
    let dashCase = string.dashCase(key)
    return `${dashCase}: ${value};`
  }).join('')
}
