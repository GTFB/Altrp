import React, {Component} from "react";
import {Link} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Redirect, withRouter} from "react-router";
//import TableForm from "../../../../admin/src/components/tables/TableForm";
/**
 * @class
 * @property {Resource} resource
 */

class TableForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
			errors: [],
      redirectAfterSave: false,
    };
    this.resource = new Resource({route: '/admin/ajax/tables'});
    this.saveTable = this.saveTable.bind(this);
  }
  async componentDidMount(){
	  let id = this.props.id;
		
    if(id){
      let pageData = await this.resource.get(id);
      this.setState(state=>{
        return{...state, value:pageData, id}
      });
    }
  }
  async saveTable(e){
    e.preventDefault();
    let res;
		
    if(this.state.id){
      res = await this.resource.put(this.state.id, this.state.value);
    } else {
      res = await this.resource.post(this.state.value);
    }
		
    if(res.success){
      this.setState(state=>{
        return {...state, redirectAfterSave: true}
      });
    } else {
      this.setState(state=>{
        return {...state, value: {}}
      });
    }
  }
  changeValue(value, field){
    this.setState(state=>{
      state = {...state};
      state.value[field] = value;
      return state
    })
  }
  render() {
    if(this.state.redirectAfterSave){
      return <Redirect to={this.props.redirect_url}/>
    }
    return <form className="admin-form" onSubmit={this.saveTable}>
			<div className="form-group">
				<label htmlFor="page-name">Name</label>
				<input type="text" id="page-name" required={1}
							 value={this.state.value.name || ''}
							 onChange={e => {this.changeValue(e.target.value, 'name')}}
							 className="form-control"/>
			</div>
			<div className="form-group">
				<label htmlFor="page-title">Title</label>
				<input type="text" id="page-title" required={1}
							 value={this.state.value.title || ''}
							 onChange={e => {this.changeValue(e.target.value, 'title')}}
							 className="form-control"/>
			</div>
			<div className="form-group">
				<label htmlFor="page-description">Description</label>
				<input type="text" id="page-description" required={1}
							 value={this.state.value.description || ''}
							 onChange={e => {this.changeValue(e.target.value, 'description')}}
							 className="form-control"/>
			</div>
			<button className="btn btn_success">{this.state.id ? 'Save' : 'Add'}</button>
		</form>;
  }
}

export default TableForm;