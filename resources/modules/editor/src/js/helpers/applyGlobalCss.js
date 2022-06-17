import AltrpMeta from "../classes/AltrpMeta";

export default async function applyGlobalCss(){
  let css = await AltrpMeta.getMetaByName('global_styles_editor')
  const  head = document.getElementById("editorContent").contentWindow.document.head
  let styleElement = document.getElementById("editorContent").contentWindow.document.getElementById('global_styles_editor')
  if(! styleElement){
    styleElement = document.createElement('style')
    styleElement.setAttribute('id', 'global_styles_editor')
    head.prepend(styleElement)
  }
  styleElement.innerHTML = css.getMetaValue('')
}
