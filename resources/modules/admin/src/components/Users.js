import React, {Component} from "react";
import PluginSvg from "../svgs/plugins.svg";
import VectorSvg from '../svgs/vector.svg';
import UserSvg from '../svgs/user.svg';


export default class Users extends Component{
  render(){
    return <div className="admin-users">
        <div className="wrapper">
            <div className="admin-heading-users">
                <div className="admin-breadcrumbs">
                    <a className="admin-breadcrumbs__link" href="#">Users</a>
                    <span className="admin-breadcrumbs__separator">/</span>
                    <span className="admin-breadcrumbs__current">All Users</span>
                </div>
                <a href="#" className="btn">Add New</a>
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
                        <tr className="admin-table-row">
                            <td className="admin-table__td admin-table__td_check ">
                                <input className="input-users" type="checkbox"/>
                                <UserSvg className="users-svg"/>
                                <a>Adm1nCRMsyst</a>
                            </td>
                            <td className="admin-table__td ">Jora Beardman</td>
                            <td className="admin-table__td "><a>20010810@academ-x.ru</a></td>
                            <td className="admin-table__td "><a>Administrator</a></td>
                            <td className="admin-table__td ">2</td>
                            <td className="admin-table__td ">2020/02/17<br/> Last modified</td>
                            <td className="admin-table__td ">Enable</td>
                        </tr>
                        <tr className="admin-table-row">
                            <td className="admin-table__td admin-table__td_check">
                                <input className="input-users" type="checkbox"/>
                                <UserSvg className="users-svg"/>
                                <a>Max1mEdit0r</a>
                            </td>
                            <td className="admin-table__td ">Maxim Ivanov</td>
                            <td className="admin-table__td "><a>awpmi@academ-x.ru</a></td>
                            <td className="admin-table__td "><a>Editor</a></td>
                            <td className="admin-table__td ">3</td>
                            <td className="admin-table__td ">2020/02/01<br/> Last modified</td>
                            <td className="admin-table__td ">Enable</td>
                        </tr>
                        <tr className="admin-table-row">
                            <td className="admin-table__td admin-table__td_check">
                                <input className="input-users" type="checkbox"/>
                                <UserSvg className="users-svg"/>
                                <a>Dm1tr1yEdit0r</a>
                            </td>
                            <td className="admin-table__td ">Dmitriy Ancupov</td>
                            <td className="admin-table__td "><a>awpda@academ-x.ru</a></td>
                            <td className="admin-table__td "><a>Editor</a></td>
                            <td className="admin-table__td ">1</td>
                            <td className="admin-table__td ">2020/02/05<br/> Last modified</td>
                            <td className="admin-table__td ">Enable</td>
                        </tr>
                        <tr className="admin-table-row">
                            <td className="admin-table__td admin-table__td_check">
                                <input className="input-users" type="checkbox"/>
                                <UserSvg className="users-svg"/>
                                <a>Sof14Edit0r</a>
                            </td>
                            <td className="admin-table__td ">Sofia Anpilova</td>
                            <td className="admin-table__td "><a>awpsa@academ-x.ru</a></td>
                            <td className="admin-table__td "><a>Editor</a></td>
                            <td className="admin-table__td ">1</td>
                            <td className="admin-table__td ">2020/02/25<br/> Last modified</td>
                            <td className="admin-table__td ">Enable</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  }

}
