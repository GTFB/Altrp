import React, { Component, Suspense } from "react";
import Form from 'react-bootstrap/Form';
import axios from "axios";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
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
      param: props.param,
      options: [],
      editElement: props.editElement,
      currentSelected: '',
    };

    this.setOption = this.setOption.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.param, this.props.param)) {
      this.setState(state => ({ ...state, param: this.props.param }));
    }

    if (!_.isEqual(prevState.editElement, this.props.editElement)) {
      this.setState(state => ({ ...state, editElement: this.props.editElement }));
    }
  }

  async componentWillMount() {
    await this.getOptions();
    let currentOption = _.find(this.state.editElement.settings.params, (o) => {
      if (typeof o[this.state.param.value] !== 'undefined' && o[this.state.param.value] != null) {
        console.log(o[this.state.param.value]);
        return o[this.state.param.value];
      }
      return '';
    });
    if (typeof currentOption !== 'undefined') {
      let keyOption = _.keys(currentOption)[0]
      this.setState(s => ({ ...s, currentSelected: currentOption[keyOption] || '' }));
    }
  }

  async getOptions() {
    // console.log(this.state.param);
    try {
      let req = await axios(`/ajax/models/queries/${this.state.param.model}/${this.state.param.value}`);
      if (req.status === 200) {
        this.setState(s => ({ ...s, options: req.data.data }));
      }
    } catch (error) {
      console.log('NETWORK ERROR =>', error);
    }
  }  //   const req = await axios(`/ajax/models/queries/${param.model}/${param.value}`);

  setOption(value) {
    this.props.setParam(this.state.param.value, value);
    this.setState(s => ({ ...s, currentSelected: value }));
  }

  render() {
    return (
      <div className="col-12">
        <Form.Group className="mb-2">
          <Form.Label className="label" style={{ fontSize: '13px' }}>{this.state.param.label}</Form.Label>
          <Form.Control
            className="select-type"
            name="type"
            value={this.state.currentSelected}
            onChange={e => this.setOption(e.target.value)}
            as="select">
            <option value="">Выберите параметры для фильтрации</option>
            {this.state.options.length > 0 && this.state.options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterParameters);