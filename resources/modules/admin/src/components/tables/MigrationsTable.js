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
                {
                    name: 'run',
                    title: 'Run',
                    is_button: true, 
                    button: {
                        class: "",
                        function: this.runMigration.bind(this),
                        title: "Run"
                    },
                },
            ],
        };
        
        this.migrations_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/migrations'});
        this.table_resource = new Resource({route: '/admin/ajax/tables'});
        
        this.runMigration = this.runMigration.bind(this);
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
    
    
    runMigration(e){
        let itemIndex = this.state.data.migrations.indexOf(e);
        
        let modalSettings = {
            title: 'Run Migration',
            submitButton: 'Add',
            submit: function(formData){
                
                console.log("run!!");
                /*let b = this.setState((state) => {
                    //Вроде должен заменять строку, но получаем ошибку в Таблице
                    //Each child in a list should have a unique "key" prop.
                    //Разобраться и поменять
                    formData.id = new Date().getTime();
                    if(itemIndex === -1) {
                        return { ...state, data: { ...state.data,  columns: update(this.state.data.columns, {$push: [formData]})}};
                    }
                    else {
                        return { ...state, data: {...state.data, columns: update(this.state.data.columns, {[itemIndex]: {$set: formData}})}};
                    }
                });
                return Promise.resolve(b)*/
            }.bind(this),
            fields: [],
            success: function(res){
                console.log(this);
                console.log("res");
            }.bind(this),
            active: true,
        };
        store.dispatch(setModalSettings(modalSettings));
    }
   
    
  render(){
      return <div>
        <AdminTable columns={this.state.table_columns} rows={this.state.migrations}/>
      </div>
  }

}

export default withRouter(MigrationsTable);