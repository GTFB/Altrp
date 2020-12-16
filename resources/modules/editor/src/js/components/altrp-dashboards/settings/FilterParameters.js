import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

import { connect } from "react-redux";
import { editElement } from "../../../store/altrp-dashboard/actions";

const mapStateToProps = state => {
  return { editElement: state.editElement };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data))
  };
}

class FilterParameters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: _.cloneDeep(props.param),
      options: [],
      editElement: _.cloneDeep(props.editElement),
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
    let currentOption = _.find(this.state.editElement?.settings?.params, o => {
      if (
        typeof o[this.state.param.value] !== "undefined" &&
        o[this.state.param.value] != null
      ) {
        console.log(o[this.state.param.value]);
        return o[this.state.param.value];
      }
      return "";
    });
    if (typeof currentOption !== "undefined") {
      let keyOption = _.keys(currentOption)[0];
      this.setState(s => ({
        ...s,
        currentSelected: currentOption[keyOption] || ""
      }));
    }
  }

  async componentWillMount() {
    await this.getOptions();
  }

  async getOptions() {
    try {
      let req = await axios(
        `/ajax/models/queries/${this.state.param.model}/${this.state.param.value}`
      );
      if (req.status === 200) {
        this.setState(s => ({ ...s, options: req.data.data }));
      }
    } catch (error) {
      console.log("NETWORK ERROR =>", error);
    }
  }

  setOption(value) {
    this.props.setParam(
      this.state.param.value,
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
            {this.state.param.label}
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterParameters);
