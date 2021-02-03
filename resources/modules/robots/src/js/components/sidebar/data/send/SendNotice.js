import React, {Component} from "react";

class SendNotice extends Component{
    constructor(props){
        super(props);
    }

    render(){

        return <div>
            <div className="controller-container__label">Notifications:</div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">To</div>
                <input type="email" id="notice-users" name="users" value={this.props.noticeData?.data?.users ?? ''} onChange={(e) => { this.props.onSendNotice(e, "users") }} className="form-control" />
            </div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Message</div>
                <input type="email" id="notice-message" name="message" value={this.props.noticeData?.data?.message ?? ''} onChange={(e) => { this.props.onSendNotice(e, "message") }} className="form-control" />
            </div>
        </div>
    }
}

export default SendNotice;