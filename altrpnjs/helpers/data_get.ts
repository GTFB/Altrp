import * as _ from 'lodash';
export default function data_get(data : object, path : string, defaultValue: any = null){
  return _.get(data, path, defaultValue)
}
