import React, {Component} from "react";

export default class Compare extends Component{
    constructor(props){
        super(props);        
        this.state = {
            compares: this.props.value,
        };
    }

    render(){
        return <div>
            Compare
        </div>
    }
}