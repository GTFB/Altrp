import * as _ from 'lodash';

function camelCaseToDash(str: string) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

export default function objectToStylesString(styles = {}) {
  return _.map(styles, (value, key) => {
    return `${camelCaseToDash(key)}: ${value};`;
  }).join('');
}
