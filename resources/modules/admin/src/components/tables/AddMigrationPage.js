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


class AddMigrationPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            table_id: this.props.match.params.id,
            table: {},
            data: {
                columns: [{id: 1,name: "Name",title: "Title",description: "Description",type: "integer",size: 191,default: "default",null: true,unique: true,}],
                keys: [],
                rename_columns: [],
            },
            name: "",
            column_types: [
                {id: "id",name: "Identifier"},
                {id: "foreignId",name: "Foreign Id"},
                {id: "boolean",name: "Boolean"},
                {id: "char",name: "Char"},
                {id: "date",name: "Date"},
                {id: "datetime",name: "Datetime"},
                {id: "integer",name: "Integer"},
                {id: "mediumtext",name: "Medium Text"},
                {id: "longtext",name: "Long Text"},
                {id: "string",name: "String"},
                {id: "text",name: "Text"},
                {id: "bigint",name: "Big Integer"},
                {id: "decimal",name: "Decimal"},
            ],
            table_columns: [
                {name: 'title',title: 'Title',},
                {name: 'name',title: 'Name',},
                {name: 'type',title: 'Type',},
                {name: 'size',title: 'Size',},
                {name: 'default',title: 'Default',},
                {name: 'null',title: 'Nullable',},
                {name: 'unique',title: 'Unique',},
                {
                    name: 'edit',
                    title: 'Edit',
                    is_button: true, 
                    button: {
                        class: "",
                        function: this.onEditClick.bind(this),
                        title: "Edit"
                    },
                },
                {
                    name: 'delete',
                    title: 'Delete',
                    is_button: true, 
                    button: {
                        class: "",
                        function: this.onDeleteClick.bind(this),
                        title: "Delete"
                    },
                },
            ],
            default_column: {
                id: null,
                name: null,
                title: null,
                descrption: null,
                type: "string",
                size: 191,
                default: "",
                null: false,
                unique: true,
            }
        };
        
        this.resource = new Resource({route: '/admin/ajax/tables'});
        this.migration_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/migrations'});
        this.onEditClick = this.onEditClick.bind(this);
        this.changeName = this.changeName.bind(this);
        this.saveMigration = this.saveMigration.bind(this);
    }
    async componentDidMount(){
        let table_res = await this.resource.get(this.state.table_id)
        this.setState(state=>{
            return{...state, table:table_res};
        });
        
        let columns_res = await this.resource.get(this.state.table_id+"/columns")
        this.setState(state=>{
            return{...state, data: { ...state.data, columns: columns_res}};
        });
        /*
        let keys_res = await this.resource.get(this.state.table_id+"/keys")
        this.setState(state=>{
            return{...state, data: { ...state.data, keys: keys_res}};
        });*/
    }
    
    
    
    
    onEditClick(e){
        let itemIndex = this.state.data.columns.indexOf(e);
      
        let modalSettings = {
            title: 'Add New Column',
            submitButton: 'Add',
            submit: function(formData){
                let b = this.setState((state) => {
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
                return Promise.resolve(b)
            }.bind(this),
            fields: [
                {
                    name: 'name',
                    label: 'Name',
                    required: true,
                    defaultValue: e.name,
                },
                {
                    name: 'title',
                    label: 'Title',
                    required: true,
                    defaultValue: e.title,
                },
                {
                    name: 'description',
                    label: 'Description',
                    defaultValue: e.description,
                },
                {
                    name: 'type',
                    label: 'Type',
                    required: true,
                    type: 'select',
                    options: this.state.column_types,
                    defaultValue: e.type,
                },
                {
                    name: 'size',
                    type: "number",
                    label: 'Size',
                    defaultValue: e.size,
                },
                {
                    name: 'default',
                    label: 'Default',
                    defaultValue: e.default,
                },
                {
                    name: 'null',
                    label: 'Nullable',
                    type: "checkbox",
                    defaultValue: e.null,
                },
                {
                    name: 'unique',
                    label: 'Unique',
                    type: "checkbox",
                    defaultValue: e.unique,
                },
            ],
            success: function(res){
                console.log(this);
                console.log("res");
            }.bind(this),
            active: true,
        };
        store.dispatch(setModalSettings(modalSettings));
    }
    onDeleteClick(e){
        let itemIndex = this.state.data.columns.indexOf(e);
        let b = false;
        if(itemIndex !== -1) {
            b = this.setState((state) => {
                return { ...state, data: { ...state.data,  columns: update(this.state.data.columns, {$splice: [[itemIndex]]})}};
            })
        }
        
        return Promise.resolve(b)
        console.log("delete");
        console.log(e);
    }
    changeName(e) {
        let target = e.target;
        let name_value = target.value
        this.setState( (state) => {
            return {name: name_value}
        });
    }
    async saveMigration(e) {
        e.preventDefault();
        let url = this.state.main_url + "/migrations";
        let headers = {
            'Content-Type': 'application/json'
        };
        console.log(this.state.data)
        let data = {
            name: this.state.name,
            data: JSON.stringify(this.state.data),
            _token: _token
        };
        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers,
        };
        
        
        let res;
        res = await this.migration_resource.post(data);
        
        if(res){
            alert(res)
        }
        /*if(this.state.id){
            res = await this.resource.put(this.state.id, this.state.value);
        } else {
            res = await this.resource.post(this.state.value);
        }
        
        return fetch(url, options).then(res => {
            if(res.ok === false){
                return Promise.reject(res.text(), res.status);
            }
            return alert(res.json());
        });  */
    }
  /*
  changeActiveArea(e){
    let areaId = parseInt(e.target.dataset.area);
    let activeTemplateArea = {};
    this.state.templateAreas.forEach(area=>{
      if(area.id === areaId){
        activeTemplateArea = area;
      }
    });
    this.setActiveArea(activeTemplateArea)
  }
  setActiveArea(activeTemplateArea){
    let templates = this.state.allTemplates.filter(template=>{
      return template.area === activeTemplateArea.name;
    });
    this.setState(state=>{
      return{...state, activeTemplateArea, templates};
    })
  }
  async componentDidMount(){
    let templateAreas = await this.emplateTypesResource.getAll();
    this.setActiveArea(templateAreas[0]);
    this.setState(state=>{
      return{...state,templateAreas}
    });
    this.resource.getAll().then(templates=>{
      this.setTemplates(templates);
    });
  }
  onClick(){
    let modalSettings = {
      title: 'Add New Template',
      submitButton: 'Add',
      submit: function(formData){
        let data = {
          name: formData.title,
          title: formData.title,
          area: formData.area,
          data:{
            children: [],
            id: generateId(),
            name: "root-element",
            settings: {},
            type: "root-element",
          }
        };
        return (new Resource({route:'/admin/ajax/templates'})).post(data)
      },
      fields: [
        {
          name: 'title',
          label: 'Template Name',
          required: true,
        },
        {
          name: 'area',
          label: 'Area Name',
          required: true,
          type: 'select',
          options: this.getAreasOptions(),
          defaultValue: this.state.activeTemplateArea.id
        }
      ],
      success: function(res){
        if(res.redirect && res.url){
          redirect(res.url)
        }
      },
      active: true,
    };
    store.dispatch(setModalSettings(modalSettings));
  }
  getAreasOptions(){
    return this.state.templateAreas;
  }
  setTemplates(templates){
    let allTemplates = templates;
    templates = templates.filter(template=>{
      return template.area === this.state.activeTemplateArea.name;
    });
    this.setState(state=>{
      return{...state, templates, allTemplates};
    });
  }*/
  render(){
    return <div className="admin-templates admin-page">
        <div className="admin-heading">
            <div className="admin-breadcrumbs">
                <Link className="admin-breadcrumbs__link" to="/admin/tables">Tables</Link>
                <span className="admin-breadcrumbs__separator">/</span>
                <Link className="admin-breadcrumbs__link" to={"/admin/tables/edit/"+this.state.table_id}>{this.state.table.title}</Link>
                <span className="admin-breadcrumbs__separator">/</span>
                <Link className="admin-breadcrumbs__link" to={"/admin/tables/edit/"+this.state.table_id+"/setting"}>Setting</Link>
                <span className="admin-breadcrumbs__separator">/</span>
                <span className="admin-breadcrumbs__current">Add New Migration</span>
            </div>
        </div>
        <div className="admin-content">
            <div>
                <input type="text" placeholder="Enter migration name..." onChange={this.changeName}/>
            </div>
            <AdminTable columns={this.state.table_columns} rows={this.state.data.columns}/>
            <div>
                <button onClick={() => this.onEditClick(this.state.default_column)}>Add</button>
            </div>

            <div>
                <form className="admin-form" onSubmit={this.saveMigration}>
                    <button className="btn btn_success">Save</button>
                </form>
            </div>
        </div>
    </div>;
  }

}

export default withRouter(AddMigrationPage);