export default function ltrim(str, charlist) {
  charlist = !charlist ? ' s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  var re = new RegExp('^[' + charlist + ']+', 'g');
  return str.replace(re, '');
}
