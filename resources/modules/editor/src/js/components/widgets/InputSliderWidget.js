import numberWithSpaces from "../../helpers/number-with-spaces";

import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import {Slider} from "@blueprintjs/core";

(window.globalDefaults = window.globalDefaults || []).push(`
.bp3-slider-label{
    white-space: nowrap;
}
.bp3-slider-handle{
    z-index: 2;
}
.bp3-slider-label{
    z-index: 1;
}
.altrp-field-slider .bp3-slider-handle {
  background-image: none;
}
.altrp-field-slider-horizontal .bp3-slider-label {
  transform: translate(-50%, 20px);
}
.altrp-field-slider-vertical .bp3-slider-label.bp3-slider-label.bp3-slider-label {
  transform: translate(20px, 50%);
}
`);

const SliderWrapper = styled.div`
  ${(props) => {
    let styles = "";

    if(props.handleSize) {
      if(props.handleSize.size) {
        styles += `
        &.altrp-field-slider-horizontal .bp3-slider-handle {
          left: calc(${(props.value/props.max*100).toFixed(2)}% - ${props.handle/ 2 + props.handleSize.size}px) !important;
        }

        &.altrp-field-slider-vertical .bp3-slider-handle {
          bottom: calc(${(props.value/props.max*100).toFixed(2)}% - ${props.handle/ 2 + props.handleSize.size}px) !important;
        }Size.size
        `
      }
    }

    return styles
  }}
`;

class InputSliderWidget extends Component {
  constructor(props) {
    super(props);

    let step = props.element.getResponsiveLockedSetting("step", "", null);
    const min = props.element.getResponsiveLockedSetting("min", "", 0);
    const max = props.element.getResponsiveLockedSetting("max", "", 100);

    if(step) {
      step = (max - min) / step;
    }

    this.state = {
      settings: props.element.getSettings(),
      value: min,
      step: step || 1,
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
    this.onChange = this.onChange.bind(this);
    this.label = this.label.bind(this);
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

  onChange(value) {
    // const step = this.state.step

    // if(!Number.isInteger(value)) {
    //   value = parseFloat(value.toFixed(String(step).split(".")[1].split("").length))
    // }
    let decimalPlace = this.props.element.getResponsiveLockedSetting("decimal_place", "", null);
    if(!Number.isInteger(value) && decimalPlace) {
      decimalPlace = Math.abs(decimalPlace);
        value = value
        .toFixed(decimalPlace)
    }
    if(isEditor()){
      this.setState((s) => ({...s, value}))
    } else {
      this.setState((s) => ({...s, value}))
      this.dispatchFieldValueToStore(value)
    }
  }

  label(decimalPlace, custom, thousandsSeparator, thousandsSeparatorValue, decimalSeparator) {
    return value => {
      value = Number(value)

      if(!Number.isInteger(value) && decimalPlace) {
        decimalPlace = Math.abs(decimalPlace);
        value = value
          .toFixed(decimalPlace)
      }
      if(!Number.isInteger(value) && decimalSeparator) {
        value = value.toString().replace(".", decimalSeparator)
      }

      if(thousandsSeparator) {
        if( ! thousandsSeparatorValue){
          thousandsSeparatorValue = ' '
        }
        value = numberWithSpaces(value, thousandsSeparatorValue);
      }


      return custom.toString().replace(/{n}/, value)
    }
  }

  getLabelFunction = () => {
    let decimalPlace = this.props.element.getResponsiveLockedSetting("decimal_place", "", null);
    const custom = this.props.element.getResponsiveLockedSetting("custom_label", "", "{n}");
    const thousandsSeparator = this.props.element.getResponsiveLockedSetting("thousands_separator", "", false);
    let thousandsSeparatorValue = this.props.element.getResponsiveLockedSetting("thousands_separator_value", "", " ");
    const decimalSeparator = this.props.element.getResponsiveLockedSetting("decimal_separator");

    return this.label(decimalPlace, custom, thousandsSeparator, thousandsSeparatorValue, decimalSeparator)
  }

  /**
   *
   * @returns {number}
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
      value = value === '' ? this.state.value : value
    }

    return value || this.props.element.getResponsiveLockedSetting('min') || 0;
  }

  /**
   *
   * @returns {JSX.Element}
   */

  /**
   * Получить css классы для input slider
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
    const min = this.props.element.getResponsiveLockedSetting("min", "", 0);
    const max = this.props.element.getResponsiveLockedSetting("max", "", 100);
    const labelStepSize = this.props.element.getResponsiveLockedSetting("label_step", "", 25);
    const decimalPlace = this.props.element.getResponsiveLockedSetting("decimal_place", "", null);
    const vertical = this.props.element.getResponsiveLockedSetting("vertical", "", false);
    const handleSize = this.props.element.getResponsiveLockedSetting("handle_size", "", null);
    let step = this.props.element.getResponsiveLockedSetting("step", "", 1);
    let classes =
      this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes') || "")

    const label = this.getLabelFunction()

    if(step == '0'){
      step = 1;
    }
    let value = this.getValue()
    value = Number(value)
    if(Number.isNaN(value)){
      value = Number(min)
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
          labelRenderer={label}
          labelStepSize={labelStepSize}
          vertical={vertical}
          className={`${classes} altrp-field-slider`}
        />
      </SliderWrapper>
    );
  }
}

export default InputSliderWidget;
