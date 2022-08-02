export default function trim(str, charlist = '') {
  // Strip whitespace (or other characters) from the beginning and end of a string
  // +   original by: Ilia Kantor (http://javascript.ru)

  charlist = !charlist ? ' s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
  return str.replace(re, '');
}
