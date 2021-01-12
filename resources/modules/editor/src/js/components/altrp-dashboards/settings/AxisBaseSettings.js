import React, { Component } from "react";
import { connect } from "react-redux";
import { editElement } from "../../../store/altrp-dashboard/actions";
import ReactSelect from "react-select";

const selectSettings = {
  menuList: (provided, state) => ({
    ...provided,
    zIndex: "999999999999999999999",
    position: "relative"
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: "999999999999999999999",
    position: "relative"
  }),
  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: "999999999999999999999",
    position: "relative"
  })
};

const xScale = [
  {
    id: 0,
    label: "Линейный",
    value: "linear"
  },
  {
    id: 1,
    label: "Точечный",
    value: "point"
  },
  {
    id: 2,
    label: "Временной",
    value: "time"
  }
];

const yScale = [
  {
    id: 0,
    value: "linear"
  },
  {
    id: 1,
    value: "point"
  }
];

const timeScales = [
  { id: 4, label: "День", value: "day" },
  { id: 5, label: "Месяц", value: "month" },
  { id: 6, label: "Год", value: "year" }
];

const mapStateToProps = state => {
  return { editElement: _.cloneDeep(state.editElement) };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}

class AxisBaseSettings extends Component {
  constructor(props) {
    super(props);
    const element =
      props.editElement !== null ? _.cloneDeep(props.editElement) : {};
    this.state = {
      editElement: element
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(
        prevProps.editElement?.settings,
        this.props.editElement?.settings
      )
    ) {
      this.setState(s => ({ ...s, editElement: this.props.editElement }));
    }
  }

  render() {
    const scaleType = this.state.editElement?.settings?.xScale?.type;
    return (
      <div className="col mb-1">
        <div className="mb-3">
          <div
            className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
          >
            Ось X
          </div>
          <ReactSelect
            placeholder="Выберите отображение"
            options={xScale}
            className={`${this.props.widgetID} altrp-dashboard__drawer--select select-type`}
            defaultValue={this.state.editElement?.settings?.xScale?.type}
            defaultInputValue={
              _.find(xScale, {
                value: this.state.editElement?.settings?.xScale?.type
              })?.label || ""
            }
            onChange={option => this.props.setXAxisScale(option.value)}
            getOptionValue={option => option.value}
            getOptionLabel={option => option.label}
            styles={selectSettings}
          />
        </div>
        {typeof scaleType !== "undefined" && scaleType === "time" && (
          <div className="mb-3">
            <div
              className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
            >
              Масштаб времени
            </div>
            <ReactSelect
              placeholder="Выберите масштаб времени"
              options={timeScales}
              className="select-type"
              defaultValue={this.state.editElement?.settings?.xScale?.precision}
              defaultInputValue={
                _.find(timeScales, {
                  value: this.state.editElement?.settings?.xScale?.precision
                })?.label || ""
              }
              onChange={option => this.props.setXAxisTimeScale(option.value)}
              getOptionValue={option => option.value}
              getOptionLabel={option => option.label}
              styles={selectSettings}
            />
          </div>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AxisBaseSettings);
