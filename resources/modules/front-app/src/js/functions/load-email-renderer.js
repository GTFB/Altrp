
/**
 * Загрузка отрисовщика email
 */
export default function loadEmailRenderer(){
  import(/* webpackChunkName: 'EmailTemplatesRenderer' */'../components/EmailTemplatesRenderer').then(module => {
    const EmailTemplatesRenderer = module.default;
    const emailContainer = document.createElement('div');
    document.body.appendChild(emailContainer);
    ReactDOM.render(<window.Provider store={window.appStore}>
      <EmailTemplatesRenderer/>
    </window.Provider>, emailContainer)
  });
}
