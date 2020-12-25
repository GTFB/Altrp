import React, {Component} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import { Link } from "react-router-dom";
import ConditionsTab from "./ConditionsTab";
import DataTab from "./DataTab";
import SendToTab from "./SendToTab";
import {withRouter} from 'react-router-dom';
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
            newActive: {},
            value: {},
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
    }

    async componentDidMount(){
        const value = await this.resource.getAll();
        const dataSourcesAll = await this.dataSources.getAll();
        
        this.setState({ value: value[0] });
        this.setState({ sourcesOptions: dataSourcesAll.options ?? [] });

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

    // Сохранение и создание новой настройки уведомлений
    saveNoticeSetting(){
        const newValue = {};        
    }

    // Отправка изменений на сервер
    serverUpdate(){
        const {notice_id, value} = this.state;
        this.resourceEdit.put(notice_id, value);       
    }

    // Сохранение и создание condition или compare
    onSave(type, conditionId = false){
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
                console.log('SAVE');
                break;
        }
        this.serverUpdate();
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

    // Запись значения inputs в стейт (value)
    changeInput = (e, type='parent', conditionId=false, compareId=false, compareType=false) => {

        let name = e.target.value;

        switch(type){
            case 'parent':
                this.setState(s => ({ ...s, value: {...s.value, notice_name: name} }));
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
                    <Link to={`/admin/users/user/${user_id}#1`}>Notification Setting</Link>
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
                        <input type="text" id="name" name="name" value={value?.notice_name ?? ''} onChange={(e) => { this.changeInput(e) }} className="form-control" />
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
                        newActive={notice_settings?.conditions ?? {}}
                        conditions={notice_settings?.conditions ?? []}
                        onSaveCondition={this.onSave}
                        onActionCondition={this.onAction}
                        changeInputCondition={this.changeInput}
                        changeSelectCondition={this.changeSelect}
                    />
                </TabPanel>
                <TabPanel>
                    <DataTab data={notice_settings?.data ?? []}/>
                </TabPanel>
                <TabPanel>
                    <SendToTab send={notice_settings?.send ?? []} />
                </TabPanel>
            </Tabs>

        </div>
    }
}

export default withRouter(EditNotification);
