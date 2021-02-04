import { Component } from "react";
import { connect } from "react-redux";
import PaddingTooltipInput from "./PaddingTooltipInput";
import ReactSelect from "react-select";
import Schemes from "./NivoColorSchemes";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";

const mapStateToProps = state => {
  return { editElement: _.cloneDeep(state.editElement) };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}

const anchors = [
  { value: "top-left", label: "Сверху слева" },
  { value: "top", label: "Сверху" },
  { value: "top-right", label: "Сверху справа" },
  { value: "left", label: "Слева" },
  { value: "center", label: "По центру" },
  { value: "right", label: "Справа" },
  { value: "bottom-left", label: "Снизу слева" },
  { value: "bottom", label: "Снизу" },
  { value: "bottom-right", label: "Снизу справа" }
];

class TooltipSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editElement: props.editElement,
      padding: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5
      },
      currentColorScheme: "",
      lineWidth: 2,
    };
    this.setTooltipEnable = this.setTooltipEnable.bind(this);
    this.setColorScheme = this.setColorScheme.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.editElement?.settings?.color === "undefined") {
      setTimeout(() => {
        this.setColorScheme(regagroScheme);
      }, 1000);
    }
  }

  setColorScheme(value) {
    this.props.setColorScheme(value);
    this.setState(s => ({ ...s, currentColorScheme: value }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.editElement, this.props.editElement)) {
      this.setState(s => ({ ...s, editElement: this.props.editElement }));
    }
  }

  setTooltipEnable(e) {
    this.props.setProperty(e.target.checked, "enableCustomTooltip");
  }

  changeWidth(width) {
    this.props.setProperty(width, "lineWidth");
    this.setState(s => ({ ...s, lineWidth: width }));
  }

  render() {
    return (
      <>
        <div className="col">
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Отобразить собственные подсказки
            </div>
            <Checkbox
              disableRipple={true}
              defaultChecked={
                this.state.editElement?.settings?.enableCustomTooltip
              }
              checked={this.state.editElement?.settings?.enableCustomTooltip}
              onChange={this.setTooltipEnable}
              className={`${this.props.widgetID} altrp-dashboard__checkboxcolor`}
            />
          </div>
          {/* <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Отступы внутри подсказки
            </div>
            <PaddingTooltipInput
              widgetID={this.props.widgetID}
              setProperty={this.props.setProperty}
              padding={this.state.editElement?.settings?.tooltip?.padding}
            />
          </div>
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Отступы снаружи подсказки
            </div>
            <PaddingTooltipInput
              widgetID={this.props.widgetID}
              setProperty={this.props.setProperty}
              padding={this.state.editElement?.settings?.tooltip?.padding}
            />
          </div>
          <div className="mb-3">
          <div
            className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
          >
            Выберите семейство шрифта{" "}
          </div>
          <ReactSelect
            placeholder="Выберите семейство шрифта"
            className="select-type"
          />
        </div>
        <div className="mb-3">
          <div
            className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
          >
            Выберите цвет шрифта{" "}
          </div>
          <ReactSelect
            placeholder="Выберите цвет шрифта"
            className="select-type"    
          />
        </div>
        <div className="mb-3">
          <div
            className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
          >
            Выберите фон тултипа{" "}
          </div>
          <ReactSelect
            placeholder="Выберите фон тултипа"
            className="select-type"    
          />
        </div>
        <div className="mb-3">
              <div
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Размер шрифта
              </div>
              <Slider
                className={`${this.props.widgetID} altrp-dashboard__drawer--range-drawer-color`}
                defaultValue={
                  this.state.editElement?.settings?.lineWidth ||
                  this.state.lineWidth
                }
                onChange={(e, newValue) => this.changeWidth(newValue)}
                min={0}
                max={72}
                step={1}
              />
              (
              {this.state.editElement?.settings?.lineWidth ||
                this.state.lineWidth}
              px)
          </div> 
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Расположение текста тултипа
            </div>
            <ReactSelect
              placeholder="Выберите расположение"
              className="select-type"
            />
          </div>*/}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TooltipSettings);
