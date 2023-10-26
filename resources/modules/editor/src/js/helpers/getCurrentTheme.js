import store from "../store/store";
import THEMED_TABS from "../const/THEMED_TABS";
import THEMED_CONTROLLERS from "../const/THEMED_CONTROLLERS";

export default  function getCurrentTheme(controllerComponent = null) {

  const {
    altrp_themes,
  } = store.getState().editorMetas
  const {
    currentTab,
  } = store.getState()
  let theme = ''
  if (THEMED_TABS.includes(currentTab.currentTab)
    && (! controllerComponent || THEMED_CONTROLLERS.includes(controllerComponent.props.type))
    && altrp_themes.getProperty('metaValue.currentTheme') !== 'altrp-theme_normal')  {
    theme = altrp_themes.getProperty('metaValue.currentTheme');
  }
  return theme
}
