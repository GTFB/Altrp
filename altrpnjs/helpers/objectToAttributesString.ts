import * as _ from 'lodash';

export default function objectToAttributesString(attrs = {}) {
  return _.map(attrs, (value, key) => {
    return `${key}="${value}"`;
  }).join(' ');
}
