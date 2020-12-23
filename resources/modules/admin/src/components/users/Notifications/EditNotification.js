import React, {Component} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import ConditionsTab from "./ConditionsTab";
import DataTab from "./DataTab";
import SendToTab from "./SendToTab";
import {withRouter} from 'react-router-dom';
import AltrpSelect from "../../altrp-select/AltrpSelect";

import './admin-notifications.scss';

import Resource from "../../../../../editor/src/js/classes/Resource";


class EditNotification extends Component{
    constructor(props){
        super(props);        
        this.state = {
            user_id: this.props.match.params.id ?? '',
            notice_id: this.props.match.params.name ?? '',
            activeTab: parseInt(window.location.hash[1]) || 0,
            value: {},
            sourcesOptions: [],
        };
        this.resource = new Resource({route: `/admin/ajax/users/${this.state.user_id}/notifications/${this.state.notice_id}`});
        this.dataSources = new Resource({ route: "/admin/ajax/data_source_options" });
        this.switchTab = this.switchTab.bind(this);
        this.getSourceArray = this.getSourceArray.bind(this);
        this.onSave = this.onSave.bind(this);
        this.checkEdit = this.checkEdit.bind(this);
      
    }

    async componentDidMount(){
        const value = await this.resource.getAll();
        const dataSourcesAll = await this.dataSources.getAll();
        
        this.setState({ value: value[0] });
        this.setState({ sourcesOptions: dataSourcesAll.options ?? [] });

        this.getSourceArray();
    }
    
    // getNoticeData = async s => {
    //     let res = await this.resource.getQueried({ s });
    //     this.setState(state => {
    //       return { ...state, pages: res, pagesSearch: s };
    //     });
    //   };
    

    saveNoticeSetting(){        
    }

    // Обработка изменений дочерних компонентов
    checkEdit(){
    }

    // Создание массива дата-сурсов для селекта
    getSourceArray(){ 
        if(this.state.value.sources instanceof Array){
            let sources = this.state.value.sources.map(item => {
                return item.id;
              });
            this.setState(s => ({ ...s, value: {...s.value, sources: sources} }));
        }       
    }

    // Запись значения inputs в стейт (value)
    changeInput = (e, type='notice', conditionId=false, compareId=false, compareType=false) => {

        let name = e.target.value;
        console.log(name);

        // this.setState(state => {
        //     state = { ...state };
        //     console.log(state);
        // });          


        switch(type){
            case 'notice':
                this.setState(s => ({ ...s, value: {...s.value, notice_name: name} }));
                break;
            case 'condition':
                if (!conditionId) return;
                // console.log('вход');

                this.setState(state => {
                    state = { ...state };
                    state.value.notice_settings.conditions.map(item => {
                        if(item.id === conditionId) item.name = name;
                        // console.log(item);
                        return item;
                    });
                        // console.log(state);
                    return state
                });          
                // this.setState(s => ({ ...s, value: {...s.value, notice_settings: {...s.value.notice_settings, }} }));
                break;
            case 'compare':
                if (!conditionId || !compareId || !compareType) return;
                this.setState(s => ({ ...s, value: {...s.value, notice_name: name} }));
                break;
        }
    }

    // Запись выбранных селектов Data source в стейт (value)
    changeSourceHandler = sources => {
        this.setState({
            value: {
                ...this.state.value,
                sources: sources ? sources.map(sources => sources.value) : []
            }
        });
    }
    
    // Обработка переключения табов
    switchTab(activeTab){
        window.location.hash = activeTab + '';
        this.setState(s=>{return{ ...s, activeTab }})
    }

    onSave(e){
    }    

    render(){
        let { value, sourcesOptions} = this.state;
        let { sources, notice_settings} = this.state.value;
        // console.log(notice_settings);
        return <div className="wrapper">
            <div className="admin-notice-box-parent">
                    <button className="btn btn_save" onClick={() => this.saveNoticeSetting()}>
                        Save and Add New
                    </button>

                    <div className="form-group">
                        <label htmlFor="page-name">Name</label>
                        <input type="text" id="name" name="name" value={value?.notice_name ?? ''} onChange={(e) => { this.changeInput(e) }} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="source">Data source</label>
                        <AltrpSelect id="source"
                            isMulti={true}
                            value={_.filter(sourcesOptions, s => sources.indexOf(s.value) >= 0)}
                            onChange={this.changeSourceHandler}
                            options={sourcesOptions} />
                    </div>
            </div>
            <Tabs selectedIndex={this.state.activeTab} onSelect={this.switchTab} >
                <TabList className="nav nav-pills admin-pills">
                    <Tab> Conditions </Tab>
                    <Tab> Data </Tab>
                    <Tab> Send to </Tab>
                </TabList>
                <TabPanel>
                    <ConditionsTab conditions={notice_settings?.conditions} onSaveCondition={this.onSave} changeInputCondition={this.changeInput}/>
                </TabPanel>
                <TabPanel>
                    <DataTab/>
                </TabPanel>
                <TabPanel>
                    <SendToTab/>
                </TabPanel>
            </Tabs>

        </div>
    }
}

export default withRouter(EditNotification);
