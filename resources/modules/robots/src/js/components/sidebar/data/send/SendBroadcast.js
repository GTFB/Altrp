import React, {Component} from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";


class SendBroadcast extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div className="settings-section-box">
            <div className={"settings-section " + (this.props.activeSection === "broadcast" ? '' : 'open')}>
                <div className="settings-section__title d-flex" onClick={this.props.toggleChevron("broadcast")}>
                    <div className="settings-section__icon d-flex">
                        <Chevron />
                    </div>
                    <div className="settings-section__label">Broadcast</div>
                </div>
            </div>

            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Message</div>
                <input type="text" id="broadcast-message" name="message" value={this.props.content.message ?? ''} onChange={(e) => { this.props.onSend(e, "broadcast", "message") }} className="form-control" />
            </div>
        </div>
    }
}

export default SendBroadcast;