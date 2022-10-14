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

class AddModelPage extends Component{
    constructor(props){
        super(props);

        /**
         * Типы связей
         */
        this.relationship_types = [
            {id: "hasMany",name: "hasMany"},
            {id: "hasOne",name: "hasOne"},
            {id: "belongsTo",name: "belongsTo"},
            {id: "belongsToMany",name: "belongsToMany"},
            {id: "hasOneThrough",name: "hasOneThrough"},
            {id: "hasManyThrough",name: "hasManyThrough"},
            {id: "morphTo",name: "morphTo"},
            {id: "morphOne",name: "morphOne"},
            {id: "morphMany",name: "morphMany"},
            {id: "morphToMany",name: "morphToMany"},
            {id: "morphedByMany",name: "morphedByMany"},
        ];

        /**
         * Настройки таблицы связей
         */
        this.table_columns = [
            {name: 'id',title: 'ID',},
            {name: 'name',title: 'Name',},
            {name: 'type',title: 'Type',},
            {name: 'model_class',title: 'Model Class',},
            {name: 'foreign_key',title: 'Foreign Key',},
            {name: 'local_key',title: 'Local Key',},
            {
                name: 'edit',
                title: 'Edit',
                is_button: true,
                button: {class: "",function: this.addModalShow.bind(this),title: "Edit"},
            },
            {
                name: 'delete',
                title: 'Delete',
                is_button: true,
                button: {class: "",function: this.onDeleteClick.bind(this),title: "Delete"},
            },
        ];

        /**
         * Связь по умолчанию
         * @type type
         */
        const default_relationship = {
            id: "",
            name: '',
            title: '',
            type: "hasMany",
            model_class: '',
            foreign_key: '',
            local_key: '',
        };

        /**
         * Настройки таблицы формул
         */
        this.accessors_table_columns = [
            {name: 'id',title: 'ID',},
            {name: 'name',title: 'Name',},
            {name: 'formula',title: 'Formula',},
            {name: 'status',title: 'Status',},
            {
                name: 'edit',
                title: 'Edit',
                is_button: true,
                button: {class: "",function: this.addAccessorModalShow.bind(this),title: "Edit"},
            },
            {
                name: 'delete',
                title: 'Delete',
                is_button: true,
                button: {class: "",function: this.onDeleteAccessorClick.bind(this),title: "Delete"},
            },
        ];

        /**
         * Формула по умолчанию
         * @type type
         */
        const default_accessor = {
            id: "",
            name: '',
            formula: '',
            description: "",
        };

        this.state = {
            modal_toogle: false,
            table_id: this.props.match.params.id,
            table: {},
            actual_columns: [],
            fillable_columns: [],
            user_cols: [],
            data: {
                description: "",
                fillable_cols: [],
                user_cols: [],
                table_id: this.props.match.params.id,
                path: "",
                name: "",
                relationships: [],
                pk: "",
                time_stamps: false,
                soft_deletes: false
            },
            accessors: [],
            default_relationship: default_relationship,
            selected_relationship: null,
            relationship: default_relationship,
            default_accessor: default_accessor,
            selected_accessor: null,
            accessor: default_accessor,
        };



        this.resource = new Resource({route: '/admin/ajax/tables'});
        this.model_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/model'});
        this.save_model_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/models'});
        this.accessors_resource = false;

        this.addFillableColumn = this.addFillableColumn.bind(this);
        this.deleteFillableColumn = this.deleteFillableColumn.bind(this);
        this.addUserColsColumn = this.addUserColsColumn.bind(this);
        this.deleteUserColsColumn = this.deleteUserColsColumn.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeRelationship = this.onChangeRelationship.bind(this);
        this.saveModel = this.saveModel.bind(this);

        this.addRelationship = this.addRelationship.bind(this);
        this.addModalShow = this.addModalShow.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.getModalClasses = this.getModalClasses.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);

