import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import convertData from "../../../../../front-app/src/js/functions/convertData";
import parseOptionsFromSettings from "../../../../../front-app/src/js/functions/parseOptionsFromSettings";
import parseParamsFromString from "../../../../../front-app/src/js/functions/parseParamsFromString";
import parseURLTemplate from "../../../../../front-app/src/js/functions/parseURLTemplate";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
import getDataFromLocalStorage from "../../../../../front-app/src/js/functions/getDataFromLocalStorage";
import renderAssetIcon from "../../../../../front-app/src/js/functions/renderAssetIcon";
import altrpCompare from "../../../../../front-app/src/js/functions/altrpCompare";
import Resource from "../../classes/Resource";
import { changeFormFieldValue } from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import AltrpModel from "../../classes/AltrpModel";
import {Checkbox} from "@blueprintjs/core";
import getResponsiveSetting from "../../../../../front-app/src/js/helpers/get-responsive-setting";


//(window.globalDefaults = window.globalDefaults || []).push(``)
const AltrpFieldContainer = styled.div`
  ${({settings}) => {
    const content_label_position_type = getResponsiveSetting(settings, 'content_label_position_type')
    switch (content_label_position_type) {
      case "left": {
        return "display: flex";
      }
      case "right": {
        return "display:flex;flex-direction:row-reverse;justify-content:flex-end;";
      }
    }
    return "";
  }}
`;

class InputCheckboxWidget extends Component {
  timeInput = null;

  constructor(props) {
    super(props);
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.onChange = this.onChange.bind(this);

    this.defaultValue =
      this.getLockedContent("content_default_value", true) ||
      (this.valueMustArray() ? [] : "");

    this.defaultValue = altrpHelpers.mbParseJSON(this.defaultValue, this.defaultValue)
    if (this.valueMustArray() && !_.isArray(this.defaultValue)) {
      this.defaultValue = [];
    }
    this.state = {
      settings: { ...props.element.getSettings() },
      value: this.defaultValue,
      options: parseOptionsFromSettings(
        props.element.getLockedSettings("content_options")
      ),
      paramsForUpdate: null
    };
    this.altrpSelectRef = React.createRef();
    const value = this.getValue();
    if (!value && this.getLockedContent("content_default_value")) {
      this.dispatchFieldValueToStore(this.defaultValue);
    }
  }

  /**
   *
   * @returns {string}
   */
  getValue = () => {
    let value;
    let formId = this.props.element.getFormId();
    let fieldName = this.props.element.getFieldId();
    if (isEditor()) {
      value = this.state.value;
    } else {
      value = _.get(appStore.getState().formsStore, `${formId}`, '')
      value = _.get(value, fieldName, '')
    }
    return value;
  }
  /**
   * В некоторых случаях значение поля должно быть массивом
   * @return {boolean}
   */
  valueMustArray() {
    return true;
  }
  /**
   * Чистит значение
   */
  clearValue() {
    let value = [];
    this.onChange(value);
    this.dispatchFieldValueToStore(value, true);
  }
  /**
   * Метод устанавливает все опции как выбранные
   */
  selectAll() {
    const optionsDynamicSetting = this.props.element.getDynamicSetting(
      "content_options"
    );
    let options = [...this.state.options];

    if (optionsDynamicSetting) {
      options = convertData(optionsDynamicSetting, options);
    }
    options = options.map(({ value }) => value);
    this.onChange(options);
  }

