import React, {Component} from "react";
import Chevron from "../../../../../../../../../editor/src/svgs/chevron.svg";


class SendTelegram extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div className="settings-section-box">
            <div className={"settings-section " + (this.props.activeSection === "telegram" ? '' : 'open')}>
                <div className="settings-section__title d-flex" onClick={this.props.toggleChevron("telegram")}>
                    <div className="settings-section__icon d-flex">
                        <Chevron />
                    </div>
                    <div className="settings-section__label">Telegram</div>
                </div>
            </div>

            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label textcontroller-responsive">Message</div>
                <input className="control-field" type="text" id="telegram-message" name="message" value={this.props.content.message ?? ''} onChange={(e) => { this.props.onSend(e, "telegram", "message") }}/>
            </div>
        </div>
    }
}

export default SendTelegram;