export default async function loadPopups(){
  if(window.popupsContainer){
    return;
  }
  let templates = (page_areas || []).find(area => _.get(area, 'templates'))?.templates || [];
  console.log(templates);

  if(!templates?.length){
    return;
  }
  await frontElementsManager.loadNotUsedComponent()
  const module = await import(/* webpackChunkName: 'FrontPopup' */'../components/FrontPopup')
  const ElementWrapper = (await import(/* webpackChunkName: 'FrontPopup' */'../components/ElementWrapper')).default;
  window.popupsContainer = document.createElement('div');
  document.body.appendChild(window.popupsContainer);
  const FrontPopup = module.default;
  window.ReactDOM.render(<window.Provider store={window.appStore}>
    {templates.map(template => {
      return <FrontPopup key={template.id} ElementWrapper={ElementWrapper} template={template} />;
    })}
  </window.Provider>, window.popupsContainer)

}
