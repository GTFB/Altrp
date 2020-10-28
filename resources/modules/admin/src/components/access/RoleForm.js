import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";

const rolesResource = new Resource({ route: '/admin/ajax/roles' });

class RoleForm extends Component {
  state = {
    name: '',
    display_name: '',
    description: ''
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      const { name, display_name, description } = await rolesResource.get(id);
      this.setState({ name, display_name, description });
    }
  }

  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  deleteHandler = () => {
    const { id } = this.props.match.params;
    rolesResource.delete(id)
      .then(() => this.props.history.push('/admin/access/roles'));
  };

  submitHandler = e => {
    const { id } = this.props.match.params;
    e.preventDefault();
    (id ? rolesResource.put(id, this.state) : rolesResource.post(this.state))
      .then(() => this.props.history.push('/admin/access/roles'));
  }

  render() {
    const { name, display_name, description } = this.state;
    const isEditing = Boolean(this.props.match.params.id);

    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" required name="name"
          value={name}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="display_name">Display Name</label>
        <input type="text" id="display_name" name="display_name"
          value={display_name}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input type="text" id="description"  name="description"
          value={description}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
        <Link to="/admin/access/roles"><button className="btn">Cancel</button></Link>
        {isEditing && <button className="btn btn_failure" type="button" onClick={this.deleteHandler}>
          Delete
        </button>}
      </div>
    </form >
  }
}

export default withRouter(RoleForm);
