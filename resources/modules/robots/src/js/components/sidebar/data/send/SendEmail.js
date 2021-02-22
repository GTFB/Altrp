import React, { Component } from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";


class SendEmail extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div className="settings-section-box">
            <div className={"settings-section " + (this.props.activeSection === "mail" ? '' : 'open')}>
                <div className="settings-section__title d-flex" onClick={this.props.toggleChevron("mail")}>
                    <div className="settings-section__icon d-flex">
                        <Chevron />
                    </div>
                    <div className="settings-section__label">Mail</div>
                </div>
            </div>

            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Subject</div>
                <input type="text" id="email-subject" name="subject" value={this.props.content.subject ?? ''} onChange={(e) => { this.props.onSend(e, "mail", "subject") }} className="form-control" />
            </div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Message</div>
                <input type="text" id="email-message" name="message" value={this.props.content.message ?? ''} onChange={(e) => { this.props.onSend(e, "mail", "message") }} className="form-control" />
            </div>
        </div>
    }
}

export default SendEmail;