
/**
 * Загрузка менеджера шрифтов
 */
export default function loadFontsManager(){
  import(/* webpackChunkName: 'EmailTemplatesRenderer' */'../components/FontsManager').then(module => {
    const FontsManager = module.default;
    const fontsContainer = document.createElement('div');
    document.body.appendChild(fontsContainer);
    window.ReactDOM.render(<window.Provider store={window.appStore}>
      <FontsManager/>
    </window.Provider>, fontsContainer)
  });
}
