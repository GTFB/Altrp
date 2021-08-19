const { isEditor } =
  window.altrpHelpers
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";

const Slider = window.altrpLibs.Blueprint.Slider;

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
`);

const SliderWrapper = styled.div`
  .altrp-field-slider .bp3-slider-handle {
    background-image: none;
  }

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

    let step = props.element.getResponsiveSetting("step", "", null);
    const min = props.element.getResponsiveSetting("min", "", 0);
    const max = props.element.getResponsiveSetting("max", "", 100);

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

  _componentDidUpdate(prevProps, prevState) {




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

  onChange(value) {
    // const step = this.state.step

    // if(!Number.isInteger(value)) {
    //   value = parseFloat(value.toFixed(String(step).split(".")[1].split("").length))
    // }
    let decimalPlace = this.props.element.getResponsiveSetting("decimal_place", "", null);
    if(!Number.isInteger(value) && decimalPlace) {
      decimalPlace = Math.abs(decimalPlace);
      console.log(value);
      value = value
        .toFixed(decimalPlace)
    }
    if(isEditor()){
      this.setState((s) => ({...s, value}))
    } else {
      this.dispatchFieldValueToStore(value)
    }
  }

  label(value) {
    let decimalPlace = this.props.element.getResponsiveSetting("decimal_place", "", null);
    const custom = this.props.element.getResponsiveSetting("custom_label", "", "{n}");
    const thousandsSeparator = this.props.element.getResponsiveSetting("thousands_separator", "", false);
    const thousandsSeparatorValue = this.props.element.getResponsiveSetting("thousands_separator_value", "", " ");
    const decimalSeparator = this.props.element.getResponsiveSetting("decimal_separator", "", ",");
    value = Number(value)

    if(!Number.isInteger(value) && decimalPlace) {
      decimalPlace = Math.abs(decimalPlace);
      value = value
        .toFixed(decimalPlace)
    }
    if(!Number.isInteger(value) && decimalSeparator) {
      value = value.replace(".", decimalSeparator)
    }

    if(thousandsSeparator && thousandsSeparatorValue) {
      value = value
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, thousandsSeparatorValue);
    }


    return custom
      .toString()
      .replace(/{n}/, value)
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
      value = _.get(appStore.getState(), `formsStore.${formId}.${fieldName}`, '')
    }

    return value || this.props.element.getResponsiveSetting('min') || 0;
  }

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    const min = this.props.element.getResponsiveSetting("min", "", 0);
    const max = this.props.element.getResponsiveSetting("max", "", 100);
    const labelStepSize = this.props.element.getResponsiveSetting("label_step", "", 25);
    const decimalPlace = this.props.element.getResponsiveSetting("decimal_place", "", null);
    const vertical = this.props.element.getResponsiveSetting("vertical", "", false);
    const handleSize = this.props.element.getResponsiveSetting("handle_size", "", null);
    let step = this.props.element.getResponsiveSetting("step", "", 1);
    if(step == '0'){
      step = 1;
    }
    let value = this.getValue()
    console.log(value);
    value = Number(value)
    if(Number.isNaN(value)){
      value = Number(min)
    }
    return (
      <SliderWrapper
        value={this.state.value}
        max={max}
        handleSize={handleSize}
        className={"altrp-field-slider-wrapper" + (vertical ? " altrp-field-slider-vertical" : " altrp-field-slider-horizontal")}
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
          className="altrp-field-slider"
        />
      </SliderWrapper>
    );
  }
}

export default InputSliderWidget;
