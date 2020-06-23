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

class AddControllerPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal_toogle: false,
            table_id: this.props.match.params.id,
            table: {},
            data: {
                description: "",
                table_id: this.props.match.params.id,
                prefix: "",
                namespace: "AltrpControllers",
                path: "",
            },
            
        };
        
        
        this.resource = new Resource({route: '/admin/ajax/tables'});
        this.controller_resource = new Resource({route: '/admin/ajax/tables/'+this.props.match.params.id+'/controller'});
        
        this.onChange = this.onChange.bind(this);
        this.saveController = this.saveController.bind(this);
    }
    
    async componentDidMount(){
        let table_res = await this.resource.get(this.state.table_id)
        this.setState(state=>{
            return{...state, table:table_res};
        });
        
        let controller_res = await this.resource.get(this.state.table_id+"/controller");
        
        if(controller_res) {
             
             let controller = {
                description: controller_res,
                table_id: this.state.table_id,
                prefix: "",
                namespace: "",
                path: "",
            }

            this.setState(state=>{
                return{...state, data: controller};
            }, () => {
                console.log(this.state)
            });
        }
        
    }
    
    onChange(e) {
        let field_name = e.target.name;
        this.setState({ ...this.state, data:{...this.state.data, [field_name]: e.target.value}});
    }
    
    async saveController(e) {
        e.preventDefault();
        
        let headers = {
            'Content-Type': 'application/json'
        };
        
        let data = {
            controller: this.state.data,
            _token: _token
        };
        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers,
        };
        
        
        let res;
        res = await this.controller_resource.post(data);
        
        if(res){
            alert("Success");
        }
        else {
            alert("Error");
        }
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
                            Path
                            <input className='form__input' type="text" name="path" value={this.state.data.path}  onChange={(e) => {this.onChange(e)}}/>
                        </label>
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