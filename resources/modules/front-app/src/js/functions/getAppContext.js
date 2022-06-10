import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";

/**
 * Вовращает AltrpModel, в котором храняться все источники данных на странице
 * @param {{}} model
 * @return {AltrpModel}
 */
export default function getAppContext(model = null) {
  const { currentModel } = appStore.getState();
  if(model instanceof AltrpModel){
    model = model.getData();
  }
  const currentModelData = model ? model : currentModel.getData();
  const urlParams = _.cloneDeep(
    window.currentRouterMatch instanceof AltrpModel
      ? window.currentRouterMatch.getProperty("params")
      : {}
  );
  const context = new AltrpModel(_.assign(urlParams, currentModelData));
  const {
    altrpPageState,
    altrpPage,
    altrpMeta,
    currentDataStorage,
    currentUser,
    altrpresponses,
    formsStore
  } = appStore.getState();

  context.setProperty("altrpdata", currentDataStorage);
  context.setProperty("altrppagestate", altrpPageState);
  context.setProperty("altrpmeta", altrpMeta);
  context.setProperty("altrpuser", currentUser);
  context.setProperty("altrpresponses", altrpresponses);
  context.setProperty("altrpforms", formsStore);
  context.setProperty("altrppage", altrpPage);
  return context;
}
