import React, { Component } from "react";
import Resource from "../../../../../editor/src/js/classes/Resource";
import { withRouter } from 'react-router-dom';

class RuleForm extends Component {
  state = {
    rule: ''
  };

  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    const { validation_field_id } = this.props
    await new Resource({ route: `/admin/ajax/models/${this.props.match.params.id}/validations/${validation_field_id}/validation_rules` })
      .post({ ...this.state, validation_field_id });
    this.props.submitHandler();
  };

  render() {
    const { rule } = this.state;
    const { fieldsOptions, data_source_options } = this.props;

    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="rule">Rule</label>
        <input type="text" id="rule" required
          name="rule"
          value={rule}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Submit</button>
      </div>
    </form>;
  }
}

export default withRouter(RuleForm);