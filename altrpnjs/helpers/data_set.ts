import * as _ from 'lodash';
export default function data_set(data: object, path: string, value: any) {
  return _.set(data, path, value);
}
