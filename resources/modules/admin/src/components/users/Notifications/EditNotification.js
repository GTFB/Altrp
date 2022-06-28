import React, {Component} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import { Link, withRouter } from "react-router-dom";
import { titleToName }from "../../../js/helpers";
import ConditionsTab from "./ConditionsTab";
import DataTab from "./DataTab";
import SendToTab from "./SendToTab";
import AltrpSelect from "../../altrp-select/AltrpSelect";
import Resource from "../../../../../editor/src/js/classes/Resource";
import './admin-notifications.scss';

class EditNotification extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: this.props.match.params.id ?? '',
            notice_id: this.props.match.params.name ?? '',
            activeTab: parseInt(window.location.hash[1]) || 0,
            value: '',
            sourcesOptions: [],
        };
        this.resource = new Resource({route: `/admin/ajax/users/${this.state.user_id}/notifications/${this.state.notice_id}`});
        this.resourceEdit = new Resource({route: `/admin/ajax/users/${this.state.user_id}/notifications`});
        this.dataSources = new Resource({ route: "/admin/ajax/data_source_options" });

        this.switchTab = this.switchTab.bind(this);
        this.getSourceArray = this.getSourceArray.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onAction = this.onAction.bind(this);
        this.serverUpdate = this.serverUpdate.bind(this);
        this.getNewValue = this.getNewValue.bind(this);
    }

    async componentDidMount(){
        const value = await this.resource.getAll();
        const dataSourcesAll = await this.dataSources.getAll();

        // Проверка на наличие полученной настройки с сервера
        if (value.length === 0) this.getNewValue();
        else this.setState({ value: value[0] });

        this.setState({ sourcesOptions: dataSourcesAll?.options ?? [] });

        this.getSourceArray();
    }

    // Обработка переключения табов
    switchTab(activeTab){
        window.location.hash = activeTab + '';
        this.setState(s=>{return{ ...s, activeTab }})
    }

    // Создание массива дата-сурсов для селекта
    getSourceArray(){
        if(this.state.value?.sources instanceof Array){
            let sources = this.state.value.sources.map(item => {
                return item.id;
              });
            this.setState(s => ({ ...s, value: {...s.value, sources: sources} }));
        }
    }

    // Сохранение и редирект для создания новой настройки
    saveNoticeSetting(){
        const {user_id} = this.state;
        this.serverUpdate();

        this.props.history.push(`/admin/users/user/${user_id}/notification/new`);
        this.getNewValue();
    }

    // Создание и запись новой настройки в value
    getNewValue(){
        const newValue = {
            "name": "New Notice Settings",
            "enabled": true,
            "sources": [],
            "notice_settings": {
                "notice_name": "new_notice_settings",
                "conditions": [
                    {
                        "id": 1,
                        "name": "new condition",
                        "enabled": false,
                        "type": "all",
                        "compares": [
                            {
                                "id": 1,
                                "name": "title",
                                "enabled": false,
                                "operator": "==",
                                "value": "value1"
                            }
                        ]
                    }
                ],
                "data": [{
                    "field": "message",
                    "value": "{{altrpdata.text}} added or updated or deleted",
                    "type": "content"
                }],
                "send": {
                    "front": {
                        "enabled": true
                    },

                    "email": {
                        "enabled": false,
                        "template": "template"
                    },
                    "telegram": {
                        "enabled": false
                    }
                }
            }
        };
        this.setState(s => ({ ...s, value: newValue, notice_id: "new" }));
    }

    // Отправка изменений на сервер
    serverUpdate(){
        const {notice_id, value} = this.state;

        // Проверка роута (текущая настройка или новая)
        if (notice_id === "new") this.resourceEdit.post(value);
        else this.resourceEdit.put(notice_id, value);
    }

    // Сохранение и создание condition или compare
    onSave(type, conditionId = false){
        const {notice_id} = this.state;

        switch(type){
            case 'condition':
                this.setState(state => {
                    state = { ...state };
                    if(state.value?.notice_settings?.conditions instanceof Array){
                        const conArray = state.value.notice_settings.conditions;
                        conArray.push({
                            id: conArray.length + 1,
                            name: 'Default New Condition',
                            type: 'all',
                            enabled: false,
                            compares: [],
                        });
                        state.value.notice_settings.conditions = conArray;
                    }
                    return state
                });
                break;
            case 'compare':
                if (!conditionId) return;
                this.setState(state => {
                    state = { ...state };
                    if(state.value?.notice_settings?.conditions instanceof Array){
                        state.value.notice_settings.conditions.map(item => {
                            if(item?.id === conditionId){
                                if(item?.compares instanceof Array){
                                    const comArray = item.compares;
                                    comArray.push({
                                        id: comArray.length + 1,
                                        name: 'Default New Compare',
                                        operator: '==',
                                        enabled: false,
                                        value: 'Default value',
                                    });
                                    item.compares = comArray;
                                }
                            }
                            return item;
                        });
                    }
                    return state
                });
                break;
            case 'save':

                this.serverUpdate();
                return;
        }
        if(notice_id !== "new") this.serverUpdate();
    }

    // Обработка disable и delete у condition и compare
    onAction = (e, type, component = false, conditionId = false) => {

        switch(component){
            case 'condition':
                this.setState(state => {
                    state = { ...state };
                    if(state.value?.notice_settings?.conditions instanceof Array){
                        if(type === 'disable'){
                            state.value.notice_settings.conditions.map(item => {
                                if(item.id === e.id) item.enabled = !item.enabled;
                                return item;
                            });
                        }
                        if(type === 'delete'){
                            if (confirm("Are you sure?")) {
                                let arForDelete = state.value.notice_settings.conditions;
                                arForDelete = _.filter(arForDelete, item => e.id !== item.id);
                                state.value.notice_settings.conditions = arForDelete;
                            }
                        }
                    }
                    return state
                });
                break;
            case 'compare':
                if (!conditionId) return;
                this.setState(state => {
                    state = { ...state };
                    if(state.value?.notice_settings?.conditions instanceof Array){
                        state.value.notice_settings.conditions.map(item => {
                            if(item?.id === conditionId){
                                if(item?.compares instanceof Array){
                                    if(type === 'disable'){
                                        item.compares.map(compare =>{
                                            if(compare?.id === e.id) compare.enabled = !compare.enabled;
                                            return compare;
                                        });
                                    }
                                    if(type === 'delete'){
                                        if (confirm("Are you sure?")) {
                                            let arForDelete = item.compares;
                                            arForDelete = _.filter(arForDelete, item => e.id !== item.id);
                                            item.compares = arForDelete;
                                        }
                                    }
                                }
                            }
                            return item;
                        });
                    }
                    return state
                });
                break;
        }
    }

    changeBox = (e, key) => {
        e.persist();
        this.setState(state => {
            state.value.notice_settings.send[key].enabled = e.target.checked;
            return state
        });
    }

    // Запись значения inputs в стейт (value)
    changeInput = (e, type='parent', conditionId=false, compareId=false, compareType=false) => {

        let name = e.target.value;

        switch(type){
            case 'field':
                this.setState(state => {
                    state.value.notice_settings.data[0].field = name;
                    return state
                });

                // this.setState(s => ({ ...s, value: {...s.value, name: name, notice_settings: {...s.value.notice_settings, data: {...s.value.notice_settings.data, field: name }}} }));
                break;
            case 'value':
                this.setState(state => {
                    state.value.notice_settings.data[0].value = name;
                    return state
                });

                // this.setState(s => ({ ...s, value: {...s.value, name: name, notice_settings: {...s.value.notice_settings, data: {...s.value.notice_settings.data, value: name }}} }));
                break;
            case 'parent':
                this.setState(s => ({ ...s, value: {...s.value, name: name, notice_settings: {...s.value.notice_settings, notice_name: titleToName(name)}} }));
                break;
            case 'notice':
                this.setState(s => ({ ...s, value: {...s.value, notice_settings: {...s.value.notice_settings, notice_name: titleToName(name)}} }));
                break;
            case 'condition':
                if (!conditionId) return;
                this.setState(state => {
                    state = { ...state };
                    if(state.value?.notice_settings?.conditions instanceof Array){
                        state.value.notice_settings.conditions.map(item => {
                            if(item.id === conditionId) item.name = name;
                            return item;
                        });
                    }
                    return state
                });
                break;
            case 'compare':
                if (!conditionId || !compareId || !compareType) return;
                this.setState(state => {
                    state = { ...state };
                    if(state.value?.notice_settings?.conditions instanceof Array){
                        state.value.notice_settings.conditions.map(item => {
                            if(item?.id === conditionId){
                                if(item?.compares instanceof Array){
                                    item.compares.map(compare =>{
                                        if(compare?.id === compareId) compare[compareType] = name;
                                        return compare;
                                    });
                                }
                            }
                            return item;
                        });
                    }
                    return state
                });
                break;
        }
    }

    // Запись выбранных селектов Data source в стейт (value)
    changeSelect = (e, i, type = 'parent', conditionId=false, compareId=false) => {

        switch(type){
            case 'parent':
                this.setState({
                    value: {
                        ...this.state.value,
                        sources: e ? e.map(item => item.value) : []
                    }
                });
                break;
            case 'condition':
                if (!conditionId) return;
                this.setState(state => {
                    state = { ...state };
                    if(state.value?.notice_settings?.conditions instanceof Array){
                        state.value.notice_settings.conditions.map(item => {
                            if(item.id === conditionId) item.type = e.label;
                            return item;
                        });
                    }
                    return state
                });
                break;
            case 'compare':
                if (!conditionId || !compareId) return;
                this.setState(state => {
                    state = { ...state };
                    if(state.value?.notice_settings?.conditions instanceof Array){
                        state.value.notice_settings.conditions.map(item => {
                            if(item?.id === conditionId){
                                if(item?.compares instanceof Array){
                                    item.compares.map(compare =>{
                                        if(compare?.id === compareId) compare.operator = e.value;
                                        return compare;
                                    });
                                }
                            }
                            return item;
                        });
                    }
                    return state
                });
                break;
        }
    }

    render(){
        let { value, sourcesOptions, user_id } = this.state;
        let { sources, notice_settings } = this.state.value;

        return <div className="wrapper">
            <div className="admin-notice--heading">
                <div className="admin-breadcrumbs">
                    <Link to={`/admin/users`}>Users</Link>
                    <span className="admin-breadcrumbs__separator">/</span>
                    <Link to={`/admin/users/user/${user_id}`}>{user_id}</Link>
                    <span className="admin-breadcrumbs__separator">/</span>
                    <Link to={`/admin/users/user/${user_id}#1`}>Settings</Link>
                    <span className="admin-breadcrumbs__separator">/</span>
                    <span className="admin-breadcrumbs__current">{value?.notice_name ?? ''}</span>
                </div>
            </div>
            <div className="admin-notice-box-parent">
                <button className="btn btn_save" onClick={() => this.saveNoticeSetting()}>
                    Save and Add New
                </button>
                <div className="admin-notice-general">
                    <div className="form-group">
                        <label htmlFor="page-name">Name</label>
                        <input type="text" id="name" name="name" value={value?.name ?? ''} onChange={(e) => { this.changeInput(e) }} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="page-name">Notice Name</label>
                        <input type="text" id="name" name="name" value={notice_settings?.notice_name ?? ''} onChange={(e) => { this.changeInput(e, 'notice') }} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="source">Data source</label>
                        <AltrpSelect id="source"
                            isMulti={true}
                            value={_.filter(sourcesOptions, s => sources.indexOf(s.value) >= 0)}
                            onChange={this.changeSelect}
                            options={sourcesOptions} />
                    </div>
                </div>
            </div>
            <Tabs selectedIndex={this.state.activeTab} onSelect={this.switchTab} >
                <TabList className="nav nav-pills admin-pills">
                    <Tab> Conditions </Tab>
                    <Tab> Data </Tab>
                    <Tab> Send to </Tab>
                </TabList>
                <TabPanel>
                    <ConditionsTab
                        conditions={notice_settings?.conditions ?? []}
                        onSaveCondition={this.onSave}
                        onActionCondition={this.onAction}
                        changeInputCondition={this.changeInput}
                        changeSelectCondition={this.changeSelect}
                    />
                </TabPanel>
                <TabPanel>
                    <DataTab
                        data={notice_settings?.data ?? []}
                        onSaveData={this.onSave}
                        changeInputData={this.changeInput}
                    />
                </TabPanel>
                <TabPanel>
                    <SendToTab
                        send={notice_settings?.send ?? []}
                        onSaveSend={this.onSave}
                        changeBox={this.changeBox}
                    />
                </TabPanel>
            </Tabs>
        </div>
    }
}

export default withRouter(EditNotification);
