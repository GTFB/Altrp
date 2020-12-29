import React, {Component} from "react";
import {Link} from "react-router-dom";
import Pagination from "../../Pagination";
import {withRouter} from 'react-router-dom';

import Resource from "../../../../../editor/src/js/classes/Resource";
class Notifications extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: this.props.match.params.id ?? '',
            data: [],
            currentPage: 1,
        };
        this.itemsPerPage = 5;
        this.notificationsAll = new Resource({route: `/admin/ajax/users/${this.state.user_id}/notifications`});
    }

    async componentDidMount(){
        let noticeSettingsData = await this.notificationsAll.getAll();
        this.setState(state => {
          return { ...state, data: noticeSettingsData };
        });  
    }    
        
    render(){
        const { currentPage, data, user_id} = this.state;
        return <div className="admin-users-notice">
            <Link className="btn" to={`/admin/users/user/${user_id}/notification/new`}>Add New</Link>
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
                        data.slice(currentPage * this.itemsPerPage - this.itemsPerPage, currentPage * this.itemsPerPage).map((item, index) =>                         
                            
                            <tr className="admin-table-row" key={item.id}>
                                <td className="admin-table__td admin-table__td_check ">
                                    <Link to={`/admin/users/user/${user_id}/notification/${item.id}`}> {item.notice_name} </Link>
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

