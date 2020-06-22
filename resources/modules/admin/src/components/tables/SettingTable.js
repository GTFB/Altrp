import React, {Component} from "react";
import {Redirect, withRouter} from "react-router";

import Resource from "../../../../editor/src/js/classes/Resource";
import MigrationsTable from "./MigrationsTable";
import {Link} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

import AddModelPage from "./AddModelPage";

/*
import store from "../../js/store/store";
import {setModalSettings, toggleModal} from "../../js/store/modal-settings/actions";
import update from 'immutability-helper';*/



//import AdminTable from "../AdminTable";
/*
import store from "../js/store/store";
import {setModalSettings, toggleModal} from "../js/store/modal-settings/actions";
import {generateId, redirect} from "../js/helpers";*/


class SettingTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            table_id: this.props.match.params.id,
            table: {},
        }  
        
        this.resource = new Resource({route: '/admin/ajax/tables'});
        /*this.migration_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/migrations'});
        this.onEditClick = this.onEditClick.bind(this);
        this.changeName = this.changeName.bind(this);
        this.saveMigration = this.saveMigration.bind(this);*/
    }
    async componentDidMount(){
        let table_res = await this.resource.get(this.state.table_id)
        this.setState(state=>{
            return{...state, table:table_res}
        });
    }
   
   
  render(){
    return <div className="admin-templates admin-page">
        <div className="admin-heading">
            <div className="admin-breadcrumbs">
                <Link className="admin-breadcrumbs__link" to="/admin/tables">Tables</Link>
                <span className="admin-breadcrumbs__separator">/</span>
                <Link className="admin-breadcrumbs__link" to={"/admin/tables/edit/"+this.state.table_id}>{this.state.table.title}</Link>
                <span className="admin-breadcrumbs__separator">/</span>
                <span className="admin-breadcrumbs__current">Setting</span>
            </div>
        </div>
        <div className="admin-content">
            <Tabs selectedIndex={this.state.activeTab} onSelect={this.switchTab}>
                <TabList className="nav nav-pills admin-pills">
                    <Tab>Migration</Tab>
                    <Tab>Model</Tab>
                    <Tab>Controller</Tab>
                    <Tab>Routes</Tab>
                </TabList>
                <TabPanel>
                    <MigrationsTable/>
                    <div>
                        <Link className="btn" to={"/admin/tables/edit/"+this.state.table_id+"/setting/migrations/add"}>Add New</Link>
                    </div>
                </TabPanel>
                <TabPanel>
                    <AddModelPage/>
                </TabPanel>
                  <TabPanel>
                  </TabPanel>
                  <TabPanel>
                  </TabPanel>
            </Tabs>
            
        </div>
    </div>;
  }

}

export default withRouter(SettingTable);