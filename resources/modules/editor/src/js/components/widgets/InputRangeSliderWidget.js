import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import numberWithSpaces from "../../helpers/number-with-spaces";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import delay from "../../../../../front-app/src/js/functions/delay";
import {RangeSlider} from '@blueprintjs/core'

const Slider = RangeSlider;

const SliderWrapper = styled.div`
  ${(props) => {
  let styles = "";

  if (props.handleSize) {
    if (props.handleSize.size) {
      styles += `
        &.altrp-field-slider-horizontal .bp3-slider-handle.bp3-start {
          left: calc(${(props.value[0] / props.max * 100).toFixed(2)}% - 8px) !important;
        }

        &.altrp-field-slider-horizontal .bp3-slider-handle.bp3-end {
          left: calc(${(props.value[1] / props.max * 100).toFixed(2)}% - 8px) !important;
        }

        &.altrp-field-slider-vertical .bp3-slider-handle.bp3-start {
          bottom: calc(${(props.value[0] / props.max * 100).toFixed(2)}% - ${props.handleSize.size - 4}px) !important;
        }

        &.altrp-field-slider-vertical .bp3-slider-handle.bp3-end {
          bottom: calc(${(props.value[1] / props.max * 100).toFixed(2)}% - ${props.handleSize.size - 4}px) !important;
        }
        `
    }
  }

  return styles
}}
`;

