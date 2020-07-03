import React, {Component} from "react";
import PluginSvg from "../../svgs/plugins.svg";
import VectorSvg from '../../svgs/vector.svg';
import UserSvg from '../../svgs/user.svg';
import {Link} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";

export default class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            role_filter: "all",
            search: "",
        };
        
        this.resource = new Resource({route: '/admin/ajax/users'});
        
        /*
        
        
        this.migration_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/migrations'});
        
        this.changeName = this.changeName.bind(this);
        this.saveMigration = this.saveMigration.bind(this);
        
        
        this.addColumn = this.addColumn.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.getModalClasses = this.getModalClasses.bind(this);
        
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.addModalShow = this.addModalShow.bind(this);
        this.onChange = this.onChange.bind(this);
        */
    }
    
    async componentDidMount(){
        let users_result = await this.resource.getAll()
        this.setState(state=>{
            return{...state, data: users_result};
        }, () => {
            console.log(this.state);
        });
    }
    
        
  render(){
    return <div className="admin-users">
        <div className="wrapper">
            <div className="admin-heading-users">
                <div className="admin-breadcrumbs">
                    <a className="admin-breadcrumbs__link" href="#">Users</a>
                    <span className="admin-breadcrumbs__separator">/</span>
                    <span className="admin-breadcrumbs__current">All Users</span>
                </div>
                <Link className="btn" to={"/admin/users/new/"}>Add New</Link>
                <div className="admin-filters">
                    <span className="admin-filters__current">All (4)</span>
                    <span className="admin-filters__separator">|</span>
                    <a className="admin-filters__link" href="#">Administrator (1)</a>
                    <span className="admin-filters__separator">|</span>
                    <a className="admin-filters__link" href="#">Editor (3)</a>
                </div>
            </div>
                <div className="admin-panel">
                    <form className="admin-users-form form-bulk-left">
                        <select className="form-control input-sm">
                            <option value="1">Bulk Actions</option>
                        </select>
                        <button className="btn btn_bare admin-users-button">Apply</button>
                    </form>
                    <form className="admin-users-form form-bulk-right" >
                        <select className="form-control input">
                            <option value="1">Change role on...</option>

                        </select>
                        <button className="btn btn_bare admin-users-button">Change</button>
                    </form>
                    <form className="admin-users-form form-bulk-search" >
                        <input type="search" className="form-control input-sm" placeholder="" aria-controls="example1"/>
                        <button type="search" className="btn btn_bare admin-users-button">Search Users</button>
                    </form>
                </div>
            <div className="admin-users-table">
                <table className="table">
                    <thead className="admin-users-table-head">
                        <tr className="admin-table-row">
                            <td className="admin-table__td admin-table__td_check">
                                <input className="input-users" type="checkbox"/>
                                Username
                                <VectorSvg className="vector-svg"/>
                            </td>
                            <td className="admin-table__td ">Name</td>
                            <td className="admin-table__td ">Email</td>
                            <td className="admin-table__td ">Role<VectorSvg className="vector-svg role-svg"/></td>
                            <td className="admin-table__td ">Post</td>
                            <td className="admin-table__td ">Last Enter</td>
                            <td className="admin-table__td ">Status</td>
                        </tr>
                    </thead>
                    <tbody className="admin-table-body">
                    {
                    
                        this.state.data.map((row, idx) => 
                            
                            <tr className="admin-table-row" key={row.id}>
                                <td className="admin-table__td admin-table__td_check ">
                                    <input className="input-users" type="checkbox"/>
                                    <UserSvg className="users-svg"/>
                                    <Link to={"/admin/users/user/"+row.id}>{row.name}</Link>
                                </td>
                                <td className="admin-table__td ">{row.full_name}</td>
                                <td className="admin-table__td "><a>{row.email}</a></td>
                                <td className="admin-table__td "><a>{row.roles.map((value) => {return value.name}).join(", ")}</a></td>
                                <td className="admin-table__td ">2</td>
                                <td className="admin-table__td ">{row.last_login_at}</td>
                                <td className="admin-table__td ">Enable</td>
                            </tr>
                        
                        )
                        
                    }   
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  }

}