  /**
   * Загрузка виджета
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  async _componentDidMount(prevProps, prevState) {
    if (this.props.element.getLockedSettings("content_options")) {
      let options = parseOptionsFromSettings(
        this.props.element.getLockedSettings("content_options")
      );

      this.setState(state => ({ ...state, options }));
    }
    let value = this.state.value;

    if (
      _.get(value, "dynamic") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getLockedContent("content_default_value", true);
    }

    /**
     * Если модель обновилась при смене URL
     */
    if (
      prevProps &&
      !prevProps.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getLockedContent("content_default_value", true);
      value = altrpHelpers.mbParseJSON(value, value)
      this.setState(
        state => ({ ...state, value, contentLoaded: true }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
      return;
    }
    if (
      this.props.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      !this.state.contentLoaded
    ) {
      value = this.getLockedContent("content_default_value", true);

      value = altrpHelpers.mbParseJSON(value, value)

      this.setState(
        state => ({ ...state, value, contentLoaded: true }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
      return;
    }
    if (this.state.value !== value) {
      this.setState(
        state => ({ ...state, value }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    }
  }

  /**
   * Получить url для запросов
   */
  getRoute() {
    let url = this.props.element.getLockedSettings("model_for_options");

    if (url.indexOf("/") === -1) {
      return `/ajax/models/${url}_options`;
    }
    if (url.indexOf("{{") !== -1) {
      url = replaceContentWithData(url);
    }
    return url;
  }
  /**
   * Обновление виджета
   */
  async _componentDidUpdate(prevProps, prevState) {
    const { content_options, model_for_options } = this.state.settings;
    if (
      prevProps &&
      !prevProps.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded")
    ) {
      let value = this.getLockedContent(
        "content_default_value",
          true,
      );
      value = altrpHelpers.mbParseJSON(value, value)
      this.setState(
        state => ({ ...state, value, contentLoaded: true }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    }

    /**
     * Если обновилась модель, то пробрасываем в стор новое значение (старый источник диамических данных)
     */
    if (
      !_.isEqual(this.props.currentModel, prevProps.currentModel) &&
      this.state.value &&
      this.state.value.dynamic
    ) {

      let value = this.getLockedContent(
        "content_default_value",
        true,
      );
      value = altrpHelpers.mbParseJSON(value, value)
      this.dispatchFieldValueToStore(value);
    }

    /**
     * Если обновилось хранилище данных формы, currentDataStorage или модель, то получаем новые опции c сервера
     */
    if (
      this.props.formsStore !== prevProps.formsStore ||
      this.props.currentModel !== prevProps.currentModel ||
      this.props.currentDataStorage !== prevProps.currentDataStorage
    ) {
      this.updateOptions();
    }
    if (content_options && !model_for_options) {
      let options = parseOptionsFromSettings(content_options);
      if (!_.isEqual(options, this.state.options)) {
        this.setState(state => ({ ...state, options }));
      }
    }
    this.updateValue(prevProps);
  }

  /**
   * Обновить значение если нужно
   * @param {{}} prevProps
   */
  updateValue(prevProps) {
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
       * Обновить значение, если formsStore изменилось из другого компонента
       */
      const path = `${formId}.${fieldName}`;
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
        state => ({ ...state, value }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    } catch (e) {
      console.error(
        "Evaluate error in Input: '" + e.message + "'",
        this.props.element.getId()
      );
    }
  }

  /**
   * Обновляет опции для селекта при обновлении данных, полей формы
   */
  async updateOptions() {
    {
      let formId = this.props.element.getFormId();
      let paramsForUpdate = this.props.element.getLockedSettings("params_for_update");
      let formData = _.get(this.props.formsStore, [formId], {});
      paramsForUpdate = parseParamsFromString(
        paramsForUpdate,
        new AltrpModel(formData)
      );
      /**
       * Сохраняем параметры запроса, и если надо обновляем опции
       */
      let options = [...this.state.options];
      if (!_.isEqual(paramsForUpdate, this.state.paramsForUpdate)) {
        if (!_.isEmpty(paramsForUpdate)) {
          if (this.props.element.getLockedSettings("params_as_filters", false)) {
            paramsForUpdate = JSON.stringify(paramsForUpdate);
            options = await new Resource({
              route: this.getRoute()
            }).getQueried({ filters: paramsForUpdate });
          } else {
            options = await new Resource({ route: this.getRoute() }).getQueried(
              paramsForUpdate
            );
          }
          options = !_.isArray(options) ? options.data : options;
          options = _.isArray(options) ? options : [];
        } else if (this.state.paramsForUpdate) {
          options = await new Resource({ route: this.getRoute() }).getAll();
          options = !_.isArray(options) ? options.data : options;
          options = _.isArray(options) ? options : [];
        }

        this.setState(state => ({
          ...state,
          paramsForUpdate,
          options
        }));
      }
    }
  }

  /**
   * Изменение значения в виджете
   * @param e
   */
  onChange(e) {
    let value = "";
    let valueToDispatch;
    if (e && e.target) {
      let inputs = document.getElementsByName(e.target.name);
      value = [];
      inputs.forEach(input => {
        if (input.checked) {
          value.push(input.value);
        }
      });
    }

    if (_.isArray(e)) {
      value = _.cloneDeep(e);
    }
    this.setState(
      state => ({
        ...state,
        value
      }),
      () => {
        this.dispatchFieldValueToStore(
          valueToDispatch !== undefined ? valueToDispatch : value,
          true
        );
      }
    );
  }

  /**
   * Передадим значение в хранилище формы
   * @param {*} value
   * @param {boolean} userInput true - имзенилось пользователем
   */
  dispatchFieldValueToStore = async (value, userInput = false) => {
    let formId = this.props.element.getFormId();

    let fieldName = this.props.element.getFieldId();
    if (fieldName.indexOf("{{") !== -1) {
      fieldName = replaceContentWithData(fieldName);
    }
    if (_.isObject(this.props.appStore) && fieldName && formId) {
      this.props.appStore.dispatch(
        changeFormFieldValue(fieldName, value, formId, userInput)
      );

      let query_sync = this.props.element.getLockedSettings(
        "query_sync"
      );
      if(!isEditor() && query_sync){
        const updateQueryString = (await import('../../../../../front-app/src/js/functions/updateQueryString')).default
        updateQueryString(fieldName, value)
      }
      if (userInput) {
        const change_actions = this.props.element.getLockedSettings("change_actions");
        if (change_actions && !isEditor()) {
          const actionsManager = (
            await import(
              /* webpackChunkName: 'ActionsManager' */
              "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
              )
          ).default;
          await actionsManager.callAllWidgetActions(
            this.props.element.getIdForAction(),
            "change",
            change_actions,
            this.props.element
          );
        }
      }
    }
  };

  /**
   * Обработка добавления опции по ajax
   * @param {SyntheticKeyboardEvent} e
   */
  createItem = async e => {
    const keyCode = e.keyCode;
    const { value: inputValue } = e.target;
    if (keyCode !== 13 || !inputValue) {
      return;
    }
    const {
      create_url,
      create_label,
      create_data,
      select2_multiple
    } = this.props.element.getLockedSettings();
    if (!create_label && !create_url) {
      return;
    }
    const currentModel = this.props.element.getCurrentModel();
    let data = parseParamsFromString(create_data, currentModel, true);
    data[create_label] = inputValue;
    let url = parseURLTemplate(create_url, currentModel.getData());
    this.setState(state => ({ ...state, isDisabled: true }));
    try {
      const resource = new Resource({
        route: url
      });
      let res = await resource.post(data);
      if (res.success && _.get(res, "data.id")) {
        let newOption = {
          label: inputValue,
          value: _.get(res, "data.id")
        };
        this.setState(
          state => ({ ...state, isDisabled: false }),
          () => {
            let options = [...this.state.options];
            options.unshift(newOption);
            let value = this.state.value;
            if (select2_multiple) {
              value = value ? [...value] : [];
              value.push(_.get(res, "data.id"));
            } else {
              value = _.get(res, "data.id");
            }
            this.setState(
              state => ({ ...state, options, value }),
              () => {
                const selectStateManager = _.get(
                  this,
                  "altrpSelectRef.current.selectRef.current"
                );
                if (selectStateManager) {
                  selectStateManager.setState({
                    menuIsOpen: false,
                    inputValue: ""
                  });
                }
              }
            );
          }
        );
      }
      this.setState(state => ({ ...state, isDisabled: false }));
    } catch (error) {
      console.error(error);
      this.setState(state => ({ ...state, isDisabled: false }));
    }
  };

  /**
   * Взовращает имя для атрибута name
   * @return {string}
   */
  getName() {
    return `${this.props.element.getFormId()}[${this.props.element.getFieldId()}]`;
  }

  /**
   * Получить css классы для input checkbox
   */
  getClasses = ()=>{
    let classes = ` `;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    let label = null;
    const settings = this.props.element.getSettings();
    const {
      position_css_id: cssId,
      position_css_classes: cssClasses
    } = settings;


    let value = this.state.value;

    let classLabel = "";
    let styleLabel = {};
    const content_label_position_type = this.props.element.getResponsiveLockedSetting(
      "content_label_position_type"
    );
    switch (content_label_position_type) {
      case "top":
        styleLabel = {
          marginBottom: this.state.settings.label_style_spacing
            ? this.state.settings.label_style_spacing.size +
            this.state.settings.label_style_spacing.unit
            : 2 + "px"
        };
        classLabel = "";
        break;
      case "bottom":
        styleLabel = {
          marginTop: this.state.settings.label_style_spacing
            ? this.state.settings.label_style_spacing.size +
            this.state.settings.label_style_spacing.unit
            : 2 + "px"
        };
        classLabel = "";
        break;
      case "left":
        styleLabel = {
          marginRight: this.state.settings.label_style_spacing
            ? this.state.settings.label_style_spacing.size +
            this.state.settings.label_style_spacing.unit
            : 2 + "px"
        };
        classLabel = "altrp-field-label-container-left";

        break;
      case "absolute":
        styleLabel = {
          position: "absolute",
          zIndex: 2
        };
        classLabel = "";
        break;
    }


    let content_label = this.props.element.getResponsiveLockedSetting("content_label")
    let label_icon = this.props.element.getResponsiveLockedSetting("label_icon")

    if (content_label || label_icon) {
      label = (
        <div
          className={"altrp-field-label-container " + classLabel}
          style={styleLabel}
        >
          <label
            className={`altrp-field-label ${this.state.settings.content_required
              ? "altrp-field-label--required"
              : ""
            }`}
          >
            {content_label}
          </label>
          {label_icon && label_icon.assetType && (
            <span className="altrp-label-icon">
              {renderAssetIcon(label_icon)}
            </span>
          )}
        </div>
      );
    } else {
      label = null;
    }

    let autocomplete = "off";
    if (this.state.settings.content_autocomplete) {
      autocomplete = "on";
    }

    let input = null;

    input = this.renderRepeatedInput();

    return (
      <AltrpFieldContainer
        settings={settings}
        className={`altrp-field-container ${cssClasses ? cssClasses : ''}`}
        id={cssId ? cssId : ''}
      >
        {content_label_position_type === "top" ? label : ""}
        {content_label_position_type === "left" ? label : ""}
        {content_label_position_type === "right" ? label : ""}
        {content_label_position_type === "absolute" ? label : ""}
        {/* .altrp-field-label-container */}
        {input}
        {content_label_position_type === "bottom" ? label : ""}
      </AltrpFieldContainer>
    );
  }


  /**
   * Выводит input type=checkbox|radio
   */
  renderRepeatedInput() {
    let { options = [] } = this.state;
    let { value = "" } = this.state;
    let classes =
      this.getClasses() + (this.state.settings.position_css_classes || "");

    const fieldName =
      this.props.element.getFieldId() ||
      Math.random()
        .toString(36)
        .substr(2, 9);
    const formID =
      this.props.element.getFormId() ||
      Math.random()
        .toString(36)
        .substr(2, 9);

    return (
      <div className="altrp-field-subgroup">
        {options.map((option, idx) => {
          let checked = false;
          /**
           * Если значение или опция число, то приведем к числу перед сравнением
           */
          value = _.isArray(value) ? value : value ? [value] : [];
          checked = altrpCompare(option.value, value, "in");

          return (
            <div
              className={`${classes} altrp-field-option ${checked ? "active" : ""}`}
              key={`${fieldName}-${idx}`}
            >
              <span className="altrp-field-option-span">
                <Checkbox
                  inline
                  name={`${formID}-${fieldName}`}
                  id={`${formID}-${fieldName}-${idx}`}
                  onChange={this.onChange}
                  value={option.value}
                  className={`${classes} altrp-field-checkbox${checked ? " active" : ""}`}
                  checked={checked}
                />
                {/*<input*/}
                {/*  type="checkbox"*/}
                {/*  value={option.value}*/}
                {/*  name={`${formID}-${fieldName}`}*/}
                {/*  className={`altrp-field-option__input ${checked ? "active" : ""*/}
                {/*    }`}*/}
                {/*  onChange={this.onChange}*/}
                {/*  checked={checked}*/}
                {/*  id={`${formID}-${fieldName}-${idx}`}*/}
                {/*/>*/}
              </span>
              <label
                htmlFor={`${formID}-${fieldName}-${idx}`}
                className={`${classes} altrp-field-option__label`}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default InputCheckboxWidget;
