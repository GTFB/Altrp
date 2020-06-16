import React, {Component} from "react";
import {Link} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Redirect, withRouter} from "react-router";
import TableForm from "../../../../admin/src/components/tables/TableForm";
/**
 * @class
 * @property {Resource} resource
 */

class EditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
			columns: [],
			
      //redirectAfterSave: false,
    };
		
		this.resource = new Resource({route: '/admin/ajax/tables'});
    /*
    this.saveTable = this.saveTable.bind(this);*/
  }
  async componentDidMount(){
	  let id = this.props.location.pathname.split('/');
		
    id = id[id.length - 1];
    id = parseInt(id);
		
		this.setState((state) => ({
			table_id: id
		}));
  }
  
  render() {
    if(this.state.redirectAfterSave){
      return<Redirect to="/admin/tables"/>
    }
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/tables">Tables</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">Edit Table</span>
        </div>
      </div>
      <div className="admin-content">
        <TableForm id={this.state.table_id} redirect={this.state.redirect_url}/>
      </div>
    </div>;
  }
}

export default withRouter(EditTable);