import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
import getDataFromLocalStorage from "../../../../../front-app/src/js/functions/getDataFromLocalStorage";
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import AltrpInput from "../altrp-input/AltrpInput";
import getResponsiveSetting from "../../../../../front-app/src/js/helpers/get-responsive-setting";
import updateQueryString from "../../../../../front-app/src/js/functions/updateQueryString";


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

class InputTextCommonWidget extends Component {


  constructor(props) {
    super(props);
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.debounceDispatch = this.debounceDispatch.bind(this);
    this.defaultValue = this.getLockedContent("content_default_value")

    this.state = {
      settings: {...props.element.getSettings()},
      showPassword: false,
    };
    const value = this.getValue();
    if (!value && this.getLockedContent("content_default_value")) {
      this.dispatchFieldValueToStore(this.getLockedContent("content_default_value"));
    }
  }

  /**
   * Чистит значение
   */
  clearValue() {
    let value = "";
    this.onChange(value);
    this.dispatchFieldValueToStore(value, true);
  }

  /**
   * Обработка нажатия клавиши
   * @param {{}} e
   */
  handleEnter = e => {
    if (!e.target.hasAttribute('data-enter')) return;
    if (e.keyCode === 13) {
      e.preventDefault();
      const inputs = Array.from(document.querySelectorAll("input[data-enter='enabled'],select"));
      const index = inputs.indexOf(e.target);
      if (index === undefined) return;

      inputs[index + 1] && inputs[index + 1].focus();
      const {
        create_allowed,
        create_label,
        create_url
      } = this.props.element.getSettings();
      if (create_allowed && create_label && create_url) {
        this.createItem(e);
      }
    }
  };

