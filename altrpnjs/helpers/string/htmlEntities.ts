const htmlEntities = {
  /**
   * Converts a string to its html characters completely.
   *
   * @param {String} str String with unescaped HTML characters
   **/
  encode : function(str) {
    var buf = [];

    for (var i=str.length-1;i>=0;i--) {
      // @ts-ignore
      buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }

    return buf.join('');
  },
  /**
   * Converts an html characterSet into its original character.
   *
   * @param {String} str htmlSet entities
   **/
  decode : function(str) {
    // @ts-ignore
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  }
}
export default htmlEntities
