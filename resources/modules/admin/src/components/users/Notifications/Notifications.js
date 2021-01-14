import React, {Component} from "react";
import {Link} from "react-router-dom";
import AdminTable from "../../AdminTable";
import Pagination from "../../Pagination";
import {withRouter} from 'react-router-dom';
import './admin-notifications.scss';

import Resource from "../../../../../editor/src/js/classes/Resource";
class Notifications extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: this.props.match.params.id ?? '',
            notices: [],
            currentPage: 1,
            noticeSearch: '',
            sorting: {}
      
        };
        this.itemsPerPage = 3;
        this.notificationsAll = new Resource({route: `/admin/ajax/users/${this.state.user_id}/notifications`});
        this.changePage = this.changePage.bind(this);
        this.generateNoticeJSON = this.generateNoticeJSON.bind(this);
    }

    componentDidMount(){
        this.getNotices();
    }
        
    changePage(currentPage, pagination) {
        this.setState(state => ({ ...state, [pagination]: { ...state[pagination], currentPage } }));
    }
        
        
    getNotices = async () => {
        let noticeSettingsData = await this.notificationsAll.getAll();
        this.setState(state => {
            return { ...state, notices: noticeSettingsData };
        }); 
    };

    noticesSortingHandler = (order_by, order) => {
        this.setState({ sorting: { order_by, order } }, this.getNotices);
    }

    searchNotice = e => {
        e.preventDefault();
        this.getNotices();
    }

    getArrayForRows = (notices, currentPage, itemsPerPage) => {

        let arrayNew = notices.slice(currentPage * this.itemsPerPage - this.itemsPerPage, currentPage * this.itemsPerPage).map(item =>{
                            item.url = `/admin/users/user/${item.noticed_id}/notification/${item.id}`;            
                            return item;
                        });

        return arrayNew;
    }

     /** @function generateTemplateJSON
     * Генерируем контент файла template в формате JSON
     * @param {object} response Данные, получаемые с сервера
     * @return {string} Строка в формате JSON
     */
    generateNoticeJSON(response) {
        const data = objectDeepCleaning(JSON.parse(response.data));
        return JSON.stringify({
        area: this.state.activeresponseArea.name,
        data,
        title: response.title,
        name: response.notice_name,
        });
    }
    /** @function downloadJSONFile
     * Скачиваем файл
     * @param {object} response Данные, получаемые с сервера
     */
    downloadJSONFile(response) {
        // const element = document.createElement("a");
        // const file = new Blob([this.generateNoticeJSON(response)], { type: 'text/plain' });
        // element.href = URL.createObjectURL(file);
        // element.download = `${response.name}.json`;
        // document.body.appendChild(element); // Required for this to work in FireFox
        // element.click();
    }
    
    
        
    render(){
        const { currentPage, notices, user_id, noticeSearch, sorting} = this.state;
        return <div className="admin-users-notice">
            <div className="admin-breadcrumbs">
                <Link to={`/admin/users`}>Users</Link>
                <span className="admin-breadcrumbs__separator">/</span>
                <span className="admin-breadcrumbs__current">{user_id}</span>
                <span className="admin-breadcrumbs__separator">/</span>
                <span className="admin-breadcrumbs__current">Settings Notifications</span>
            </div>
            <Link className="btn" to={`/admin/users/user/${user_id}/notification/new`}>Add New</Link>
            <div className="admin-notifications-table">
                <form className="admin-panel py-2" onSubmit={this.searchNotice}>
                    <input className="input-sm mr-2" value={noticeSearch} onChange={e => this.setState({ noticeSearch: e.target.value })} />
                    <button className="btn btn_bare admin-users-button">Search</button>
                </form>
                <AdminTable
                    columns={[{
                        name: 'notice_name',
                        title: 'Notification Setting:',
                        url: true,
                    }]}
                    quickActions={[{ tag: 'a', props: {
                        href: `/admin/users/user/${user_id}/notification/:id`,
                        },
                        title: 'Edit'
                    }, {
                        tag: 'button',
                        route: '',
                        method: 'delete',
                        title: 'Disable'
                    }, {
                        tag: 'button',
                        route: `/admin/ajax/users/${user_id}/notifications/:id`,
                        method: 'get',
                        after: response => this.downloadJSONFile(response),
                        title: 'Export'
                    }, {
                        tag: 'button',
                        route: `/admin/ajax/users/${user_id}/notifications/:id`,
                        method: 'delete',
                        confirm: 'Are You Sure?',
                        after: () => this.getNotices(),
                        className: 'quick-action-menu__item_danger',
                        title: 'Trash'
                    }]}
                    rows={this.getArrayForRows(notices, currentPage, this.itemsPerPage)}
                    sortingHandler={this.noticesSortingHandler}
                    sortingField={sorting.order_by}
                />
                <Pagination pageCount={Math.ceil(notices.length / this.itemsPerPage) || 1}
                    currentPage={currentPage}
                    changePage={page => {
                        if (currentPage !== page) {
                        this.setState({ currentPage: page })
                        }
                    }
                    }
                    itemsCount={notices.length}
                />
            </div>
        </div>
    }
}

export default withRouter(Notifications);

