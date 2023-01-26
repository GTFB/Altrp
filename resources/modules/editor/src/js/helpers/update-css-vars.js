import Resource from "../classes/Resource";

const resource = new Resource(
  {
    route: '/admin/ajax/global_template_css'
  }
)

export default async function updateCssVars(){

  let styleElement = window.EditorFrame.contentDocument.querySelector('#altrp-css-vars')
  let _styleElement = document.querySelector('#altrp-css-vars')
  if(! styleElement){
    styleElement = window.EditorFrame.contentDocument.createElement('style')
    styleElement.setAttribute('id', 'altrp-css-vars')
    window.EditorFrame.contentDocument.head.appendChild(styleElement)
  }
  if(! _styleElement){
    _styleElement = document.createElement('style')
    _styleElement.setAttribute('id', 'altrp-css-vars')
    document.head.appendChild(_styleElement)
  }
  let data = await resource.getAll()
  _styleElement.innerHTML = data.data
  styleElement.innerHTML = data.data
}
