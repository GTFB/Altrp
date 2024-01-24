import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import AltrpInput from "../altrp-input/AltrpInput";
import getResponsiveSetting from "../../../../../front-app/src/js/helpers/get-responsive-setting";
import updateValue from "../../decorators/update-value";


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
      this.state.value = value
    }
  }

  /**
   * Чистит значение
   */
  clearValue = async () => {
    let value = "";
    this.onChange(value);
    this.dispatchFieldValueToStore(value, true);

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
  }

  focusNext = (e) => {
    if (!e.target.hasAttribute('data-enter')) return;
    e.preventDefault();
    const inputs = Array.from(document.querySelectorAll("[data-enter='enabled']"));
    const index = inputs.indexOf(e.target);
    if (index === undefined) return;

    if(inputs[index + 1]){
      inputs[index + 1].focus();
    } else {
      inputs[0].focus();
    }

    const {
      create_allowed,
      create_label,
      create_url
    } = this.props.element.getSettings();
    if (create_allowed && create_label && create_url) {
      this.createItem(e);
    }
  }

  /**
   * Обработка нажатия клавиши
   * @param {{}} e
   */
  handleEnter = e => {
    if(e.keyCode === 9){
      this.focusNext(e)
    }
    if (e.keyCode === 13) {

      const settings = this.props.element.getSettings();
      const {
        beh_enter,
      } = settings;
      if (beh_enter === 'change') {
        const value = e.target.value
        e.preventDefault()
        this.dispatchFieldValueToStore(value, true)
      } else {
        this.focusNext(e)
      }
    }
  };

  /**
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
        state => ({...state, contentLoaded: true, value}),
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
        state => ({...state, contentLoaded: true, value}),
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
        state => ({...state, contentLoaded: true, value}),
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
  updateValue = updateValue.bind(this)

  /**
   * Изменение значения в виджете
   * @param e
   */
  onChange = async (e) => {
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
      if ((maxNumber || maxNumber == 0) && value > maxNumber) value = maxNumber
    }


    /**
     * Обновляем хранилище только если не текстовое поле
     */

    this.setState(state => ({...state, value}))

    const settings = this.props.element.getSettings();
    const {
      beh_keypress,
    } = settings;
    if (beh_keypress) {
      this.debounceDispatch(value, true)
    }

  }

  debounceDispatch = _.debounce(
    (value, userInput) => this.dispatchFieldValueToStore(value, userInput),
    100
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
    const settings = this.props.element.getSettings();
    const {
      beh_keypress,
    } = settings;
    if (!beh_keypress) {
      this.dispatchFieldValueToStore(e.target.value, true);
    }

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


    if (_.isObject(this.props.appStore) && fieldName && formId) {

      this.props.appStore.dispatch(
        changeFormFieldValue(fieldName, value, formId, userInput)
      );

      let query_sync = this.props.element.getLockedSettings(
        "query_sync"
      );
      if (!isEditor() && query_sync) {
        const updateQueryString = (await import(
          /* webpackChunkName: 'updateQueryString' */
          '../../../../../front-app/src/js/functions/updateQueryString')).default
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

  renderLeftIcon() {
    const {element} = this.props;
    let left_icon = element.getResponsiveLockedSetting('left_icon');
    let password_show_left_icon = element.getResponsiveLockedSetting('password_show_left_icon');
    const {content_type} = element.settings
    const leftIconProps = {}
    if (content_type === 'password' && this.state.showPassword && password_show_left_icon) {
      left_icon = password_show_left_icon
      leftIconProps.onClick = this.handleLockClick
    }
    if (content_type === 'password' && password_show_left_icon) {
      leftIconProps.onClick = this.handleLockClick
      leftIconProps.style = {
        cursor: 'pointer'
      }
    }
    if (!left_icon) {
      return null
    }
    return <span className="bp3-icon bp3-icon_text-widget bp3-icon_left" {...leftIconProps} tabIndex="0">
      {renderAsset(left_icon)}
    </span>
  }

  renderRightIcon() {
    const {element} = this.props;
    let right_icon = element.getResponsiveLockedSetting('right_icon');
    let password_show_right_icon = element.getResponsiveLockedSetting('password_show_right_icon');
    const {content_type} = element.settings
    const rightIconProps = {}
    if (content_type === 'password' && this.state.showPassword && password_show_right_icon) {
      right_icon = password_show_right_icon
    }
    if (content_type === 'password' && password_show_right_icon) {
      rightIconProps.onClick = this.handleLockClick
      rightIconProps.style = {
        cursor: 'pointer'
      }
    }
    if (!right_icon) {
      return null
    }
    return <span className="bp3-icon bp3-icon_text-widget bp3-icon_right" {...rightIconProps} tabIndex="0">
      {renderAsset(right_icon,)}
    </span>
  }

  /**
   * Получить css классы для InputTextCommonWidget
   */
  getClasses = () => {
    let classes = ``;
    if (this.isActive()) {
      classes += 'active '
    }
    if (this.isDisabled()) {
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
    const {
      errorState,
    } = this.state;
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
    if (value === undefined || value === null) {
      value = ''
    }

    const errorStateClass = errorState ? 'state-error' : ''

    const placeholder = replaceContentWithData(this.state.settings.content_placeholder, this.props.element.getCardModel()?.getData() || {})
    let input = (
      <div className={"altrp-input-wrapper " + errorStateClass + (this.state.settings.position_css_classes || "")}
           id={this.state.settings.position_css_id}>
        <AltrpInput
          type={this.state.settings.content_type === 'password' ? (this.state.showPassword ? "text" : "password") : this.state.settings.content_type}
          name={this.getName()}
          id={this.getName()}
          formId={this.props.element.getFormId()}
          fieldId={this.props.element.getFieldId()}
          element={this.props.element}
          className={classes}
          value={value}
          maxLength={(maxlength > 0 && typeInput) ? maxlength : null}
          data-enter={enterNextInput ? 'enabled' : null}
          readOnly={content_readonly}
          autoComplete={autocomplete}
          placeholder={placeholder}
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
