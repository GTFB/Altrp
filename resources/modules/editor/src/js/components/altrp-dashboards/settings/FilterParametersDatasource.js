import React, { Component } from "react";
import Form from "react-bootstrap/Form";

import { connect } from "react-redux";
import { getDataByPath } from "../../../../../../front-app/src/js/helpers";
import { editElement } from "../../../store/altrp-dashboard/actions";

const mapStateToProps = state => {
  return { editElement: state.editElement };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}

class FilterParametersDatasource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parameter: this.props.parameter,
      editElement: _.cloneDeep(props.editElement),
      options: [],
      currentSelected: ""
    };

    this.setOption = this.setOption.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.param, this.props.param)) {
      this.setState(state => ({
        ...state,
        param: _.cloneDeep(this.props.param)
      }));
    }

    if (!_.isEqual(prevState.editElement, this.props.editElement)) {
      this.setState(state => ({
        ...state,
        editElement: _.cloneDeep(this.props.editElement)
      }));
    }
  }

  componentDidMount() {
    const data = getDataByPath(this.state.parameter.path);
    const options = this.adaptOptions(data);
    const currentOption = _.find(
      this.state.editElement?.settings?.params,
      o => {
        if (
          typeof o[this.state.parameter.requestParam] !== "undefined" &&
          o[this.state.parameter.requestParam] != null
        ) {
          console.log(o[this.state.parameter.requestParam]);
          return o;
        }
        return "";
      }
    );
    let currentSelected = "";
    if (typeof currentOption !== "undefined") {
      let keyOption = _.keys(currentOption)[0];
      currentSelected = currentOption[keyOption] || "";
    }
    this.setState({ options: options, currentSelected: currentSelected });
  }

  adaptOptions(array) {
    const result =
      array?.map(item => ({
        label: _.get(item, this.state.parameter.label),
        value: _.get(item, this.state.parameter.value)
      })) || [];
    return result;
  }

  setOption(value) {
    this.props.setParam(
      this.state.parameter.requestParam,
      value,
      this.state.options,
      _.find(this.state.options, o => o.value == this.state.currentSelected)
        ?.label || ""
    );
    this.setState(s => {
      return { ...s, currentSelected: value };
    });
  }

  render() {
    return (
      <div className="col-12">
        <Form.Group className="mb-2">
          <Form.Label
            className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
          >
            {this.state.parameter.title}
          </Form.Label>
          <Form.Control
            className="select-type"
            name="type"
            defaultValue={this.state.currentSelected}
            value={this.state.currentSelected}
            onChange={e => this.setOption(e.target.value)}
            as="select"
          >
            <option value="">Выберите параметры для фильтрации</option>
            {this.state.options.length > 0 &&
              this.state.options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterParametersDatasource);
