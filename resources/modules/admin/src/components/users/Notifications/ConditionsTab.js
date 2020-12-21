import React, {Component} from "react";
import Compare from "./Compare";


export default class ConditionsTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            conditions: this.props.value || [],
        };
        this.onSaveCondition = this.onSaveCondition.bind(this);
    }

    onSaveCondition(){

    }

    render(){
        // console.log(this.state.conditions);

        return <div className="admin-notice-condition-box">
            <button className="btn btn_save" onClick={() => this.onSaveCondition()}>
                Save and Add New Condition
            </button>
            <ul>
                <li></li>
            </ul>
            <Compare/>
        </div>
    }
}