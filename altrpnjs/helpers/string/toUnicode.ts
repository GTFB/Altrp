export default function toUnicode(str: string, only: string[] = []): string {
  let uni: string[] = [],
    i = str.length;
  while (i--) {
    if (only.length) {
      if (only.indexOf(str[i]) !== -1) {
        uni[i] = '&#' + str.charCodeAt(i) + ';';
      } else {
        uni[i] = str[i];
      }
    } else {
      uni[i] = '&#' + str.charCodeAt(i) + ';';
    }
  }
  return uni.join('');
}
