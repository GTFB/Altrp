import * as _ from 'lodash';
export default function data_set(data: object, path: string, value: any){
  console.log(_);
  return _.set(data, path, value)
}
