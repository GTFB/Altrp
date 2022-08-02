export default function get_class(obj) {
  // Returns the name of the class of an object
  //
  // +   original by: Ates Goral (http://magnetiq.com)
  // +   improved by: David James

  if (
    obj instanceof Object &&
    !(obj instanceof Array) &&
    !(obj instanceof Function) &&
    obj.constructor
  ) {
    var arr = obj.constructor.toString().match(/function\s*(\w+)/);

    if (arr && arr.length == 2) {
      return arr[1];
    }
  }

  return false;
}
