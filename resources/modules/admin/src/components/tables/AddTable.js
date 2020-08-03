import React, {Component} from "react";
import {Link} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Redirect, withRouter} from 'react-router-dom';
import TableForm from "../../../../admin/src/components/tables/TableForm";
/**
 * @class
 * @property {Resource} resource
 */

class AddTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect_url: "/admin/tables",
        };
    }
    async componentDidMount(){
        let id = this.props.match.params.id;
        
        this.setState((state) => ({
            table_id: id
        }));
    }
	
    render() {
        return <div className="admin-pages admin-page">
            <div className="admin-heading">
                <div className="admin-breadcrumbs">
                    <Link className="admin-breadcrumbs__link" to="/admin/tables">Tables</Link>
                    <span className="admin-breadcrumbs__separator">/</span>
                    <span className="admin-breadcrumbs__current">Add New Table</span>
                </div>
            </div>
            <div className="admin-content">
                <TableForm id={this.state.table_id} redirect_url={this.state.redirect_url}/>
            </div>
        </div>;
    }
}

export default withRouter(AddTable);