import React, {Component} from "react";
import {Redirect, withRouter} from "react-router";
import AdminTable from "../AdminTable";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Link} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import store from "../../js/store/store";
import {setModalSettings, toggleModal} from "../../js/store/modal-settings/actions";
import update from 'immutability-helper';

/*
import store from "../js/store/store";
import {setModalSettings, toggleModal} from "../js/store/modal-settings/actions";
import {generateId, redirect} from "../js/helpers";*/


class MigrationsTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            table_id: this.props.match.params.id,
            migrations: [],
            table: {},
            table_columns: [
                {name: 'name',title: 'Name',},
                {name: 'status',title: 'Status',},
                {name: 'created_at',title: 'Created At',},
            ],
        };
        
        this.migrations_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/migrations'});
        this.table_resource = new Resource({route: '/admin/ajax/tables'});
    }
    async componentDidMount(){
        let res = await this.migrations_resource.getAll();
        this.setState(state=>{
            return{...state, migrations:res}
        });
        
        let table_res = await this.table_resource.get(this.state.table_id)
        this.setState(state=>{
            return{...state, table:table_res}
        });
    }
    
    render(){
        return <div>
          <AdminTable columns={this.state.table_columns} rows={this.state.migrations}/>
        </div>
    }

}

export default withRouter(MigrationsTable);