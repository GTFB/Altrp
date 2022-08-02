export default function preg_match(regex, str) {
  if (new RegExp(regex).test(str)) {
    return regex.exec(str);
  }
  return false;
}
