import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {InputGroup, MenuItem} from "@blueprintjs/core";
import {MultiSelect} from "@blueprintjs/select";

const rolesResource = new Resource({route: '/admin/ajax/roles'});
const permissionsResource = new Resource({route: '/admin/ajax/permissions_options'});

class RoleForm extends Component {
  state = {
    name: '',
    display_name: '',
    description: '',
    permissions: [],
  };

  async componentDidMount() {
    const {id} = this.props.match.params;
    if (id) {
      const [role, permissions_options] = await Promise.all([
        rolesResource.get(id),
        permissionsResource.getAll()
      ])

      const {name, display_name, description, permissions} = role;
      this.setState({name, display_name, description, permissions,permissions_options});
    }
  }

  changeHandler = ({target: {value, name}}) => {
    this.setState({[name]: value});
  };

  deleteHandler = () => {
    const {id} = this.props.match.params;
    rolesResource.delete(id)
      .then(() => this.props.history.push('/admin/access/roles'));
  };

  submitHandler = e => {
    e.preventDefault();
    const {id} = this.props.match.params;

    const value = {
      ...this.state
    }
    delete value.permissions_options;
    (id ? rolesResource.put(id, value) : rolesResource.post(value))
      .then(() => {
        //this.props.history.push('/admin/access/roles')
      });
  }

  onQueryChange = (query, value) => {
    return `${value.label?.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
  }

  handleTagRemove = (item, index) => {
    this.setState(state => ({
      ...state,
      permissions: [...state.permissions].filter((i, idx) => idx !== index)
    }));
  };
  isItemSelected = (item) => {
    return this.state.permissions.some(c => c === item.value);
  };

  tagRenderer = (item) => {
    return item.label;
  };

  handleItemSelect = (item) => {
    if (!this.isItemSelected(item)) {
      this.setState(state => ({
        ...state,
        permissions: [...state.permissions, item.value]
      }));
    }
  };

  render() {
    const {id} = this.props.match.params;
    const text = id ? 'Update' :  'add'
    const {
      name,
      display_name,
      description,
      permissions_options = []
    } = this.state;
    const isEditing = Boolean(this.props.match.params.id);

    return <form className="admin-form-access__roles" onSubmit={this.submitHandler}>
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
        {/*<input type="text" id="description"  name="description"*/}
        {/*  value={description}*/}
        {/*  onChange={this.changeHandler}*/}
        {/*  className="form-control"*/}
        {/*/>*/}

        <InputGroup type="text" id="description" name="description"
                    value={description}
                    onChange={this.changeHandler}
                    className="form-control-blueprint"
        />
      </div>
      <div
        className="form-group form-group__multiSelectBlueprint form-group__multiSelectBlueprint_full-width form-group__multiSelectBlueprint-pages form-group_width47">
        <label htmlFor="page-roles" className="font__edit">Permissions</label>

        <MultiSelect tagRenderer={this.tagRenderer}
                     id="permissions"
                     matchTargetWidth={true}
                     items={permissions_options}
                     itemPredicate={this.onQueryChange}
                     noResults={<MenuItem disabled={true} text="No results."/>}
                     fill={true}
                     placeholder="Select..."
                     selectedItems={permissions_options.filter(i => this.isItemSelected(i))}
                     onItemSelect={this.handleItemSelect}
                     itemRenderer={(item, {handleClick, modifiers, query}) => {
                       return (
                         <MenuItem
                           icon={this.isItemSelected(item) ? "tick" : "blank"}
                           text={item.label}
                           key={item.value}
                           onClick={handleClick}
                         />
                       )
                     }}
                     tagInputProps={{
                       onRemove: this.handleTagRemove,
                       large: false,
                     }}
                     popoverProps={{
                       usePortal: false
                     }}
        />
      </div>

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">{text}</button>
        <Link to="/admin/access/roles">
          <button className="btn">Cancel</button>
        </Link>
        {isEditing && <button className="btn btn_failure" type="button" onClick={this.deleteHandler}>
          Delete
        </button>}
      </div>
    </form>
  }
}

export default withRouter(RoleForm);
