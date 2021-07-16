const {
  isEditor,
  parseOptionsFromSettings,
  replaceContentWithData,
  renderAssetIcon,
  moment,
  getDataFromLocalStorage
} = window.altrpHelpers;
import { changeFormFieldValue } from "../../../../../front-app/src/js/store/forms-data-storage/actions";
const { DateInput, TimePrecision } = window.altrpLibs.BlueprintDatetime;
(window.globalDefaults = window.globalDefaults || []).push(`
 /*здесь css стилей по умолчанию с селекторами*/
`)

const AltrpFieldContainer = styled.div`
  ${({ settings: { content_label_position_type } }) => {
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

    this.defaultValue = this.getContent("content_default_value") || "";

    this.state = {
      settings: { ...props.element.getSettings() },
      // value: this.defaultValue,
      options: parseOptionsFromSettings(
        props.element.getSettings("content_options")
      ),
      paramsForUpdate: null
    };
    this.altrpSelectRef = React.createRef();
    if (this.getContent("content_default_value")) {
      let value = this.getContent("content_default_value")
      const format = this.props.element.getSettings('content_format') || 'YYYY-MM-DD';
      value = moment(value);
      value = value.isValid() ? value.format(format) : '';
      this.dispatchFieldValueToStore(value);
    }
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
    if (this.props.element.getSettings("content_options")) {
      let options = parseOptionsFromSettings(
        this.props.element.getSettings("content_options")
      );

      this.setState(state => ({ ...state, options }));
    }

    let value = this.state.value;

    /**
     * Если динамическое значение загрузилось,
     * то используем this.getContent для получение этого динамического значения
     * старые динамические данные
     * */
    if (
      _.get(value, "dynamic") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getContent("content_default_value");
    }

    /**
     * Если модель обновилась при смене URL
     */
    if (
      prevProps &&
      !prevProps.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getContent("content_default_value");
      const format = this.props.element.getSettings('content_format') || 'YYYY-MM-DD';
      value = moment(value);
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
      value = this.getContent("content_default_value");
      const format = this.props.element.getSettings('content_format') || 'YYYY-MM-DD';
      value = moment(value);
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
      let value = this.getContent(
        "content_default_value",
      );
      const format = this.props.element.getSettings('content_format') || 'YYYY-MM-DD';
      value = moment(value);
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

    let content_calculation = this.props.element.getSettings(
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
        "Evaluate error in Input" + e.message,
        this.props.element.getId()
      );
    }
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
      let timestamp = this.props.element.getSettings("content_timestamp");

      if (timestamp) {
        value = value.getTime(); // timestamp
      } else{
        const format = this.props.element.getSettings('content_format') || 'YYYY-MM-DD';
        value = moment(value).format(format)
      }
    }
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
        const change_actions = this.props.element.getSettings("change_actions");

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
    const format = this.props.element.getSettings('content_format') || 'YYYY-MM-DD'
    const timestamp = this.props.element.getSettings("content_timestamp");

    if(isEditor()){
      value = new Date();
    } else {
      value = _.get(appStore.getState(), `formsStore.${formId}.${fieldName}`, '')
      if(! value){
        value = new Date();

      } else if(timestamp){
        value = new Date(value);
      } else {
        value = moment(value, format)
        value = value.toDate();
      }
    }
    return value;
  }
  render() {
    let label = null;
    const settings = this.props.element.getSettings();
    const {
      label_icon
    } = settings;
    let classLabel = "";
    let styleLabel = {};
    const content_label_position_type = this.props.element.getResponsiveSetting(
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

    if (this.state.settings.content_label) {
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
            {this.state.settings.content_label}
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

    const locale = this.props.element.getSettings("content_locale", "en");
    let typeDate = this.props.element.getSettings("content_time_type", "date");
    let timePrecision = null;

    const dayPickerProps = {
      className: typeDate === 'time' ? 'altrp-hidden' : '',
    }
    switch (typeDate) {
      case "date":
        typeDate = "LL";
        break;
      case "time":
        typeDate = "LT";
        timePrecision = TimePrecision.MINUTE
        break
      case "dateTime":
        typeDate = "llll";
        timePrecision = TimePrecision.MINUTE
        break
    }

    switch (locale) {
      case "ru":
        dayPickerProps.months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        dayPickerProps.weekdaysShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    }

    const minimalStyle = this.props.element.getResponsiveSetting("picker_minimal", false);
    const timePickerProps = {
      showArrowButtons: true,
      precision: timePrecision,
      onChange: typeDate === 'LT' ? this.onChange : undefined,
      className: typeDate === 'LL' ? 'altrp-hidden' : '',
    };
    const format = this.props.element.getSettings('content_format') || 'YYYY-MM-DD';
    const input = (
      <div className="altrp-input-wrapper">
        <DateInput
          name={this.getName()}
          minDate={new Date(0)}
          maxDate={moment().add(20,'year').toDate()}
          dayPickerProps={dayPickerProps}
          popoverProps={{
            portalContainer: frame,
            minimal: minimalStyle,
            popoverClassName: "altrp-date-pickerpopover" + this.props.element.getId(),
          }}
          onChange={typeDate !== 'LT' ? this.onChange : undefined}
          className={"altrp-date-picker" + this.props.element.getId()}
          timePrecision={timePrecision}
          canClearSelection={false}
          // showActionsBar
          parseDate={(str, locale) => {
            return moment(str, typeDate).locale(locale).toDate();
          }}
          timePickerProps={timePickerProps}
          disabled={this.state.settings.content_readonly}
          placeholder={this.state.settings.content_placeholder}
          formatDate={(date, locale) => {
            return moment(date).locale(locale).format(format);
          }}
          value={this.getValue()}
          locale={locale}
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

export default InputDateWidget;
