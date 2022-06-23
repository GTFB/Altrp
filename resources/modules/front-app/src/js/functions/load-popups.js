import recurseEach from "../../../../editor/src/js/helpers/recurse-each";

export default async function loadPopups(){
  if(window.popupsContainer){
    return;
  }
  let templates = (page_areas || []).find(area => _.get(area, 'templates'))?.templates || [];

  if(!templates?.length){
    return;
  }
  console.log(performance.now());
  const elements = ['root-element']
  for (const template of templates) {
    recurseEach(template.data.children, 'children', function(child) {
      if(child.name && elements.indexOf(child.name) === -1){
        elements.push(child.name )
      }
    })
  }

  await frontElementsManager.loadComponents(elements)
  let [module, ElementWrapper] = await Promise.all([
    import(/* webpackChunkName: 'FrontPopup' */'../components/FrontPopup'),
    import(/* webpackChunkName: 'ElementWrapper' */'../components/ElementWrapper')
  ])
  ElementWrapper = ElementWrapper.default
  window.popupsContainer = document.createElement('div');
  window.popupsContainer.style.position = 'relative'
  window.popupsContainer.style.zIndex = '999999'
  document.body.appendChild(window.popupsContainer);
  const FrontPopup = module.default;
  console.log(performance.now());
  window.ReactDOM.render(<window.Provider store={window.appStore}>
    {templates.map(template => {
      return <FrontPopup key={template.id} ElementWrapper={ElementWrapper} template={template} />;
    })}
  </window.Provider>, window.popupsContainer)

}
