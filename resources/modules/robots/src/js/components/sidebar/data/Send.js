import React, {Component} from "react";
import SendEmail from "./send/SendEmail";
import SendNotice from "./send/SendNotice";
import store from "../../../store/store";
import { setUpdatedNode } from "../../../store/robot-settings/actions";


class Send extends Component{
    constructor(props){
        super(props);
    }

    getData = data => {
        const nodeData = this.props.selected?.data.props.nodeData ?? [];
        if(nodeData instanceof Array){
            const item = nodeData.filter(i =>{
                if(i.type === data) return i;
            });
            return item[0];
        }
    }

    // Запись значений inputs в store
    onSendMail = (e, type) => {
        let value = e.target.value;
        const node = this.props.selected;

        node.data.props.nodeData.map( item => {
            if(item.type === "send_mail") item.data[type] = value;
            return item;
        });

        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений inputs в store
    onSendNotice = (e, type) => {
        let value = e.target.value;
        const node = this.props.selected;

        node.data.props.nodeData.map( item => {
            if(item.type === "send_notice") item.data[type] = value;
            return item;
        });

        store.dispatch(setUpdatedNode(node));
    }

      // Изменение положения переключателя
    toggle() {
        const node = this.props.selected;
        node.data.props.nodeData.map( item => {
            if(item.type === "send_notice") item.data[type] = value;
            return item;
        });


        // let checked = store.getState().websocketStore?.enabled ? 0 : 1 ;
        // this.submitHandler(checked);
    }


    render(){
        return <div>
            {(this.props.selected?.nodeData.type === "send_mail") && <SendEmail toggle={this.toggle} onSendMail={this.onSendMail} emailData={this.getData("send_mail")}/>}
            {(this.props.selected?.nodeData.type === "send_notification") && <SendNotice toggle={this.toggle} onSendNotice={this.onSendNotice} noticeData={this.getData("send_notice")}/>}
        </div>
    }
}

export default Send;