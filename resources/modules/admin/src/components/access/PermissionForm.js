import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {InputGroup} from "@blueprintjs/core";

const permissionsResource = new Resource({ route: '/admin/ajax/permissions' });

class PermissionForm extends Component {
  state = {
    name: '',
    display_name: '',
    description: ''
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      const { name, display_name, description } = await permissionsResource.get(id);
      this.setState({ name, display_name, description });
    }
  }

  changeHandler = ({ target: { value, name } }) => {
    if(name === 'name'){
      value = value.replace(/\s/g, '_');
    }

    this.setState({ [name]: value });
  }

  deleteHandler = () => {
    const { id } = this.props.match.params;
    permissionsResource.delete(id)
      .then(() => this.props.history.push('/admin/access/permissions'));
  }

  submitHandler = e => {
    const { id } = this.props.match.params;
    e.preventDefault();
    (id ? permissionsResource.put(id, this.state) : permissionsResource.post(this.state))
      .then(() => this.props.history.push('/admin/access/permissions'));
  }

  render() {
    const { name, display_name, description } = this.state;
    const isEditing = Boolean(this.props.match.params.id);

    return <form className="admin-form-access__permissions" onSubmit={this.submitHandler}>
     <div className="form-group__inline-wrapper">
       <div className="form-group form-group_width47">
         <label htmlFor="name" className="label__RobotoFont">Name</label>
         {/*<input type="text" id="name" required name="name"*/}
         {/*       value={name}*/}
         {/*       onChange={this.changeHandler}*/}
         {/*       className="form-control"*/}
         {/*/>*/}

         <InputGroup type="text" id="name" required name="name"
                     value={name}
                     onChange={this.changeHandler}
                     className="form-control-blueprint"
         />
       </div>

       <div className="form-group form-group_width47">
         <label htmlFor="display_name" className="label__RobotoFont">Display Name</label>
         {/*<input type="text" id="display_name" name="display_name"*/}
         {/*       value={display_name}*/}
         {/*       onChange={this.changeHandler}*/}
         {/*       className="form-control"*/}
         {/*/>*/}

         <InputGroup type="text" id="display_name" name="display_name"
                     value={display_name}
                     onChange={this.changeHandler}
                     className="form-control-blueprint"
         />
       </div>
     </div>

      <div className="form-group">
        <label htmlFor="description" className="label__RobotoFont">Description</label>
        {/*<input type="text" id="description" required name="description"*/}
        {/*  value={description}*/}
        {/*  onChange={this.changeHandler}*/}
        {/*  className="form-control"*/}
        {/*/>*/}

        <InputGroup type="text" id="description" required name="description"
                    value={description}
                    onChange={this.changeHandler}
                    className="form-control-blueprint"
        />
      </div>

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
        <Link to="/admin/access/permissions"><button className="btn">Cancel</button></Link>
        {isEditing && <button className="btn btn_failure" type="button" onClick={this.deleteHandler}>
          Delete
        </button>}
      </div>
    </form >
  }
}

export default withRouter(PermissionForm);
