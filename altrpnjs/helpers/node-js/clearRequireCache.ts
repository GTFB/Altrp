/**
 * clear all require cache
 */

export default function  clearRequireCache(){
  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key]
  })
}
