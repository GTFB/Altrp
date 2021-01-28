import React, {Component} from "react";
import SendEmail from "./send/SendEmail"
import SendNotice from "./send/SendNotice"

class Send extends Component{
    constructor(props){
        super(props);
    }

    getData = data => {
        if(this.props.data instanceof Array){
            const item = this.props.data.filter(i =>{
                if(i.type === data) return i;
            });
            return item[0];
        }
    }

    render(){
        return <div>
            <SendEmail emailData={this.getData("send_mail")}/>
            <SendNotice noticeData={this.getData("send_notification")}/>
        </div>
    }
}

export default Send;