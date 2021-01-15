import React, {Component} from "react";

export default class DataTab extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        const data = this.props.data ?? [];
        console.log(data);


        return <div>
            <div className="btn-box">
                <button className="btn btn_save" onClick={() => this.props.onSaveData('save')}>
                    Save
                </button>
            </div>
        </div>
    }
}