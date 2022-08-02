import _ from 'lodash';
export default function stringToObject(string, defaultValue: object = {}): object {
  const result = defaultValue;
  if (!string || !_.isString(string)) {
    return result;
  }
  const lines = string.split('\n');
  for (let item of lines) {
    if (!item) {
      continue;
    }
    let [key, value] = item.split('|');
    if (!key) {
      continue;
    }
    key = key.trim();
    if (!value) {
      value = key;
    } else {
      value = value.trim();
    }
    result[key] = value;
  }
  return result;
}
