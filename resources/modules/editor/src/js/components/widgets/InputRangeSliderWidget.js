const Slider = window.altrpLibs.Blueprint.RangeSlider;

(window.globalDefaults = window.globalDefaults || []).push(`

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

class InputRangeSliderWidget extends Component {
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
      value: [
        props.element.getResponsiveSetting("initial", "", 0),
        props.element.getResponsiveSetting("initial_second", "", 0)
      ],
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
    const prevStep = prevState.step
    let step = this.props.element.getResponsiveSetting("step", "", null);
    const min = this.props.element.getResponsiveSetting("min", "", 0);
    const max = this.props.element.getResponsiveSetting("max", "", 100);

    if(step && step < max) {
      step = (max - min) / step;
    }

    if(step !== prevStep) {
      this.setState((s) => ({...s,
        step,
        value: [
          this.props.element.getResponsiveSetting("initial", "", 0),
          this.props.element.getResponsiveSetting("initial_second", "", 0)
        ]
      }))
    }
  }

  onChange(values) {
    const step = this.state.step

    values.forEach((value, idx) => {
      if(!Number.isInteger(value)) {
        values[idx] = parseFloat(value.toFixed(String(step).split(".")[1].split("").length))
      }
    });

    this.setState((s) => ({...s, value: values}))
  }

  label(value) {
    const step = this.props.element.getResponsiveSetting("step", "", 1);
    let decimalPlace = this.props.element.getResponsiveSetting("decimal_place", "", null);
    const custom = this.props.element.getResponsiveSetting("custom_label", "", "{n}");
    const thousandsSeparator = this.props.element.getResponsiveSetting("thousands_separator", "", false);
    const thousandsSeparatorValue = this.props.element.getResponsiveSetting("thousands_separator_value", "", ".");
    const decimalSeparator = this.props.element.getResponsiveSetting("decimal_separator", "", ",");

    if(!Number.isInteger(value) && decimalPlace && decimalSeparator) {
      decimalPlace = Math.abs(decimalPlace);

      value = value
        .toFixed(decimalPlace).replace(".", decimalSeparator)
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

  render() {
    const min = this.props.element.getResponsiveSetting("min", "", 0);
    const max = this.props.element.getResponsiveSetting("max", "", 100);
    // const step = this.props.element.getResponsiveSetting("step", "", 1);
    const labelStepSize = this.props.element.getResponsiveSetting("label_step", "", 25);
    const decimalPlace = this.props.element.getResponsiveSetting("decimal_place", "", null);
    const vertical = this.props.element.getResponsiveSetting("vertical", "", false);
    const handleSize = this.props.element.getResponsiveSetting("handle_size", "", null);

    console.log(this.state.value)
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
          stepSize={this.state.step !== 0 && this.state.step ? Math.abs(this.state.step) : 1}
          value={this.state.value}
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

export default InputRangeSliderWidget;
