export default function removeScriptsAttributes(html) {
  return html.replace(/<(.*?) (on.*?)=('.*?'|".*?")/g, '<$1');
}
