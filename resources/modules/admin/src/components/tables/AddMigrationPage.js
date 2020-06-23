import React, {Component} from "react";
import {Redirect, withRouter} from "react-router";
import AdminTable from "../AdminTable";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Link} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import store from "../../js/store/store";
import {setModalSettings, toggleModal} from "../../js/store/modal-settings/actions";
import update from 'immutability-helper';

import TimesIcon from '../../svgs/times.svg';



class AddMigrationPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            column_modal_toogle: false,
            table_id: this.props.match.params.id,
            table: {},
            data: {
                columns: [],
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
                        function: this.addModalShow.bind(this),
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
                id: "",
                name: '',
                title: '',
                description: '',
                type: "string",
                size: 191,
                default: "",
                null: false,
                unique: false,
            },
            selected_column: null,
            column: {
                id: "",
                name: '',
                title: '',
                description: '',
                type: "string",
                size: 191,
                default: "",
                null: false,
                unique: false,
            }
        };
        
        this.resource = new Resource({route: '/admin/ajax/tables'});
        this.migration_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/migrations'});
        
        this.changeName = this.changeName.bind(this);
        this.saveMigration = this.saveMigration.bind(this);
        
        
        this.addColumn = this.addColumn.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.getModalClasses = this.getModalClasses.bind(this);
        
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.addModalShow = this.addModalShow.bind(this);
        this.onChange = this.onChange.bind(this);
        
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
    
    addColumn(e) {
        e.preventDefault();
        
        let obj = {...this.state.column};
        
        if(obj.id == "") {
            obj.id = new Date().getTime();
        }
        
        this.setState((state) => {
            if(state.selected_column == null) {
                return { ...state, data: { ...state.data,  columns: update(state.data.columns, {$push: [obj]})}};
            }
            else {
                return { ...state, data: { ...state.data,  columns: update(state.data.columns, {[state.selected_column]: {$set: obj}})}};
            }
        }, () => {
            this.toggleModal();
        });
    }
    getModalClasses() {
        let modalClasses = 'admin-modal';
        if (this.state.column_modal_toogle) {
          modalClasses += ' admin-modal_active';
        }
        return modalClasses;
    }
    toggleModal() {
        this.setState((state) => {
            return { ...state, column_modal_toogle: !state.column_modal_toogle}
        })
    }
    addModalShow(e) {
        let itemIndex = this.state.data.columns.indexOf(e);
        this.setState((state) => {
            if(itemIndex === -1) {
                return { ...state, selected_column: null, column: state.default_column}
            }
            else {
                return { ...state, selected_column: itemIndex, column: state.data.columns[itemIndex]}
            }
            
        }, () => { 
            this.toggleModal();
        });
    }
    onChange(e) {
        let field_name = e.target.name;
        console.log(e.target.value);
        this.setState({ ...this.state, column:{...this.state.column, [field_name]: e.target.value}});
    }
    onDeleteClick(e){
        const conf = confirm(`Are you sure?`);
        
        if (conf) {
            let itemIndex = this.state.data.columns.indexOf(e);
            if(itemIndex !== -1) {
                this.setState((state) => {
                    return { ...state, data: { ...state.data,  columns: update(this.state.data.columns, {$splice: [[itemIndex, 1]]})}};
                }, () => {
                    alert("Success");
                });
            }
        }
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
        
        if(this.state.name == "") {
            alert("Enter migration name!");
            return;
        }
        
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
            alert("Success");
        }
        else {
            alert("Error");
        }
    }
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
                <button onClick={this.addModalShow}>Add Column</button>
            </div>
            
            <div className={this.getModalClasses()}>
                <div className="admin-modal__bg" onClick={this.toggleModal}/>
                <div className="admin-modal-content">
                  <button className="admin-modal__close" onClick={this.toggleModal}><TimesIcon className="icon"/></button>
                  <div className="admin-caption">Add New Column</div>
                  <div className="admin-modal-form form">
                    <form className="admin-form" onSubmit={this.addColumn}>
                        <div>
                            <label className='form-label'>
                                id
                                <input className='form__input' type="text" name="id" value={this.state.column.id}  onChange={(e) => {this.onChange(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                name
                                <input className='form__input' type="text" name="name" value={this.state.column.name} onChange={(e) => {this.onChange(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                title
                                <input className='form__input' type="text" name="title" value={this.state.column.title}  onChange={(e) => {this.onChange(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                description
                                <input className='form__input' type="text" name="description" value={this.state.column.description}  onChange={(e) => {this.onChange(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                type
                                <select className="form__input" value={this.state.column.type} name='type'  onChange={(e) => {this.onChange(e)}}>
                                    <option value=""/>
                                    {
                                      this.state.column_types.map(option =>
                                          <option key={option.id}
                                                  value={option.id}
                                                  children={option.title || option.name}/>)
                                    }
                                    </select>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                size
                                <input className='form__input' type="text" name="size"  value={this.state.column.size} onChange={(e) => {this.onChange(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                default
                                <input className='form__input' type="text" name="default" value={this.state.column.default} onChange={(e) => {this.onChange(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                <input className='form__input' type="checkbox" name="unique" value={this.state.column.unique} onChange={(e) => {this.onChange(e)}}/>
                                unique
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                <input className='form__input' type="checkbox" name="null" value={this.state.column.null} onChange={(e) => {this.onChange(e)}}/>
                                nullable
                            </label>
                        </div>
                        <button className="btn btn_success">Add col</button>
                    </form>
                  </div>
                </div>
              </div>
            <div>
                
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