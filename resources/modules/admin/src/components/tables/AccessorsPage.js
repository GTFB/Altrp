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

class AccessorsPage extends Component{
    constructor(props){
        super(props);

        /**
         * Настройки таблицы формул
         */
        this.table_columns = [
            {name: 'id',title: 'ID',},
            {name: 'name',title: 'Name',},
            {name: 'formula',title: 'Formula',},
            {name: 'status',title: 'Status',},
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
            data: [],
            default_accessor: default_accessor,
            selected_accessor: null,
            accessor: default_accessor,
        };

        this.resource = new Resource({route: '/admin/ajax/tables'});
        this.model_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/model'});
        this.accessors_resource = false;

        this.toggleModal = this.toggleModal.bind(this);
        this.getModalClasses = this.getModalClasses.bind(this);

        this.onChange = this.onChange.bind(this);

        this.addModalShow = this.addModalShow.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.addAccessor = this.addAccessor.bind(this);

        this.getModalClasses = this.getModalClasses.bind(this);

    }

    async componentDidMount(){
        let table_res = await this.resource.get(this.state.table_id)
        this.setState(state=>{
            return{...state, table:table_res};
        });

        let model_data = await this.model_resource.get(" ");

        if(model_data) {

            this.accessors_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/models/'+model_data.id+"/accessors"});
            let accessors_data = await this.accessors_resource.getAll();

            this.setState(state=>{
                return{...state, model: model_data, data: accessors_data};
            }, () => {

            });
        }
    }

    onChange(e) {
        let field_name = e.target.name;
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        this.setState({ ...this.state, accessor: {...this.state.accessor, [field_name]: value}});
    }

    async addAccessor(e) {
        e.preventDefault();

        let obj = {...this.state.accessor};

        if(obj.name == "") {
            alert("Enter accessor name!");
            return;
        }

        obj._token = _token;

        let res;

        if(this.state.selected_accessor == null) {
            res = await this.accessors_resource.post(obj);
        }
        else {
            res = await this.accessors_resource.put(obj.id, obj);
        }


        if(res){

            this.setState((state) => {
                if(state.selected_accessor == null) {
                    return { ...state, data: update(state.data, {$push: [res]})};
                }
                else {
                    return { ...state, data: update(state.data, {[state.selected_accessor]: {$set: res}})};
                }
            }, () => {
                this.toggleModal();
            });

        }
        else {
            alert("Error");
        }
        /*
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
        });*/
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
        let itemIndex = this.state.data.indexOf(e);
        this.setState((state) => {
            if(itemIndex === -1) {
                return { ...state, selected_accessor: null, accessor: state.default_accessor}
            }
            else {
                return { ...state, selected_accessor: itemIndex, accessor: state.data[itemIndex]}
            }

        }, () => {
            this.toggleModal();
        });
    }
    async onDeleteClick(e){
        const conf = confirm(`Are you sure?`);

        if (conf) {
            let itemIndex = this.state.data.indexOf(e);
            if(itemIndex !== -1) {
                let res;
                res = await this.accessors_resource.delete(e.id);

                if(res) {
                    this.setState((state) => {
                        return { ...state, data: update(this.state.data, {$splice: [[itemIndex, 1]]})};
                    }, () => {
                        alert("Success");
                    });
                }
                else {
                    alert("Error")
                }


            }
        }
    }

    render(){
        return <div>
            <div>
                <AdminTable columns={this.table_columns} rows={this.state.data}/>
            </div>
            <div>
                <button onClick={this.addModalShow}>Add Accessor</button>
            </div>

            <div className={this.getModalClasses()}>
                <div className="admin-modal__bg" onClick={this.toggleModal}/>
                <div className="admin-modal-content">
                  <button className="admin-modal__close" onClick={this.toggleModal}><TimesIcon className="icon"/></button>
                  <div className="admin-caption">Add New Accessor</div>
                  <div className="admin-modal-form form">
                    <form className="admin-form" onSubmit={this.addAccessor}>
                        <div>
                            <label className='form-label'>
                                name
                                <input className='form__input' type="text" name="name" value={this.state.accessor.name} onChange={(e) => {this.onChange(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                description
                                <input className='form__input' type="text" name="description" value={this.state.accessor.description}  onChange={(e) => {this.onChange(e)}}/>
                            </label>
                        </div>
                        <div>
                            <label className='form-label'>
                                formula
                                <input className='form__input' type="text" name="formula" value={this.state.accessor.formula}  onChange={(e) => {this.onChange(e)}}/>
                            </label>
                        </div>

                        <button className="btn btn_success">Add accessor</button>
                    </form>
                  </div>
                </div>
              </div>
        </div>;


  }

}

export default withRouter(AccessorsPage);
