import React, {Component} from "react";
import { setRobotEmailTo, setRobotEmailMSG } from "../../../../store/robot-settings/actions";
import store from "../../../../store/store";


class SendEmail extends Component{
    constructor(props){
        super(props);
    }

    // Запись значения inputs в store
    changeInput = (e, type) => {
        let value = e.target.value;

        switch(type){
            case 'to':
                store.dispatch(setRobotEmailTo(value));
                break;
            case 'message':
                store.dispatch(setRobotEmailMSG(value));
                break;
        }        
    }    
    

    render(){
        return <div>
            <div className="controller-container__label">Email:</div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">To</div>
                <input type="email" id="to" name="to" value={this.props.emailData?.data?.to ?? ''} onChange={(e) => { this.changeInput(e, "to") }} className="form-control" />
            </div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Message</div>
                <input type="email" id="to" name="to" value={this.props.emailData?.data?.message ?? ''} onChange={(e) => { this.changeInput(e, "message") }} className="form-control" />
            </div>
        </div>
    }
}

export default SendEmail;