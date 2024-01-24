import isEditor from "../../../../front-app/src/js/functions/isEditor";
import getDataFromLocalStorage from "../../../../front-app/src/js/functions/getDataFromLocalStorage";

export default function   updateValue(prevProps) {
  if (isEditor()) {
    return;
  }
  let content_calculation = this.props.element.getLockedSettings(
    "content_calculation"
  );
  const altrpforms = this.props.formsStore;
  const fieldName = this.props.element.getFieldId();
  const formId = this.props.element.getFormId();

  if (!content_calculation) {
    /**
     *
     */
    const path = [formId, fieldName];

    if (
      this.props.formsStore !== prevProps.formsStore &&
      _.get(altrpforms, path) !== this.state.value
    ) {
      this.setState(state => ({
        ...state,
        value: _.get(altrpforms, path)
      }));
    }
    return;
  }

  const prevContext = {};

  const altrpdata = this.props.currentDataStorage.getData();
  const altrpmodel = this.props.currentModel.getData();
  const altrpuser = this.props.currentUser.getData();
  const altrppagestate = this.props.altrpPageState.getData();
  const altrpresponses = this.props.altrpresponses.getData();
  const altrpmeta = this.props.altrpMeta.getData();
  const context = this.props.element.getCurrentModel().getData();
  if (content_calculation.indexOf("altrpdata") !== -1) {
    context.altrpdata = altrpdata;
    if (!altrpdata.currentDataStorageLoaded) {
      prevContext.altrpdata = altrpdata;
    } else {
      prevContext.altrpdata = prevProps.currentDataStorage.getData();
    }
  }
  if (content_calculation.indexOf("altrpforms") !== -1) {
    context.altrpforms = altrpforms;
    /**
     * Не производим вычисления, если изменилось текущее поле
     */
    if (`${formId}.${fieldName}` === altrpforms.changedField) {
      prevContext.altrpforms = altrpforms;
    } else {
      prevContext.altrpforms = prevProps.formsStore;
    }
  }
  if (content_calculation.indexOf("altrpmodel") !== -1) {
    context.altrpmodel = altrpmodel;
    prevContext.altrpmodel = prevProps.currentModel.getData();
  }
  if (content_calculation.indexOf("altrpuser") !== -1) {
    context.altrpuser = altrpuser;
    prevContext.altrpuser = prevProps.currentUser.getData();
  }
  if (content_calculation.indexOf("altrpuser") !== -1) {
    context.altrpuser = altrpuser;
    prevContext.altrpuser = prevProps.currentUser.getData();
  }
  if (content_calculation.indexOf("altrppagestate") !== -1) {
    context.altrppagestate = altrppagestate;
    prevContext.altrppagestate = prevProps.altrpPageState.getData();
  }
  if (content_calculation.indexOf("altrpmeta") !== -1) {
    context.altrpmeta = altrpmeta;
    prevContext.altrpmeta = prevProps.altrpMeta.getData();
  }
  if (content_calculation.indexOf("altrpresponses") !== -1) {
    context.altrpresponses = altrpresponses;
    prevContext.altrpresponses = prevProps.altrpresponses.getData();
  }

  if (content_calculation.indexOf("altrpstorage") !== -1) {
    context.altrpstorage = getDataFromLocalStorage("altrpstorage", {});
  }

  if (
    _.isEqual(prevProps.currentDataStorage, this.props.currentDataStorage) &&
    _.isEqual(prevProps.currentUser, this.props.currentUser) &&
    _.isEqual(prevProps.formsStore, this.props.formsStore) &&
    _.isEqual(prevProps.altrpPageState, this.props.altrpPageState) &&
    _.isEqual(prevProps.altrpMeta, this.props.altrpMeta) &&
    _.isEqual(prevProps.altrpresponses, this.props.altrpresponses) &&
    _.isEqual(prevProps.currentModel, this.props.currentModel)
  ) {
    return;
  }
  if (
    !_.isEqual(prevProps.formsStore, this.props.formsStore) &&
    `${formId}.${fieldName}` === altrpforms.changedField
  ) {
    return;
  }
  let value = "";
  try {
    content_calculation = content_calculation
      .replace(/}}/g, "')")
      .replace(/{{/g, "_.get(context, '");
    value = eval(content_calculation);
    if (value === this.state.value) {
      return;
    }
    this.setState(
      state => ({...state, value}),
      () => {
        this.dispatchFieldValueToStore(value);
      }
    );
  } catch (e) {
    console.error(
      "Evaluate error in Input: '" + e.message + "'",
      this.props.element.getId(),
      content_calculation
    );
  }
}
