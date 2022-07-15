export default async function loadPopups(){
  if(window.popupsContainer){
    return;
  }
  let templates = (page_areas || []).find(area => _.get(area, 'templates'))?.templates || [];

  if(!templates?.length){
    return;
  }
  await frontElementsManager.loadNotUsedComponent()
  const module = await import(/* webpackChunkName: 'FrontPopup' */'../components/FrontPopup')
  const ElementWrapper = (await import(/* webpackChunkName: 'FrontPopup' */'../components/ElementWrapper')).default;
  window.popupsContainer = document.createElement('div');
  window.popupsContainer.style.position = 'relative'
  window.popupsContainer.style.zIndex = '999999'
  document.body.appendChild(window.popupsContainer);
  const FrontPopup = module.default;
  window.ReactDOM.render(<window.Provider store={window.appStore}>
    {templates.map(template => {
      return <FrontPopup key={template.id} ElementWrapper={ElementWrapper} template={template} />;
    })}
  </window.Provider>, window.popupsContainer)

}