  /**
   * Загрузка виджета
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  async _componentDidMount(prevProps, prevState) {

    let value = this.getValue();
    this.setState(state => ({
      ...state,
      value
    }))

    /**
     * Если модель обновилась при смене URL
     */
    if (
      prevProps &&
      !prevProps.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getLockedContent("content_default_value");
      this.setState(
        state => ({...state, contentLoaded: true}),
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
      value = this.getLockedContent("content_default_value");
      this.setState(
        state => ({...state, contentLoaded: true}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
      return;
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
   * Обновление виджета
   */
  async _componentDidUpdate(prevProps, prevState) {
    if (
      prevProps &&
      !prevProps.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded")
    ) {
      let value = this.getLockedContent(
        "content_default_value"
      );
      this.setState(
        state => ({...state, contentLoaded: true}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    } else {
      this.updateValue(prevProps);
    }

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
       *
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
        state => ({...state, value}),
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
   * Изменение значения в виджете
   * @param e
   */
  onChange =(e)=> {
    let value = "";
    if (e && e.target) {
      value = e.target.value;
    }

    if (e && e.value) {
      value = e.value;
    }

    const content_type = this.props.element.getSettings('content_type')
    const maxNumber = this.props.element.getResponsiveSetting('max_number')
    const minNumber = this.props.element.getResponsiveSetting('min_number')

    if (content_type === 'number' && (maxNumber || minNumber)) {
      if ((minNumber || minNumber == 0) && value < minNumber) value = minNumber
      if ((maxNumber  || maxNumber == 0) && value > maxNumber) value = maxNumber
    }


    /**
     * Обновляем хранилище только если не текстовое поле
     */

    if(isEditor()){
      this.setState(state=>({...state, value}))
    } else {
      this.setState(state=>({...state, value}))
    }
  }

  debounceDispatch = _.debounce(
    value => this.dispatchFieldValueToStore(value, true),
    Number(this.props.element.getResponsiveLockedSetting('debounce_input')?.size) || 0
  );


  /**
   * Для действие по фокусу
   * @param e
   * @return {Promise<void>}
   */

  onFocus = async e => {
    const focus_actions = this.props.element.getLockedSettings("focus_actions");

    if (focus_actions && !isEditor()) {
      const actionsManager = (
        await import(
          /* webpackChunkName: 'ActionsManager' */
          "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
          )
      ).default;
      await actionsManager.callAllWidgetActions(
        this.props.element.getIdForAction(),
        "focus",
        focus_actions,
        this.props.element
      );
    }
  };
  /**
   * Потеря фокуса для оптимизации
   * @param  e
   * @param  editor для получения изменений из CKEditor
   */
  onBlur = async (e, editor = null) => {
    this.dispatchFieldValueToStore(e.target.value, true);

    if (this.props.element.getLockedSettings("actions", []) && !isEditor()) {
      const actionsManager = (
        await import(
          /* webpackChunkName: 'ActionsManager' */
          "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
          )
      ).default;
      await actionsManager.callAllWidgetActions(
        this.props.element.getIdForAction(),
        "blur",
        this.props.element.getLockedSettings("actions", []),
        this.props.element
      );
    }
  };
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
   * Взовращает имя для атрибута name
   * @return {string}
   */
  getName() {
    return `${this.props.element.getFormId()}[${this.props.element.getFieldId()}]`;
  }

  handleLockClick = () => {
    this.setState((state) => {
      return {
        ...state,
        showPassword: !state.showPassword,
      }
    })
  }

  renderLeftIcon(){
    const {element} = this.props;
    let left_icon = element.getResponsiveLockedSetting('left_icon');
    let password_show_left_icon = element.getResponsiveLockedSetting('password_show_left_icon');
    const {content_type} = element.settings
    const leftIconProps = {}
    if(content_type === 'password' && this.state.showPassword && password_show_left_icon){
      left_icon = password_show_left_icon
      leftIconProps.onClick = this.handleLockClick
    }
    if(content_type === 'password' && password_show_left_icon){
      leftIconProps.onClick = this.handleLockClick
      leftIconProps.style = {
        cursor: 'pointer'
      }
    }
    if(!left_icon){
      return null
    }
    return <span className="bp3-icon bp3-icon_text-widget bp3-icon_left" {...leftIconProps} tabIndex="0">
      {renderAsset(left_icon)}
    </span>
  }
  renderRightIcon(){
    const {element} = this.props;
    let right_icon = element.getResponsiveLockedSetting('right_icon');
    let password_show_right_icon = element.getResponsiveLockedSetting('password_show_right_icon');
    const {content_type} = element.settings
    const rightIconProps = {}
    if(content_type === 'password' && this.state.showPassword && password_show_right_icon){
      right_icon = password_show_right_icon
    }
    if(content_type === 'password' && password_show_right_icon){
      rightIconProps.onClick = this.handleLockClick
      rightIconProps.style = {
        cursor: 'pointer'
      }
    }
    if(!right_icon){
      return null
    }
    return <span className="bp3-icon bp3-icon_text-widget bp3-icon_right" {...rightIconProps} tabIndex="0">
      {renderAsset(right_icon, )}
    </span>
  }

  /**
   * Получить css классы для InputTextCommonWidget
   */
  getClasses = ()=>{
    let classes = ``;
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
    let classes = this.getClasses()
    const {
      content_readonly,
    } = settings;
    // let value = this.getValue()

    let classLabel = "";
    let styleLabel = {};
    const content_label_position_type = this.props.element.getResponsiveLockedSetting(
      "content_label_position_type"
    );
    const label_icon_position = this.props.element.getResponsiveLockedSetting('label_icon_position')
    let label_style_spacing = this.props.element.getResponsiveLockedSetting('label_style_spacing')
    switch (content_label_position_type) {
      case "top":
        styleLabel = {
          marginBottom: label_style_spacing
            ? label_style_spacing?.size +
            label_style_spacing?.unit
            : 2 + "px"
        };
        classLabel = "";
        break;
      case "bottom":
        styleLabel = {
          marginTop: label_style_spacing
            ? label_style_spacing?.size +
            label_style_spacing?.unit
            : 2 + "px"
        };
        classLabel = "";
        break;
      case "left":
        styleLabel = {
          marginRight: label_style_spacing
            ? label_style_spacing?.size +
            label_style_spacing?.unit
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
    content_label = replaceContentWithData(content_label, this.props.element.getCurrentModel()?.getData())
    let label_icon = this.props.element.getResponsiveLockedSetting("label_icon")

    if (content_label || label_icon) {
      label = (
        <div
          className={"altrp-field-label-container " + classLabel}
          style={styleLabel}
        >
          <label
            htmlFor={this.getName()}
            style={{
              display: 'flex',
              flexDirection: label_icon_position,
            }}
            className={`altrp-field-label altrp-field-label_text-widget ${this.state.settings.content_required
              ? "altrp-field-label--required"
              : ""
            }`}
          >
            {content_label}

            {label_icon && label_icon.type && (
              <span className="altrp-label-icon">
              {renderAsset(label_icon)}
            </span>
            )}
          </label>
        </div>
      );
    } else {
      label = null;
    }
    let autocomplete = "off";
    if (this.state.settings.content_autocomplete) {
      autocomplete = "on";
    } else {
      autocomplete = "off";
    }

    const maxlength = this.props.element.getResponsiveLockedSetting("maxlength_input_text")
    const typeInput = this.state.settings.content_type === 'text' || this.state.settings.content_type === 'password'
    const enterNextInput = !!this.props.element.getResponsiveLockedSetting("content_enter_input")
    let value = this.state.value
    if(value === undefined || value === null){
      value = ''
    }
    let input = (
      <div className={"altrp-input-wrapper " + (this.state.settings.position_css_classes || "")} id={this.state.settings.position_css_id}>
        <AltrpInput
          type={this.state.settings.content_type === 'password' ? (this.state.showPassword ? "text" : "password") : this.state.settings.content_type}
          name={this.getName()}
          id={this.getName()}
          className={classes}
          value={value}
          maxLength={(maxlength > 0 && typeInput) ? maxlength : null}
          data-enter={enterNextInput ? 'enabled' : null}
          element={this.props.element}
          readOnly={content_readonly}
          autoComplete={autocomplete}
          placeholder={this.state.settings.content_placeholder}
          settings={this.props.element.getSettings()}
          onKeyDown={this.handleEnter}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          leftIcon={this.renderLeftIcon()}
          rightElement={this.renderRightIcon()}
        />
      </div>
    );

    return (
      <AltrpFieldContainer
        settings={settings}
        className="altrp-field-container "
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
}

export default InputTextCommonWidget;
