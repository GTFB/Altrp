import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Resource from "../../../../editor/src/js/classes/Resource";

class ModelItemForm extends Component {
  state = {
    ...this.props.item
  };

  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  componentDidMount() {

  }

  submitHandler = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const data = _.pick(this.state, this.props.fields);

    if (this.props.item) {
      new Resource({ route: `/admin/ajax/custom_models/${id}/edit` })
        .put(this.state.id, data)
        .then(() => this.props.submitHandler());
    } else {
      new Resource({ route: `/admin/ajax/custom_models/${id}` })
        .post(data)
        .then(() => this.props.submitHandler());
    }
  };

  render() {
    const { fields } = this.props;

    return <form className="admin-form" onSubmit={this.submitHandler}>
      {fields.map(field => <div className="form-group" key={field}>
        <label htmlFor={field}>{field}</label>
        <input type="text" id={field}
          name={field}
          value={this.state[field]}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>)}

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
      </div>
    </form>
  }
}

export default withRouter(ModelItemForm);