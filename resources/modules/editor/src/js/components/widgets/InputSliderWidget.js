const Slider = window.altrpLibs.Blueprint.Slider;

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
          left: calc(${(props.value/props.max*100).toFixed(2)}% - ${props.handleSize.size}px) !important;
        }

        &.altrp-field-slider-vertical .bp3-slider-handle {
          bottom: calc(${(props.value/props.max*100).toFixed(2)}% - ${props.handleSize.size / 2 + props.handleSize.size}px) !important;
        }
        `
      }
    }

    return styles
  }}
`;

class InputSliderWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
      value: props.element.getResponsiveSetting("initial", "", 0),
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

  onChange(value) {
    const step = this.props.element.getResponsiveSetting("step", "", 1);

    if(!Number.isInteger(value)) {
      value = parseFloat(value.toFixed(String(step).split(".")[1].split("").length))
    }

    this.setState((s) => ({...s, value}))
  }

  label(value) {
    const step = this.props.element.getResponsiveSetting("step", "", 1);
    const custom = this.props.element.getResponsiveSetting("custom_label", "", "{n}");
    const thousandsSeparator = this.props.element.getResponsiveSetting("thousands_separator", "", false);

    if(thousandsSeparator) {
      value = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }


    if(!Number.isInteger(value)) {
      value = value.toFixed(String(step).split(".")[1].split("").length)
    }

    return custom.toString().replace(/{n}/, value)
  }

  render() {
    const min = this.props.element.getResponsiveSetting("min", "", 0);
    const max = this.props.element.getResponsiveSetting("max", "", 100);
    const step = this.props.element.getResponsiveSetting("step", "", 1);
    const labelStepSize = this.props.element.getResponsiveSetting("label_step", "", 25);
    const decimalPlace = this.props.element.getResponsiveSetting("decimal_place", "", null);
    const vertical = this.props.element.getResponsiveSetting("vertical", "", false);
    const handleSize = this.props.element.getResponsiveSetting("handle_size", "", null);

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
          stepSize={step !== 0 && step ? Math.abs(step) : 1}
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

export default InputSliderWidget;
