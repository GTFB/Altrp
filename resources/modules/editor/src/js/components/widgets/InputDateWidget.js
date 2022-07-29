const {
  isEditor,
  parseOptionsFromSettings,
  replaceContentWithData,
  renderAssetIcon,
  moment,
  getDataFromLocalStorage
} = window.altrpHelpers;
import { changeFormFieldValue } from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import getResponsiveSetting from "../../../../../front-app/src/js/helpers/get-responsive-setting";

const { DateInput, TimePrecision } = window.altrpLibs.BlueprintDatetime;
(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-date-field-container .bp3-popover-wrapper, .altrp-date-field-container .bp3-popover-target {
    width: 100%;
  }

  .altrp-date-picker-popover .bp3-datepicker-caption select + .bp3-icon {
    right: 2px !important;
  }

  .altrp-date-picker-popover .bp3-datepicker-year-select select {
    padding: 0 0 0 2px;
  }
`)

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

class InputDateWidget extends Component {
  timeInput = null;

  constructor(props) {
    super(props);
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.defaultValue = this.getLockedContent("content_default_value") || "";

    this.timePrecision = null;
    this.typeDate = props.element.getLockedSettings("content_time_type", "date");
    this.locale = this.props.element.getLockedSettings("content_locale", "en");

    switch (this.typeDate) {
      case "date":
        this.typeDate = "LL";
        break;
      case "time":
        this.typeDate = "LT";
        this.timePrecision = TimePrecision.MINUTE
        break
      case "dateTime":
        this.typeDate = "llll";
        this.timePrecision = TimePrecision.MINUTE
        break
    }

    let value = moment().locale(this.locale).toDate();

    let format = ''
    if(this.typeDate === 'llll') {
      format = this.props.element.getLockedSettings('content_format') || 'YYYY-MM-DD HH:mm:ss';
    } else {
      format = this.props.element.getLockedSettings('content_format') || 'YYYY-MM-DD';
    }


    if(this.defaultValue) {
      value = moment(this.defaultValue, format)
      value = value.isValid() ? value.format(format) : '';
    }

    this.state = {
      settings: { ...props.element.getSettings() },

      paramsForUpdate: null
    };
    this.altrpSelectRef = React.createRef();

    this.dispatchFieldValueToStore(value);
  }

  /**
   * Чистит значение
   */
  clearValue() {
    this.onChange("");
    this.dispatchFieldValueToStore("", true);
  }

  /**
   * Загрузка виджета
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  async _componentDidMount(prevProps, prevState) {


    let value = this.state.value;

    /**
     * Если динамическое значение загрузилось,
     * то используем this.getLockedContent для получение этого динамического значения
     * старые динамические данные
     * */
    if (
      _.get(value, "dynamic") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getLockedContent("content_default_value");
    }

    /**
     * Если модель обновилась при смене URL
     */
    if (
      prevProps &&
      !prevProps.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getLockedContent("content_default_value");

      if(value) {
        value = moment(value).locale(this.locale).toDate()
        this.setState(
          state => ({ ...state, value, contentLoaded: true }),
          () => {
            this.dispatchFieldValueToStore(value);
          }
        );
      } else {
        this.setState(
          state => ({ ...state, contentLoaded: true }),
        );
      }

      const format = this.props.element.getLockedSettings('content_format') || 'YYYY-MM-DD';
      value = moment(value, format);
      value = value.isValid() ? value.format(format) : '';
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
      value = this.getLockedContent("content_default_value");

      if(value) {
        const format = this.props.element.getLockedSettings('content_format') || 'YYYY-MM-DD';
        value = moment(value, format);
        value = value.isValid() ? value.format(format) : '';
        this.setState(
          state => ({ ...state, value, contentLoaded: true }),
          () => {
            this.dispatchFieldValueToStore(value);
          }
        );
      } else {
        this.setState(
          state => ({ ...state, contentLoaded: true }),
        );
      }
      const format = this.props.element.getLockedSettings('content_format') || 'YYYY-MM-DD';
      value = moment(value, format);
      value = value.isValid() ? value.format(format) : '';
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
   * Обновление виджета
   */
  async _componentDidUpdate(prevProps, prevState) {

    if (
      prevProps &&
      !prevProps.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded")
    ) {
      let value = this.getLockedContent(
        "content_default_value",
      );
      if(value) {
        const format = this.props.element.getLockedSettings('content_format') || 'YYYY-MM-DD';
        value = moment(value, format);
        value = value.isValid() ? value.format(format) : '';
        this.setState(
          state => ({ ...state, value, contentLoaded: true }),
          () => {
            this.dispatchFieldValueToStore(value);
          }
        );
      } else {
        this.setState(
          state => ({ ...state, contentLoaded: true }),
        );
      }
      const format = this.props.element.getLockedSettings('content_format') || 'YYYY-MM-DD';
      value = moment(value, format);
      value = value.isValid() ? value.format(format) : '';
      this.setState(
        state => ({ ...state, value, contentLoaded: true }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
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
          value: moment(_.get(altrpforms, path)).locale(this.locale).toDate()
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


  getFormat() {
    let format = this.props.element.getLockedSettings('content_format');

    if(!format) {
      switch (this.typeDate) {
        case "llll":
          format = "MMMM Do YYYY, kk:mm"
          break
        case "LT":
          format = "kk:mm"
          break
        default:
          format = "MMMM Do YYYY"
      }
    }
    return format
  }

  /**
   * Изменение значения в виджете
   * @param val
   * @param {boolean} userInput
   */
  onChange = (val, userInput) =>{
    let value = "";

    if (val) {
      value = new Date(val);
      let timestamp = this.props.element.getLockedSettings("content_timestamp");

      if (timestamp) {
        value = value.getTime(); // timestamp
      } else{
        const format = this.getFormat();
        value = moment(value, format);
        value = value.isValid() ? value.format(format) : '';
      }
    }
    this.setState(state=>({...state, value}))
    this.dispatchFieldValueToStore(value, userInput);
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

  /**
   *
   * @returns {Date}
   */
  getValue = ()=>{
    let value ;
    let formId = this.props.element.getFormId();
    let fieldName = this.props.element.getFieldId();
    const format = this.getFormat()
    const timestamp = this.props.element.getLockedSettings("content_timestamp");
    const nullable = this.props.element.getLockedSettings("nullable");

    if(isEditor()){
      if(!nullable) {
        value = new Date();
      }
    } else {

      value = _.get(appStore.getState().formsStore, `${formId}`, '')
      value = _.get(value, fieldName, '')
      if(!value){
        if(!nullable) {
          value = new Date();
        }
      } else if(timestamp){
        value = new Date(value);
      } else {
        value = moment(value, format)
        value = value.toDate();
      }
    }

    return value;
  }

  /**
   * Получить css классы для inputDate
   */
  getClasses = ()=>{
    let classes = `altrp-date-picker${this.props.element.getId()} `;
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
    const settings = this.props.element.getLockedSettings();
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
          {label_icon && label_icon.type && (
            <span className="altrp-label-icon">
              {renderAssetIcon(label_icon)}
            </span>
          )}
        </div>
      );
    } else {
      label = null;
    }


    if (0) {
      const isValid = moment.unix(value).isValid();

      if (isValid) {
        try {
          value = moment.unix(value / 1000).format("YYYY-MM-DD");
        } catch (error) {
          console.log(error);
        }
      }
    }

    let frame = document.body;

    if (isEditor()) {
      frame = document.getElementById("editorContent").contentWindow.document.body
    }

    const locale = this.locale;
    let typeDate = this.props.element.getLockedSettings("content_time_type", "date");
    let timePrecision = this.timePrecision;

    const dayPickerProps = {
      firstDayOfWeek: 1,
      className: this.typeDate === 'time' ? 'altrp-hidden' : '',
    }

    switch (locale) {
      case "ru":
        dayPickerProps.months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        dayPickerProps.weekdaysShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',]
    }

    const minimalStyle = this.props.element.getResponsiveLockedSetting("picker_minimal", false);
    const timePickerProps = {
      showArrowButtons: true,
      precision: timePrecision,
      onChange: typeDate === 'date' ? this.onChange : undefined,
      className: typeDate === 'date' ? 'altrp-hidden' : '',
    };

    let format = ''
    if (typeDate === 'dateTime') {
      format = this.props.element.getLockedSettings('content_format') || 'YYYY-MM-DD HH:mm:ss'
    } else {
      format = this.props.element.getLockedSettings('content_format') || 'YYYY-MM-DD'
    }

    let classes = this.getClasses()
    const input = (
      <div className="altrp-input-wrapper">
        <DateInput
          name={this.getName()}
          minDate={new Date(1900, 1, 1)}
          maxDate={moment().add(20,'year').toDate()}
          dayPickerProps={dayPickerProps}
          popoverProps={{
            portalContainer: frame,
            minimal: minimalStyle,
            popoverClassName: "altrp-date-picker-popover altrp-date-picker-popover-" + this.props.element.getId(),
            // popoverClassName: "altrp-date-pickerpopover" + this.props.element.getId(),
          }}
          onChange={this.typeDate !== 'LT' ? this.onChange : undefined}
          className={classes}
          timePrecision={timePrecision}
          canClearSelection={false}
          // showActionsBar
          parseDate={(str, locale) => {
            return moment(str, this.typeDate).locale(locale).toDate();
          }}
          timePickerProps={timePickerProps}
          disabled={this.state.settings.content_readonly}
          placeholder={this.state.settings.content_placeholder}
          formatDate={(date, locale) => {
            return moment(date).locale(locale).format(format);
          }}
          value={this.getValue() || null}
          locale={locale}
        />
      </div>
    );

    return (
      <AltrpFieldContainer
        settings={settings}
        className="altrp-field-container altrp-date-field-container "
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

export default InputDateWidget;
