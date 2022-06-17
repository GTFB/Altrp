/**
 *
 * @param {{}} context
 * @return {{}}
 */
export default function prepareContext(context) {
  context.altrpdata = appStore.getState().currentDataStorage.getData();
  context.altrpmodel = appStore.getState().currentModel.getData();
  context.altrpuser = appStore.getState().currentUser.getData();
  context.altrppagestate = appStore.getState().altrpPageState.getData();
  context.altrpresponses = appStore.getState().altrpresponses.getData();
  context.altrpmeta = appStore.getState().altrpMeta.getData();
  return context;
}
