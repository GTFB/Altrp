import React, {Component} from "react";


export default class AdminSettings extends Component{
    render(){
        return <div className="admin-settings admin-page">
            <div className="admin-heading">
                <div className="admin-breadcrumbs"><a className="admin-breadcrumbs__link" href="#">Settings</a><span
                    className="admin-breadcrumbs__separator">/</span><span
                    className="admin-breadcrumbs__current">Builder</span></div>
            </div>
            <div className="admin-content">
                <ul className="nav nav-pills admin-pills">
                    <li className="nav-item">
                        <button className="nav-link active" data-area="1">GENERAL</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" data-area="2">STYLE</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" data-area="3">INTEGRATIONS</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" data-area="4">ADVANCED</button>
                    </li>
                </ul>
                <div className="admin-table">
                    <table>

                        <tbody className="admin-table-body">
                        <tr className="admin-settings-table-row">
                            <td className="admin-settings-table__td row-text">Post Types</td>
                            <td className="admin-settings-table__td ">
                                <input className="admin-table__td_check" type="checkbox"/>Pages<br/>
                                <input className="admin-table__td_check" type="checkbox"/>News
                            </td>
                        </tr>
                        <tr className="admin-settings-table-row">
                            <td className="admin-settings-table__td row-text">Disable Default Colors</td>
                            <td className="admin-settings-table__td ">
                                <input className="admin-table__td_check" type="checkbox"/>Checking this box will disable
                                Builder's Default Colors, and make Builder inherit the colors from your CSS file
                            </td>
                        </tr>
                        <tr className="admin-settings-table-row">
                            <td className="admin-settings-table__td row-text">Disable Default Fonts</td>
                            <td className="admin-settings-table__td ">
                                <input className="admin-table__td_check" type="checkbox"/>Checking this box will disable
                                Builder’s Default Fonts, and make Builder inherit the fonts from your CSS file
                            </td>
                        </tr>
                        <tr className="admin-settings-table-row">
                            <td className="admin-settings-table__td header-text">Improve builder</td>
                        </tr>
                        <tr className="admin-settings-table-row">
                            <td className="admin-settings-table__td row-text">Usage Data Sharing</td>
                            <td className="admin-settings-table__td ">
                                <input className="admin-table__td_check" type="checkbox"/>Become a super contributor by
                                opting in to share non-sensitive plugin data and to get our updates. Learn more
                            </td>
                        </tr>
                        <tr className="admin-settings-table-row">
                            <td className="admin-settings-table__td">
                                <button className="admin-settings-button" type="button">Save Changes</button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}
