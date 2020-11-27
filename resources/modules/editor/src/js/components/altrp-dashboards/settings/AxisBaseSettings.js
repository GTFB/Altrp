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
    value: "linear"
  },
  {
    id: 1,
    value: "point"
  },
  {
    id: 2,
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
  { id: 4, label: "день", value: "day" },
  { id: 5, label: "месяц", value: "month" },
  { id: 6, label: "год", value: "year" }
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
        <label htmlFor="">
          Ось X
          <ReactSelect
            options={xScale}
            className="select-type"
            defaultValue={this.state.editElement?.settings?.xScale?.type}
            defaultInputValue={this.state.editElement?.settings?.xScale?.type}
            onChange={option => this.props.setXAxisScale(option.value)}
            getOptionValue={option => option.value}
            getOptionLabel={option => option.value}
            styles={selectSettings}
          />
        </label>
        {typeof scaleType !== "undefined" && scaleType === "time" && (
          <label>
            Масштаб времени
            <ReactSelect
              options={timeScales}
              className="select-type"
              defaultValue={this.state.editElement?.settings?.xScale?.precision}
              defaultInputValue={
                this.state.editElement?.settings?.xScale?.precision
              }
              onChange={option => this.props.setXAxisTimeScale(option.value)}
              getOptionValue={option => option.value}
              getOptionLabel={option => option.label}
              styles={selectSettings}
            />
          </label>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AxisBaseSettings);
