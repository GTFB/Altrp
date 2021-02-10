import React, { Component } from "react";
import AltrpSelect from "../../../../../../../admin/src/components/altrp-select/AltrpSelect";


class SendEmail extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Subject</div>
                <input type="email" id="email-subject" name="subject" value={this.props.emailData?.data?.subject ?? ''} onChange={(e) => { this.props.onSend(e, "subject") }} className="form-control" />
            </div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Message</div>
                <input type="email" id="email-message" name="message" value={this.props.emailData?.data?.message ?? ''} onChange={(e) => { this.props.onSend(e, "message") }} className="form-control" />
            </div>
        </div>
    }
}

export default SendEmail;