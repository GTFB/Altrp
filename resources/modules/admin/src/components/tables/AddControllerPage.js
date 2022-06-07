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

class AddControllerPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            table_id: this.props.match.params.id,
            table: {},
            relationships: [],
            relation: "",
            data: {
                description: "",
                prefix: "",
                namespace: "",
                relations: "",
            },

        };


        this.resource = new Resource({route: '/admin/ajax/tables'});
        this.controller_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/controller'});
        this.save_controller_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/controllers'});


        this.onChange = this.onChange.bind(this);
        this.saveController = this.saveController.bind(this);

        this.addRelation = this.addRelation.bind(this);
        this.deleteRelation = this.deleteRelation.bind(this);
    }

    async componentDidMount(){
        let table_res = await this.resource.get(this.state.table_id)
        this.setState(state=>{
            return{...state, table:table_res};
        });

        let controller_res = await this.resource.get(this.state.table_id+"/controller");



        if(controller_res) {


            controller_res.description = (controller_res.description == null) ? "" : controller_res.description;
            controller_res.prefix = (controller_res.prefix == null) ? "" : controller_res.prefix;
            controller_res.namespace = (controller_res.namespace == null) ? "" : controller_res.namespace;

            controller_res.relation = this.setCols(controller_res.relations);

            this.setState(state=>{
                return{...state, data: controller_res};
            }, () => {

                this.setState(state=>{
                    return{...state, relationships: controller_res.relation};
                })

            });
        }

    }

    setCols(value) {

        let cols = [];

        if(!value) return cols;

        if(value == null || value == "") return cols;


        value.replace(/'/g,"");
        return value.split(",");
    }

    onChange(e) {
        let field_name = e.target.name;

        if(field_name === "relation") {
            return this.setState({ ...this.state, relation: e.target.value});
        }

        this.setState({ ...this.state, data:{...this.state.data, [field_name]: e.target.value}});
    }

    async saveController(e) {
        e.preventDefault();

        let headers = {
            'Content-Type': 'application/json'
        };

        let data = {...this.state.data};
        data._token = _token;

        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers,
        };


        let res;
        res = await this.save_controller_resource.post(data);

        if(res){
            alert("Success");
        }
        else {
            alert("Error");
        }
    }

    addRelation(e) {
        e.preventDefault();
        let value = this.state.relation;

        let itemIndex = this.state.relationships.indexOf(value);

        if(itemIndex !== -1) {
            alert("This relation has already been added.");
            return false;
        }

        this.setState((state) => {
            return { ...state, relationships: update(state.relationships, {$push: [value]})};
        }, () => {
            this.setRelation();

        });
    }


    deleteRelation(e, value) {
        e.preventDefault();

        let itemIndex = this.state.relationships.indexOf(value);

        if(itemIndex === -1) {
            alert("This relation not found.");
            return false;
        }

        this.setState((state) => {
            return { ...state, relationships: update(state.relationships, {$splice: [[itemIndex, 1]]})};
        }, () => {
            this.setRelation();
        });
    }

    setRelation() {
        let relations = this.state.relationships.join(";");

        this.setState((state) => {
            return { ...state, data: { ...this.state.data, relations: relations}};
        }, () => {
        })
    }

    render(){
        return <div>
            <div>
                <form className="admin-form"  onSubmit={this.saveController}>
                    <div>
                        <label className='form-label'>
                            Description
                            <input className='form__input' type="text" name="description" value={this.state.data.description}  onChange={(e) => {this.onChange(e)}}/>
                        </label>
                    </div>
                    <div>
                        <label className='form-label'>
                            Prefix
                            <input className='form__input' type="text" name="prefix" value={this.state.data.prefix}  onChange={(e) => {this.onChange(e)}}/>
                        </label>
                    </div>
                    <div>
                        <label className='form-label'>
                            Namespace
                            <input className='form__input' type="text" name="namespace" value={this.state.data.namespace}  onChange={(e) => {this.onChange(e)}}/>
                        </label>
                    </div>
                    <div>
                        <label className='form-label'>
                            Relations
                            <div className="input-group">
                                <input className='form__input' type="text" name="relation" value={this.state.relation}  onChange={(e) => {this.onChange(e)}}/>
                                <button onClick={(e) => {this.addRelation(e)}}>Добавить</button>
                            </div>
                        </label>
                    </div>
                    <div>
                        {
                            this.state.relationships.map(option =>
                            <div key={option}>
                                <button className="btn" onClick={(e) => {this.deleteRelation(e,option)}}>{option}</button>
                            </div>  )
                        }
                    </div>
                    <div>
                        <button className="btn btn_success">Save</button>
                    </div>

                </form>
            </div>
        </div>;


  }

}

export default withRouter(AddControllerPage);
