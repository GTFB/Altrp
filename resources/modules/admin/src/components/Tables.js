import React, {Component} from "react";
import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";
import {Link} from "react-router-dom";


/*
import store from "../js/store/store";
import {setModalSettings, toggleModal} from "../js/store/modal-settings/actions";
import {generateId, redirect} from "../js/helpers";*/

export default class Tables extends Component{

	constructor(props) {
            super(props);
            this.state = {
                editUrl: "/admin/tables",
              tag: 'Link',
                modules: [],
                columns: [
                    {
                        name: 'title',
                        title: 'Title',
                        url: true,
                      editUrl: true,
                      tag : 'Link',
                    },
                    {
                        name: 'name',
                        title: 'Name',
                        url: true,
                      editUrl: true,
                      tag : 'Link',
                    },
                    {
                        name: 'description',
                        title: 'Description',
                    },
                    {
                        name: 'setting',
                        title: 'Setting',
                        url: true,
                    },
                    {
                        name: 'updated_at',
                        title: 'Updated At',
                    },
		]
            };

            this.resource = new Resource({
                route: '/admin/ajax/tables'
            });

	}

	async componentDidMount(){
            this.resource.getAll().then(modules=>{
                this.setModules(modules);
            });
        }

	setModules(modules){
            let urlModules = modules.map((row) => {
                row.editUrl = "/admin/tables/edit/" + row.id;
                return row;
            });

            this.setState((state) => {
		return {modules: urlModules};
            });
        }

	render(){
            return <div className="admin-tables admin-page">
                <div className="admin-heading">
                    <div className="admin-breadcrumbs">
                        <a className="admin-breadcrumbs__link" href="#">Tables</a>
                        <span className="admin-breadcrumbs__separator">/</span>
                        <span className="admin-breadcrumbs__current">All Tables</span>
                    </div>
                    <Link className="btn" to="/admin/tables/add">Add New</Link>
                    <div className="admin-filters">
                        <span className="admin-filters__current">All ({this.state.modules.length || '0'})</span>
                    </div>
                </div>
                <div className="admin-content">
                    <AdminTable columns={this.state.columns} rows={this.state.modules}/>
                </div>
            </div>;
	}


}
