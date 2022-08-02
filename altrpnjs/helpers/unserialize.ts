export default function unserialize(inp): any {
  // Creates a PHP value from a stored representation
  //
  // +   original by: Arpad Ray (mailto:arpad@php.net)

  let error = 0;
  if (inp == '' || inp.length < 2) {
    return;
  }
  var val, kret, vret, cval;
  var type = inp.charAt(0);
  var cont = inp.substring(2);
  var size = 0,
    divpos = 0,
    endcont = 0,
    rest = '';

  switch (type) {
    case 'N': // null
      // leave val undefined
      rest = cont;
      break;
    case 'b': // boolean
      val = cont.charAt(0) == '1';
      rest = cont.substring(1);
      break;
    case 's': // string
      val = '';
      divpos = cont.indexOf(':');
      if (divpos == -1) {
        break;
      }
      size = parseInt(cont.substring(0, divpos));
      if (size == 0) {
        if (cont.length - divpos < 4) {
          break;
        }
        rest = cont.substring(divpos + 4);
        break;
      }
      if (cont.length - divpos - size < 4) {
        break;
      }
      if (cont.substring(divpos + 2 + size, divpos + 4 + size) != '"') {
      }
      val = cont.substring(divpos + 2, divpos + 2 + size);
      rest = cont.substring(divpos + 4 + size);
      break;
    case 'i': // integer
    case 'd': // float
      var dotfound = 0;
      for (var i = 0; i < cont.length; i++) {
        cval = cont.charAt(i);
        if (isNaN(parseInt(cval)) && !(type == 'd' && cval == '.' && !dotfound++)) {
          endcont = i;
          break;
        }
      }
      val = cont.substring(0, endcont);
      val = type == 'i' ? parseInt(val) : parseFloat(val);
      rest = cont.substring(endcont + 1);
      break;
    case 'a': // array
      if (cont.length < 4) {
        return;
      }
      divpos = cont.indexOf(':', 1);
      if (divpos == -1) {
        return;
      }
      size = parseInt(cont.substring(1, divpos - 1));
      cont = cont.substring(divpos + 2);
      val = [];
      if (cont.length < 1) {
        return;
      }
      for (var i = 0; i + 1 < size * 2; i += 2) {
        kret = unserialize(cont);
        if (error || kret[0] == undefined || kret[1] == '') {
          return;
        }
        vret = unserialize(kret[1]);
        if (error) {
          return;
        }
        val[kret[0]] = vret[0];
        cont = vret[1];
      }
      if (cont.charAt(0) != '}') {
        return;
      }
      rest = cont.substring(1);
      break;
    case 'O': // object
      divpos = cont.indexOf(':');
      if (divpos == -1) {
        return;
      }
      size = parseInt(cont.substring(0, divpos));
      var objname = cont.substring(divpos + 2, divpos + 2 + size);
      if (cont.substring(divpos + 2 + size, divpos + 4 + size) != '":') {
        return;
      }
      var objprops = unserialize('a:' + cont.substring(divpos + 4 + size));
      if (error) {
        return;
      }
      rest = objprops[1];
      var objout = 'function ' + objname + '(){';
      for (let key in objprops[0]) {
        objout += '' + key + "=objprops[0]['" + key + "']";
      }
      objout += '}val=new ' + objname + '()';
      eval(objout);
      break;
    default:
  }
  return arguments.length == 1 ? val : [val, rest];
}
