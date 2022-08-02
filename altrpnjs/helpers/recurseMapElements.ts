import * as _ from 'lodash';
export default function recurseMapElements(element, callback) {
  callback(element);
  if (element['children'] && _.isArray(element['children'])) {
    element['children'].forEach((child) => {
      recurseMapElements(child, callback);
    });
  }
}
