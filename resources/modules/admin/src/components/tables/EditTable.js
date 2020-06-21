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
            redirect_url: "/admin/tables",
            table_id: this.props.match.params.id,
            setting_url: "/admin/tables/edit/"+this.props.match.params.id+"/setting"
        };
        this.resource = new Resource({route: '/admin/ajax/tables'});
    }
    render() {
        if(this.state.redirectAfterSave){
            return <Redirect to="/admin/tables"/>
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
                <TableForm id={this.state.table_id} redirect_url={this.state.redirect_url}/>
                <div>
                    <Link to={ this.state.setting_url }>Settings</Link>
                </div>
            </div>
            
        </div>;
    }
}

export default withRouter(EditTable);