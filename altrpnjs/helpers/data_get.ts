import * as _ from 'lodash';
export default function data_get(data: any, path: string, defaultValue: any = null) {
  return _.get(data, path) || defaultValue;
}
