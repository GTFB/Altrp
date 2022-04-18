export default function getAltrpLang(){
  return _.get(window, 'altrp.isNodeJS') ? 'javascript' : 'php'
}