        this.addAccessorModalShow = this.addAccessorModalShow.bind(this);
        this.onDeleteAccessorClick = this.onDeleteAccessorClick.bind(this);

    }

    async componentDidMount(){
        let table_res = await this.resource.get(this.state.table_id)
        this.setState(state=>{
            return{...state, table:table_res};
        });

        let columns_res = await this.resource.get(this.state.table_id+"/columns");
        this.setState(state=>{
            return{...state, actual_columns: columns_res, fillable_columns: columns_res, user_cols: columns_res};
        });

        let model_data = await this.resource.get(this.state.table_id+"/model");

        if(model_data) {



            let model = {
                description: model_data.description,
                fillable_cols: this.setCols(model_data.fillable_cols),
                user_cols: this.setCols(model_data.user_cols),
                table_id: model_data.table_id,
                path: model_data.path !== null ? model_data.path : "",
                name: model_data.name,
                relationships: model_data.table.relationships,
                pk: model_data.pk,
                time_stamps: model_data.time_stamps,//1 == model_data.time_stamps ? true : false,
                soft_deletes: model_data.soft_deletes//1 == model_data.soft_deletes ? true : false,
            }

            this.accessors_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/models/'+model_data.id+"/accessors"});
            let accessors_data = await this.accessors_resource.getAll();

            this.setState(state=>{
                return{...state, data: model, accsessors: accessors_data};
            }, () => {

            });
        }



        /*
        let keys_res = await this.resource.get(this.state.table_id+"/keys")
        this.setState(state=>{
            return{...state, data: { ...state.data, keys: keys_res}};
        });*/
    }

    setCols(value) {

        let cols = [];

        if(!value) return cols;

        if(value == null || value == "") return cols;


        value.replace(/'/g,"");
        return value.split(",");
    }

    addFillableColumn(e) {

        let value = e.target.value;

        let itemIndex = this.state.data.fillable_cols.indexOf(value);

        if(itemIndex !== -1) {
            alert("This column has already been added.");
            return false;
        }

        this.setState((state) => {
            return { ...state, data: { ...state.data,  fillable_cols: update(state.data.fillable_cols, {$push: [value]})}};
        }, () => {
            //this.toggleModal();
        });
    }
    deleteFillableColumn(e, value) {
        e.preventDefault();

        let itemIndex = this.state.data.fillable_cols.indexOf(value);

        if(itemIndex === -1) {
            alert("This column not found.");
            return false;
        }

        this.setState((state) => {
            return { ...state, data: { ...state.data,  fillable_cols: update(state.data.fillable_cols, {$splice: [[itemIndex, 1]]})}};
        }, () => {
            //this.toggleModal();
        });
    }

    addUserColsColumn(e) {

        let value = e.target.value;

        let itemIndex = this.state.data.user_cols.indexOf(value);

        if(itemIndex !== -1) {
            alert("This column has already been added.");
            return false;
        }

        this.setState((state) => {
            return { ...state, data: { ...state.data,  user_cols: update(state.data.user_cols, {$push: [value]})}};
        }, () => {
            //this.toggleModal();
        });
    }
    deleteUserColsColumn(e, value) {
        e.preventDefault();

        let itemIndex = this.state.data.user_cols.indexOf(value);

        if(itemIndex === -1) {
            alert("This column not found.");
            return false;
        }

        this.setState((state) => {
            return { ...state, data: { ...state.data,  user_cols: update(state.data.user_cols, {$splice: [[itemIndex, 1]]})}};
        }, () => {
            //this.toggleModal();
        });
    }

    onChange(e) {
        let field_name = e.target.name;
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        this.setState({ ...this.state, data:{...this.state.data, [field_name]: value}});
    }
    onChangeRelationship(e) {
        let field_name = e.target.name;
        this.setState({ ...this.state, relationship:{...this.state.relationship, [field_name]: e.target.value}});
    }

    async saveModel(e) {
        e.preventDefault();

        if(this.state.data.name == "") {
            alert("Enter model name!");
            return;
        }

        let headers = {
            'Content-Type': 'application/json'
        };

        let data = {...this.state.data};
        /*data.time_stamps = String(true) == model.time_stamps ? true : false;
        data.soft_deletes = String(true) == model.soft_deletes ? true : false;*/
        data._token = _token;


        console.log(this.state.data)
        /*let data = {
            model: model,

        };*/
        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers,
        };


        let res;
        res = await this.save_model_resource.post(data);

        if(res){
            alert("Success");
        }
        else {
            alert("Error");
        }
    }

    addRelationship(e) {
        e.preventDefault();

        let obj = {...this.state.relationship};

        if(obj.id == "") {
            obj.id = new Date().getTime();
        }

        this.setState((state) => {
            if(state.selected_relationship == null) {
                return { ...state, data: { ...state.data,  relationships: update(state.data.relationships, {$push: [obj]})}};
            }
            else {
                return { ...state, data: { ...state.data,  relationships: update(state.data.relationships, {[state.selected_relationship]: {$set: obj}})}};
            }
        }, () => {
            this.toggleModal();
        });
    }
    getModalClasses() {
        let modalClasses = 'admin-modal';
        if (this.state.modal_toogle) {
          modalClasses += ' admin-modal_active';
        }
        return modalClasses;
    }
    toggleModal() {
        this.setState((state) => {
            return { ...state, modal_toogle: !state.modal_toogle}
        })
    }
    addModalShow(e) {

        let itemIndex = this.state.data.relationships.indexOf(e);
        this.setState((state) => {
            if(itemIndex === -1) {
                return { ...state, selected_relationship: null, relationship: state.default_relationship}
            }
            else {
                return { ...state, selected_relationship: itemIndex, relationship: state.data.relationships[itemIndex]}
            }

        }, () => {
            this.toggleModal();
        });
    }
    onDeleteClick(e){
        const conf = confirm(`Are you sure?`);

        if (conf) {
            let itemIndex = this.state.data.relationships.indexOf(e);
            if(itemIndex !== -1) {
                this.setState((state) => {
                    return { ...state, data: { ...state.data,  relationships: update(this.state.data.relationships, {$splice: [[itemIndex, 1]]})}};
                }, () => {
                    alert("Success");
                });
            }
        }
    }



    addAccessorModalShow(e) {

        let itemIndex = this.state.data.relationships.indexOf(e);
        this.setState((state) => {
            if(itemIndex === -1) {
                return { ...state, selected_relationship: null, relationship: state.default_relationship}
            }
            else {
                return { ...state, selected_relationship: itemIndex, relationship: state.data.relationships[itemIndex]}
            }

        }, () => {
            this.toggleModal();
        });
    }
    onDeleteAccessorClick(e){
        const conf = confirm(`Are you sure?`);

        if (conf) {
            let itemIndex = this.state.data.relationships.indexOf(e);
            if(itemIndex !== -1) {
                this.setState((state) => {
                    return { ...state, data: { ...state.data,  relationships: update(this.state.data.relationships, {$splice: [[itemIndex, 1]]})}};
                }, () => {
                    alert("Success");
                });
            }
        }
    }

    render(){
        return <div>
            <div>
                <form>
                    <div>
                        <label className='form-label'>
                            Name
                            <input className='form__input' type="text" name="name" value={this.state.data.name}  onChange={(e) => {this.onChange(e)}}/>
                        </label>
                    </div>
                    <div>
                        <label className='form-label'>
                            Description
                            <input className='form__input' type="text" name="description" value={this.state.data.description}  onChange={(e) => {this.onChange(e)}}/>
                        </label>
                    </div>
                    <div>
                        <label className='form-label'>
                            Soft Deletes
                            <input className='form__input' type="checkbox" checked={this.state.data.soft_deletes ? 1 : 0} name="soft_deletes" onChange={(e) => {this.onChange(e)}}/>
                        </label>
                    </div>
                    <div>
                        <label className='form-label'>
                            Timestamps
                            <input className='form__input' type="checkbox" checked={this.state.data.time_stamps ? 1 : 0}  name="time_stamps" onChange={(e) => {this.onChange(e)}}/>
                        </label>
                    </div>
                    <div>
                        <label className='form-label'>
                            Fillable
                            <select className="form__input" name='add_fillable' onChange={(e) => {this.addFillableColumn(e)}}>
                                <option value=""/>
                                {
                                  this.state.fillable_columns.map(option =>
                                      <option key={option.id}
                                              value={option.name}
                                              children={option.title}/>)
                                }
                            </select>
                        </label>
                        <div>
                            {
                                this.state.data.fillable_cols.map(option =>
                                <div key={option}>
                                    <button className="btn" onClick={(e) => {this.deleteFillableColumn(e,option)}}>{option}</button>
                                </div>  )
                                }
                        </div>
                    </div>
                    <div>
                        <label className='form-label'>
                            User Cols
                            <select className="form__input" name='add_user_cols' onChange={(e) => {this.addUserColsColumn(e)}}>
                                <option value=""/>
                                {
                                  this.state.user_cols.map(option =>
                                      <option key={option.id}
                                              value={option.name}
                                              children={option.title}/>)
                                }
                            </select>
                        </label>
                        <div>
                            {
                                this.state.data.user_cols.map(option =>
                                <div key={option}>
                                    <button className="btn" onClick={(e) => {this.deleteUserColsColumn(e,option)}}>{option}</button>
                                </div>  )
                                }
                        </div>
                    </div>
                    <div>
                        <label className='form-label'>
                            Path
                            <input className='form__input' type="text" name="path" value={this.state.data.path}  onChange={(e) => {this.onChange(e)}}/>
                        </label>
                    </div>
                    <label className='form-label'>
                        Primary Key
                        <select className="form__input" name='pk'  value={this.state.data.pk} onChange={(e) => {this.onChange(e)}}>
                            <option value=""/>
                            {
                              this.state.actual_columns.map(option =>
                                  <option key={option.id}
                                          value={option.name}
                                          children={option.title || option.name}/>)
                            }
                        </select>
                    </label>
                </form>
            </div>
            <div>
                <AdminTable columns={this.table_columns} rows={this.state.data.relationships}/>
            </div>
            <div>
                <button onClick={this.addModalShow}>Add Relationship</button>
            </div>
            <div>
                <form className="admin-form" onSubmit={this.saveModel}>
                    <button className="btn btn_success">Save</button>
                </form>
            </div>
            <div>
                <hr />
            </div>
            <div>
                <AdminTable columns={this.accessors_table_columns} rows={this.state.accessors}/>
            </div>
            <div>
                <button onClick={this.addAccessorModalShow}>Add Accessor</button>
            </div>

            <div className={this.getModalClasses()}>
                <div className="admin-modal__bg" onClick={this.toggleModal}/>
                <div className="admin-modal-content">
                  <button className="admin-modal__close" onClick={this.toggleModal}><TimesIcon className="icon"/></button>
                  <div className="admin-caption">Add New Relationship</div>
                  <div className="admin-modal-form form">
                    <form className="admin-form" onSubmit={this.addRelationship}>
                        <div>
                            <label className='form-label'>
                                name
                                <input className='form__input' type="text" name="name" value={this.state.relationship.name} onChange={(e) => {this.onChangeRelationship(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                Model Class
                                <input className='form__input' type="text" name="model_class" value={this.state.relationship.model_class}  onChange={(e) => {this.onChangeRelationship(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                type
                                <select className="form__input" value={this.state.relationship.type} name='type'  onChange={(e) => {this.onChangeRelationship(e)}}>
                                    <option value=""/>
                                    {
                                      this.relationship_types.map(option =>
                                          <option key={option.id}
                                                  value={option.id}
                                                  children={option.title || option.name}/>)
                                    }
                                    </select>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                foreign key
                                <input className='form__input' type="text" name="foreign_key"  value={this.state.relationship.foreign_key} onChange={(e) => {this.onChangeRelationship(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                local key
                                <input className='form__input' type="text" name="local_key" value={this.state.relationship.local_key} onChange={(e) => {this.onChangeRelationship(e)}}/>
                            </label>
                        </div>
                        <button className="btn btn_success">Add col</button>
                    </form>
                  </div>
                </div>
              </div>
        </div>;


  }

}

export default withRouter(AddModelPage);
