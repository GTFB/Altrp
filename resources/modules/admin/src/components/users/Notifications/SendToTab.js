import React, {Component} from "react";

export default class SendToTab extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }


    render(){
        const send = this.props.send ?? [];

        return <div>
            <div className="send-checkbox-box">
                <input
                    type="checkbox"                    
                    id="front_checkbox"
                    checked={send?.front?.enabled}
                    onChange={e => this.props.changeBox(e, 'front')}
                ></input>
                <label htmlFor="front_checkbox" >Front</label>
                <input
                    type="checkbox"                    
                    id="telegram_checkbox"
                    checked={send?.telegram?.enabled}
                    onChange={e => this.props.changeBox(e, 'telegram')}
                ></input>
                <label htmlFor="telegram_checkbox" >Telegram</label>
                <input
                    type="checkbox"                    
                    id="email_checkbox"
                    checked={send?.email?.enabled}
                    onChange={e => this.props.changeBox(e, 'email')}
                ></input>
                <label htmlFor="email_checkbox" >Email</label>
            </div>

            <div className="btn-box">
                <button className="btn btn_save" onClick={() => this.props.onSaveSend('save')}>
                    Save
                </button>
            </div>
        </div>
    }
}