class InputRangeSliderWidget extends Component {
  constructor(props) {
    super(props);
    const element = this.props.element;
    const {replaceContentWithData}  = window.altrpHelpers

    let step = props.element.getResponsiveLockedSetting("step", "", null);

    let min = this.props.element.getResponsiveLockedSetting("min", "", 0);
    min = Number(replaceContentWithData(min, element.getCardModel()))
    if(_.isNaN(Number(min))) {
      min = 0
    }
    let max = this.props.element.getResponsiveLockedSetting("max", "", 100);
    max = Number(replaceContentWithData(max, element.getCardModel()))
    if(_.isNaN(Number(max))) {
      max = 100
    }
    if (step) {
      step = (max - min) / step;
    }

    this.state = {
      settings: props.element.getSettings(),
      value: [
        min,
        max
      ],
      step: step || 1,
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
    this.label = this.label.bind(this);
  }

  _componentDidUpdate(prevProps, prevState) {
    const element = this.props.element;
    const {replaceContentWithData}  = window.altrpHelpers
    const prevStep = prevState.step
    let step = this.props.element.getResponsiveLockedSetting("step", "", null);

    let min = this.props.element.getResponsiveLockedSetting("min", "", 0);
    min = Number(replaceContentWithData(min, element.getCardModel()))
    if(_.isNaN(Number(min))) {
      min = 0
    }
    let max = this.props.element.getResponsiveLockedSetting("max", "", 100);
    max = Number(replaceContentWithData(max, element.getCardModel()))
    if(_.isNaN(Number(max))) {
      max = 0
    }
    if (step && step < max) {
      step = (max - min) / step;
    }

    if (step !== prevStep) {
      this.setState((s) => ({
        ...s,
        step,
        value: [
          this.props.element.getResponsiveLockedSetting("initial", "", 0),
          this.props.element.getResponsiveLockedSetting("initial_second", "", 0)
        ]
      }))
    }
    this.updateValue(prevProps);

  }

  updateValue = ()=>{

    if (isEditor()) {
      return;
    }

    if (
      this.props.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      !this.state.contentLoaded
    ) {
      let content_start_default = Number(this.getContent("content_start_default"))
      let content_end_default = Number(this.getContent("content_end_default"))


      if(! _.isNaN(content_start_default)){
        this.dispatchFieldValueToStore(content_start_default, 0)
      }
      if(! _.isNaN(content_end_default)){
        this.dispatchFieldValueToStore(content_end_default, 1)
      }
      this.setState(
        state => ({...state, contentLoaded: true}),
        () => {
          //this.dispatchFieldValueToStore(value);
        }
      );
      return;
    }
    return;
  }

  /**
   * Передадим значение в хранилище формы
   * @param {*} value
   * @param index
   * @param {boolean} userInput true - имзенилось пользователем
   */
  dispatchFieldValueToStore = async (value, index, userInput = false) => {

    let formId;
    let fieldName;
    const {replaceContentWithData}  = window.altrpHelpers
    if (index === 0) {
      formId = this.props.element.getFormId("form_id_start");
      fieldName = this.props.element.getFieldId("field_id_start");
    } else if (index === 1) {
      formId = this.props.element.getFormId("form_id_end");
      fieldName = this.props.element.getFieldId("field_id_end");
    }
    if (fieldName.indexOf("{{") !== -1) {
      fieldName = replaceContentWithData(fieldName);
    }

    if (fieldName && formId) {
      appStore.dispatch(
        changeFormFieldValue(fieldName, value, formId, userInput)
      );

      if (userInput) {

        let query_sync = this.props.element.getLockedSettings(
          "query_sync"
        );

        if(!isEditor() && query_sync){
          const updateQueryString = (await import('../../../../../front-app/src/js/functions/updateQueryString')).default
          updateQueryString(fieldName, value)
        }
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
   *
   * @returns {number}
   */
  getValue = () => {
    let value;
    let formIdStart = this.props.element.getFormId("form_id_start");
    let fieldNameStart = this.props.element.getFieldId("field_id_start");
    let formIdEnd = this.props.element.getFormId("form_id_end");
    let fieldNameEnd = this.props.element.getFieldId("field_id_end");

    const element = this.props.element;
    const {replaceContentWithData}  = window.altrpHelpers

    let min = this.props.element.getResponsiveLockedSetting("min", "", 0);
    min = Number(replaceContentWithData(min, element.getCardModel()))
    if(_.isNaN(Number(min))) {
      min = 0
    }
    let max = this.props.element.getResponsiveLockedSetting("max", "", 100);
    max = Number(replaceContentWithData(max, element.getCardModel()))
    if(_.isNaN(Number(max))) {
      max = 100
    }
    if (isEditor()) {
      return this.state.value;
    } else {
      let valueStart

      valueStart = _.get(appStore.getState().formsStore, `${formIdStart}`, '')
      valueStart = _.get(valueStart, fieldNameStart, '')
      let valueEnd

      valueEnd = _.get(appStore.getState().formsStore, `${formIdEnd}`, '')
      valueEnd = _.get(valueEnd, fieldNameEnd, '')

      if (valueStart || valueEnd) {
        value = [
          valueStart,
          valueEnd
        ];
      } else {
        value = this.state.value
      }
    }

    if (!value[0] && !value[1]) {
      return [
        this.props.element.getResponsiveLockedSetting('min', "", 0),
        this.props.element.getResponsiveLockedSetting('max', "", 100),
      ]
    }

    if (!value[0]) {
      value[0] = this.props.element.getResponsiveLockedSetting('min', "", 0);
    }

    if (!value[1]) {
      value[1] = this.props.element.getResponsiveLockedSetting('max', "", 100);
    }
    value = value.map((value) => (Number(value) || 0))

    if(! _.isNaN(Number(min)) && value[0] < min ){
      this.dispatchFieldValueToStore(min, 0, true)
    } else if(value[0] > value[1]){
      this.dispatchFieldValueToStore(value[1], 0, true)
    }
    if(! _.isNaN(Number(max)) && value[1] > max){
      this.dispatchFieldValueToStore(max, 1, true)
    }
    return value
  }

  onChange = async (values) => {
    let decimalPlace = this.props.element.getResponsiveLockedSetting("decimal_place", "", null);
    decimalPlace = Math.abs(decimalPlace);

    values.forEach((value, idx) => {
      if (!Number.isInteger(value)) {
        values[idx] = value
          .toFixed(decimalPlace)
      }
    });

    if (isEditor()) {
      this.setState((s) => ({...s, value: values}))
    } else {
      this.setState((s) => ({...s, value: values}))


      if(values[0] != this.getValue()[0]){
        this.dispatchFieldValueToStore(values[0], 0, true)
      }

      if(values[1] != this.getValue()[1]){
        this.dispatchFieldValueToStore(values[1], 1, true)
      }
    }
  }

  label(value) {
    let decimalPlace = this.props.element.getResponsiveLockedSetting("decimal_place", "", null);
    const custom = this.props.element.getResponsiveLockedSetting("custom_label", "", "{n}");
    const thousandsSeparator = this.props.element.getResponsiveLockedSetting("thousands_separator", "", false);
    let thousandsSeparatorValue = this.props.element.getResponsiveLockedSetting("thousands_separator_value", "", " ");
    const decimalSeparator = this.props.element.getResponsiveLockedSetting("decimal_separator");
    value = Number(value)

    if (!Number.isInteger(value) && decimalPlace) {
      decimalPlace = Math.abs(decimalPlace);
      value = value
        .toFixed(decimalPlace)
    }

    if (!Number.isInteger(value) && decimalSeparator) {
      value = value.toString().replace(".", decimalSeparator)
    }

    if (thousandsSeparator) {
      if (!thousandsSeparatorValue) {
        thousandsSeparatorValue = ' '
      }
      value = numberWithSpaces(value, thousandsSeparatorValue);
    }


    return custom
      .toString()
      .replace(/{n}/, value)
  }

  /**
   * Получить css классы для input slider range
   */
  getClasses = () => {
    let classes = ` `;
    if (this.isActive()) {
      classes += 'active '
    }
    if (this.isDisabled()) {
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    const element = this.props.element;
    const {replaceContentWithData}  = window.altrpHelpers

    let min = this.props.element.getResponsiveLockedSetting("min", "", 0);
    min = Number(replaceContentWithData(min, element.getCardModel()))
    if(_.isNaN(Number(min))) {
      min = 0
    }
    let max = this.props.element.getResponsiveLockedSetting("max", "", 100);
    max = Number(replaceContentWithData(max, element.getCardModel()))
    if(_.isNaN(Number(max))) {
      max = 100
    }

    // const step = this.props.element.getResponsiveLockedSetting("step", "", 1);
    const labelStepSize = this.props.element.getResponsiveLockedSetting("label_step", "", 25);
    const decimalPlace = this.props.element.getResponsiveLockedSetting("decimal_place", "", null);
    const vertical = this.props.element.getResponsiveLockedSetting("vertical", "", false);
    const handleSize = this.props.element.getResponsiveLockedSetting("handle_size", "", null);
    let step = this.props.element.getResponsiveLockedSetting("step", "", 1);
    let classes =
      this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes') || "")

    let value = this.getValue();

    if (_.isNaN(Number(value[0]))) {
      value[0] = Number(min)
    }

    if (_.isNaN(Number(value[1]))) {
      value[1] = Number(max);
    }

    return (
      <SliderWrapper
        value={this.state.value}
        max={max}
        handleSize={handleSize}
        className={`${classes} altrp-field-slider-wrapper" ${(vertical ? " altrp-field-slider-vertical" : " altrp-field-slider-horizontal")}`}
      >
        <Slider
          min={min}
          max={max}
          stepSize={step}
          value={value}
          onChange={this.onChange}
          labelPrecision={decimalPlace}
          labelRenderer={this.label}
          labelStepSize={labelStepSize}
          vertical={vertical}
          className={`${classes} altrp-field-slider`}
        />
      </SliderWrapper>
    );
  }
}

export default InputRangeSliderWidget;
