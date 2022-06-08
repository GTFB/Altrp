import React, {Component} from "react";
import {Redirect, withRouter} from 'react-router-dom';
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

        //Типы  полей
        this.column_types = [
            {id: "id",name: "Identifier",fields:[]},
            {id: "foreignId",name: "Foreign Id",fields:["nullable","default"]},
            {id: "boolean",name: "Boolean",fields:["nullable","default"]},
            {id: "date",name: "Date",fields:["nullable","default","size","unique","current"]},
            {id: "datetime",name: "Datetime",fields:["nullable","default","size","unique","current"]},
            {id: "decimal",name: "Decimal",fields:["nullable","default","size","places"]},
            {id: "integer",name: "Integer",fields:["nullable","default"]},
            {id: "longtext",name: "Long Text",fields:["nullable","default","unique"]},
            {id: "string",name: "String",fields:["nullable","default","size","unique"]},
            {id: "text",name: "Text",fields:["nullable","default","unique"]},
            {id: "timestamps",name: "Timestamps",fields:["size"]},
        ];

        //Значения колонки по умолчанию
        const default_column = {
            id: "",
            name: '',
            title: '',
            description: '',
            type: "string",
            size: 191,
            places: 0,
            default: "",
            null: false,
            unique: false,
        };

        //Значения ключа по умолчанию
        const default_key = {
            id: "",
            target_table: "",
            source_table_id: this.props.match.params.id,
            target_column: "",
            source_column: "",
            onDelete: "restrict",
            onUpdate: "restrict",
        };

        //Типы действий для onDelete и onUpdate
        this.key_actions = [
            {id: "restrict", name: "RESTRICT"},
            {id: "cascade", name: "CASCADE"},
            {id: "set null", name: "SET NULL"},
            {id: "no action", name: "NO ACTION"},
        ];

        //Колонки для таблицы полей
        this.table_columns = [
            {name: 'title',title: 'Title',},
            {name: 'name',title: 'Name',},
            {name: 'type',title: 'Type',},
            {name: 'size',title: 'Size',},
            {name: 'default',title: 'Default',},
            {name: 'null',title: 'Nullable',is_boolean: true},
            {name: 'unique',title: 'Unique',is_boolean: true},
            {
                name: 'edit',
                title: 'Edit',
                is_button: true,
                button: {class: "",function: this.addModalColumnShow.bind(this),title: "Edit"},
            },
            {
                name: 'delete',
                title: 'Delete',
                is_button: true,
                button: {class: "",function: this.onDeleteColumnClick.bind(this),title: "Delete"},
            },
        ];

        //Колонки для таблицы полей
        this.table_keys = [
            {name: 'target_table',title: 'Target Table',},
            {name: 'target_column',title: 'Target Column',},
            {name: 'source_column',title: 'Source Column',},
            {name: 'onDelete',title: 'onDelete',},
            {name: 'onUpdate',title: 'onUpdate',},
            {
                name: 'edit',
                title: 'Edit',
                is_button: true,
                button: {class: "",function: this.addModalKeyShow.bind(this),title: "Edit"},
            },
            {
                name: 'delete',
                title: 'Delete',
                is_button: true,
                button: {class: "",function: this.onDeleteKeyClick.bind(this),title: "Delete"},
            },
        ],


        this.state = {
            column_modal_toggle: false,
            key_modal_toggle: false,
            table: {},
            table_id: this.props.match.params.id,
            data: {
                columns: [],
                keys: [],
                rename_columns: [],
            },
            name: "",
            default_column: default_column,
            selected_column: null,
            column: default_column,
            default_key: default_key,
            selected_key: null,
            key: default_key
        };

        this.resource = new Resource({route: '/admin/ajax/tables'});
        this.migration_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/migrations'});

        this.addModalColumnShow = this.addModalColumnShow.bind(this);
        this.addModalKeyShow = this.addModalKeyShow.bind(this);

        this.onChangeColumn = this.onChangeColumn.bind(this);
        this.onChangeKey = this.onChangeKey.bind(this);

        this.addColumn = this.addColumn.bind(this);
        this.addKey = this.addKey.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.getModalClasses = this.getModalClasses.bind(this);

        this.onDeleteColumnClick = this.onDeleteColumnClick.bind(this);
        this.onDeleteKeyClick = this.onDeleteKeyClick.bind(this);

        this.changeName = this.changeName.bind(this);
        this.saveMigration = this.saveMigration.bind(this);

        this.isShowField = this.isShowField.bind(this);




    }

    //Подгрузка данных
    async componentDidMount(){
        //Получаем данные о таблице
        let table_res = await this.resource.get(this.state.table_id)
        this.setState(state=>{
            return{...state, table:table_res};
        });
        //Получаем данные о колонках
        let columns_res = await this.resource.get(this.state.table_id+"/columns")
        this.setState(state=>{
            return{...state, data: { ...state.data, columns: columns_res}};
        });
        //Получаем данные о ключах
        let keys_res = await this.resource.get(this.state.table_id+"/keys")
        this.setState(state=>{
            return{...state, data: { ...state.data, keys: keys_res}};
        });
    }

    //Получаем класс для модального окна
    getModalClasses(type) {

        let modal_toggle = type+"_modal_toggle";

        let modalClasses = 'admin-modal';
        if (this.state[modal_toggle]) {
          modalClasses += ' admin-modal_active';
        }
        return modalClasses;
    }

    //Получаем класс для модального окна
    isShowField(field_name) {

        let state = false;

        let type = this.column_types.find(item => item.id === this.state.column.type);

        if(type) {

            let index = type.fields.indexOf(field_name);

            if(index > -1)  {
                state = true;
            }

        }
        return state;
    }

    //Меняем переменную для открытия той или иной модали
    toggleModal(type) {
        let modal_toggle = type+"_modal_toggle";

        this.setState((state) => {
            return { ...state, [modal_toggle]: !state[modal_toggle]}
        }, () => {})
    }


    addModalColumnShow(e) {
        let itemIndex = this.state.data.columns.indexOf(e);

        this.setState((state) => {
            if(itemIndex === -1) {
                return { ...state, selected_column: null, column: state.default_column}
            }
            else {
                return { ...state, selected_column: itemIndex, column: state.data.columns[itemIndex]}
            }

        }, () => {
            this.toggleModal("column");
        });
    }

    addModalKeyShow(e) {
        let itemIndex = this.state.data.keys.indexOf(e);

        this.setState((state) => {
            if(itemIndex === -1) {
                return { ...state, selected_key: null, key: state.default_key}
            }
            else {
                return { ...state, selected_key: itemIndex, key: state.data.keys[itemIndex]}
            }
        }, () => {
            this.toggleModal("key");
        });
    }

    //Добавление столбца
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
            this.toggleModal("column");
        });
    }

    //Добавление ключа
    addKey(e) {
        e.preventDefault();

        let obj = {...this.state.key};

        if(obj.id == "") {
            obj.id = new Date().getTime();
        }

        this.setState((state) => {
            if(state.selected_key == null) {
                return { ...state, data: { ...state.data,  keys: update(state.data.keys, {$push: [obj]})}};
            }
            else {
                return { ...state, data: { ...state.data,  keys: update(state.data.keys, {[state.selected_key]: {$set: obj}})}};
            }
        }, () => {
            this.toggleModal("key");
        });
    }

    onDeleteColumnClick(e){
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

    onDeleteKeyClick(e){
        const conf = confirm(`Are you sure?`);

        if (conf) {
            let itemIndex = this.state.data.keys.indexOf(e);
            if(itemIndex !== -1) {
                this.setState((state) => {
                    return { ...state, data: { ...state.data,  keys: update(this.state.data.keys, {$splice: [[itemIndex, 1]]})}};
                }, () => {
                    alert("Success");
                });
            }
        }
    }

    /**
     * Изменение значений при работе с модальным окном
     * @param {type} e
     * @returns {undefined}
     */
    onChangeColumn(e) {
        let field_name = e.target.name;
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        if(field_name === "name") {


            let val = e.target.value.replace("_", " ");
            value = val.charAt(0).toUpperCase() + val.slice(1);

            let title = this.state.column.title;
            let description = this.state.column.description;

            if(title === "" || title === value.slice(0, value.length - 1)) {
                title = value;
            }
            if(description === "" || description === value.slice(0, value.length - 1)) {
                description = value;
            }

            this.setState({ ...this.state, column:{...this.state.column, [field_name]: e.target.value, title: title, description: description }});
            return;
        }

        this.setState({ ...this.state, column:{...this.state.column, [field_name]: value}}, () => {});
    }
    onChangeKey(e) {
        let field_name = e.target.name;
        console.log(e.target.value);
        this.setState({ ...this.state, key:{...this.state.key, [field_name]: e.target.value}});
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
        console.log(res)
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
            <AdminTable columns={this.table_columns} rows={this.state.data.columns}/>
            <div>
                <button onClick={(e) => this.addModalColumnShow(e)}>Add Column</button>
            </div>
            <AdminTable columns={this.table_keys} rows={this.state.data.keys}/>
            <div>
                <button onClick={(e) => this.addModalKeyShow(e)}>Add Key</button>
            </div>


            <div className={this.getModalClasses("key")}>
                <div className="admin-modal__bg" onClick={() => this.toggleModal("key")}/>
                <div className="admin-modal-content">
                  <button className="admin-modal__close" onClick={() => this.toggleModal("key")}><TimesIcon className="icon"/></button>
                  <div className="admin-caption">Add New Key</div>
                  <div className="admin-modal-form form">
                    <form className="admin-form" onSubmit={this.addKey}>
                        <div>
                            <label className='form-label'>
                                id
                                <input className='form__input' type="text" name="id" value={this.state.key.id} onChange={(e) => {this.onChangeKey(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                Target Table
                                <input className='form__input' type="text" name="target_table" value={this.state.key.target_table} onChange={(e) => {this.onChangeKey(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                Source Column
                                <input className='form__input' type="text" name="source_column" value={this.state.key.source_column}  onChange={(e) => {this.onChangeKey(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                Target Column
                                <input className='form__input' type="text" name="target_column" value={this.state.key.target_column}  onChange={(e) => {this.onChangeKey(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                onUpdate
                                <select className="form__input" value={this.state.key.onUpdate} name='onUpdate'  onChange={(e) => {this.onChangeKey(e)}}>
                                    <option value=""/>
                                    {
                                      this.key_actions.map(option =>
                                          <option key={option.id}
                                                  value={option.id}
                                                  children={option.title || option.name}/>)
                                    }
                                    </select>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                onDelete
                                <select className="form__input" value={this.state.key.onDelete} name='onDelete'  onChange={(e) => {this.onChangeKey(e)}}>
                                    <option value=""/>
                                    {
                                      this.key_actions.map(option =>
                                          <option key={option.id}
                                                  value={option.id}
                                                  children={option.title || option.name}/>)
                                    }
                                    </select>
                            </label>
                        </div>
                        <button className="btn btn_success">Add key</button>
                    </form>
                  </div>
                </div>
            </div>

            <div className={this.getModalClasses("column")}>
                <div className="admin-modal__bg" onClick={() => this.toggleModal("column")}/>
                <div className="admin-modal-content">
                  <button className="admin-modal__close" onClick={() => this.toggleModal("column")}><TimesIcon className="icon"/></button>
                  <div className="admin-caption">Add New Column</div>
                  <div className="admin-modal-form form">
                    <form className="admin-form" onSubmit={this.addColumn}>
                        <div>
                            <label className='form-label'>
                                name
                                <input className='form__input' type="text" name="name" value={this.state.column.name} onChange={(e) => {this.onChangeColumn(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                type
                                <select className="form__input" value={this.state.column.type} name='type'  onChange={(e) => {this.onChangeColumn(e)}}>
                                    <option value=""/>
                                    {
                                      this.column_types.map(option =>
                                          <option key={option.id}
                                                  value={option.id}
                                                  children={option.title || option.name}/>)
                                    }
                                    </select>
                            </label>
                        </div>
                        {this.isShowField("size") ? <div>
                            <label className='form-label'>
                                size
                                <input className='form__input' type="text" name="size"  value={this.state.column.size} onChange={(e) => {this.onChangeColumn(e)}}/>
                            </label>
                        </div> : null}
                        {this.isShowField("places") ? <div>
                            <label className='form-label'>
                                places
                                <input className='form__input' type="text" name="places"  value={this.state.column.places} onChange={(e) => {this.onChangeColumn(e)}}/>
                            </label>
                        </div> : null}
                        {this.isShowField("default") ? <div>
                            <label className='form-label'>
                                default
                                <input className='form__input' type="text" name="default" value={this.state.column.default} onChange={(e) => {this.onChangeColumn(e)}}/>
                            </label>
                        </div> : null}
                        {this.isShowField("unique") ? <div>
                            <label className='form-label'>
                                <input className='form__input' type="checkbox" name="unique" checked={this.state.column.unique ? 1 : 0} onChange={(e) => {this.onChangeColumn(e)}}/>
                                unique
                            </label>
                        </div> : null}
                        {this.isShowField("nullable") ? <div>
                            <label className='form-label'>
                                <input className='form__input' type="checkbox" name="null" checked={this.state.column.null ? 1 : 0} onChange={(e) => {this.onChangeColumn(e)}}/>
                                nullable
                            </label>
                        </div> : null}
                        <div>
                            <label className='form-label'>
                                title
                                <input className='form__input' type="text" name="title" value={this.state.column.title}  onChange={(e) => {this.onChangeColumn(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                description
                                <input className='form__input' type="text" name="description" value={this.state.column.description}  onChange={(e) => {this.onChangeColumn(e)}}/>
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
