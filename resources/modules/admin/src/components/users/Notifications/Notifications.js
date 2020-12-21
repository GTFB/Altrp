import React, {Component} from "react";
import {Link} from "react-router-dom";
import Pagination from "../../Pagination";
import {withRouter} from 'react-router-dom';

import Resource from "../../../../../editor/src/js/classes/Resource";
class Notifications extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: this.props.match.params.id ?? 1,
            dataTest: [{
                name: 'New Settings',
                dataSource: [
                    123,
                    321,
                ],
                noticed_id: 123,
                conditions:[
                    {
                        name: 'condition 1',
                        type: 'any',
                        enabled: true,
                        compares:[
                        {
                            enabled: true,
                            field_name: 'title',
                            operator: '<>',
                            value: 'TEST!'
                        }
                        ]
                    }
                ]
                },
                { name: 'New Settings 1', },
                { name: 'New Settings 2', },
                { name: 'New Settings 3', },
                { name: 'New Settings 4', },
                { name: 'New Settings 5', },
                { name: 'New Settings 6', },
                { name: 'New Settings 7', },
                { name: 'New Settings 8', },
                { name: 'New Settings 9', },
                { name: 'New Settings 10', },
                { name: 'New Settings 11', },
                { name: 'New Settings 12', },
                { name: 'New Settings 13', },
                { name: 'New Settings 14', },
                { name: 'New Settings 15', },
                { name: 'New Settings 16', },
            ],
            data: [],
            currentPage: 1,
        };
        this.resource = new Resource({route: '/admin/ajax/users/{user}/notifications'});
        this.itemsPerPage = 5;
    }

    async componentDidMount(){
      this.getNotificationSettings();
    }
    
    getNotificationSettings = async() => {
    //   let noticeSettingsData = await this.resource.getQueried({ s: this.state.search });
      let noticeSettingsData = this.state.dataTest;

      this.setState(state => {
        return { ...state, data: noticeSettingsData };
      });
    }
        
    render(){
        const { currentPage, data, user_id} = this.state;
        return <div className="admin-users-notice">
            <Link className="btn" to={`/admin/users/user/${user_id}/notification/new/`}>Add New</Link>
            <div className="admin-notifications-table">
                <table className="table">
                    <thead className="admin-notifications-table-head">
                        <tr className="admin-table-row">
                            <td className="admin-table__td admin-table__td_check">
                                Notification Setting:
                            </td>
                        </tr>
                    </thead>
                    <tbody className="admin-table-body">
                    {                    
                        data.slice(currentPage * this.itemsPerPage - this.itemsPerPage, currentPage * this.itemsPerPage).map((row, idx) =>                         
                            
                            <tr className="admin-table-row" key={row.name}>
                                <td className="admin-table__td admin-table__td_check ">
                                    <Link to={`/admin/users/user/${user_id}/notification/${row.name}`}> {row.name} </Link>
                                </td>
                            </tr>
                        
                        )                        
                    }   
                    </tbody>
                </table>
                <Pagination pageCount={Math.ceil(data.length / this.itemsPerPage) || 1}
                  currentPage={currentPage}
                  changePage={page => {
                    if (currentPage !== page) {
                      this.setState({ currentPage: page })
                    }
                  }
                  }
                  itemsCount={data.length}
                />
            </div>
        </div>
    }
}

export default withRouter(Notifications);

