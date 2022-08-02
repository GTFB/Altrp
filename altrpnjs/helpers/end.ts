export default function end(array) {
  var last_elm, key;

  if (array.constructor === Array) {
    last_elm = array[array.length - 1];
  } else {
    for (key in array) {
      last_elm = array[key];
    }
  }

  return last_elm;
}
