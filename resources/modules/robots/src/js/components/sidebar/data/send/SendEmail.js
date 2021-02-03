import React, { Component } from "react";

class SendEmail extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
            <div className="controller-container__label">Email:</div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">To</div>
                <input type="email" id="email-users" name="users" value={this.props.emailData?.data?.users ?? ''} onChange={(e) => { this.props.onSendMail(e, "users") }} className="form-control" />
            </div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Subject</div>
                <input type="email" id="email-subject" name="subject" value={this.props.emailData?.data?.subject ?? ''} onChange={(e) => { this.props.onSendMail(e, "subject") }} className="form-control" />
            </div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Message</div>
                <input type="email" id="email-message" name="message" value={this.props.emailData?.data?.message ?? ''} onChange={(e) => { this.props.onSendMail(e, "message") }} className="form-control" />
            </div>
        </div>
    }
}

export default SendEmail;