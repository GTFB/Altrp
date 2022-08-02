import _ from 'lodash';

export default function delay(ms) {
  if (_.isString(ms)) {
    ms = Number(ms);
  }
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
