/**
 *
 * @param {[]} array
 * @param {string} childrenPath
 * @param {Function} callback
 * @return void
 */
export default function recurseEach(array, childrenPath, callback) {
  if(! _.isArray(array) || ! childrenPath || ! _.isFunction(callback)){
    return;
  }
  array.forEach((item, idx) => {
    const children = _.get(item, childrenPath);
    if(_.isArray(children)){
      recurseEach(children, childrenPath, callback)
    }
    callback(item, idx);
  })
}
