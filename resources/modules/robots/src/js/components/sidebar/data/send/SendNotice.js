import React, {Component} from "react";
import AltrpSelect from "../../../../../../../admin/src/components/altrp-select/AltrpSelect";


class SendNotice extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const channelsOptions = [
            {label:'broadcast', value: 'broadcast'},
            {label:'telegram', value: 'telegram'},
            {label:'mail', value: 'mail'}
        ];
        const channels = this.props.noticeData?.data?.channels ?? [];

        return <div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Channels</div>
                <AltrpSelect id="send-channels"
                    isMulti={true}
                    value={_.filter(channelsOptions, c => channels.indexOf(c.value) >= 0)}
                    onChange={e => {this.props.changeSelect(e, "channels")}}
                    options={channelsOptions}
                />
            </div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Message</div>
                <input type="email" id="notice-message" name="message" value={this.props.noticeData?.data?.message ?? ''} onChange={(e) => { this.props.onSend(e, "message") }} className="form-control" />
            </div>
        </div>
    }
}

export default SendNotice;