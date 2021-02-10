import React, {Component} from "react";
import Resource from "../../../../../../editor/src/js/classes/Resource";
import SendEmail from "./send/SendEmail";
import SendNotice from "./send/SendNotice";
import store from "../../../store/store";
import { setUpdatedNode } from "../../../store/robot-settings/actions";
import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";



class Send extends Component{
    constructor(props){
        super(props);
        this.state = {
            usersOptions: [],
            rolesOptions: []
        };
        this.toggle = this.toggle.bind(this);

        this.usersOptions = new Resource({ route: "/admin/ajax/users_options" });
        this.rolesOptions = new Resource({ route: "/admin/ajax/role_options" });

    }

    async componentDidMount() {
        const usersOptions = await this.usersOptions.getAll();
        const rolesOptions = await this.rolesOptions.getAll();
        this.setState(s =>({...s, usersOptions, rolesOptions}));
    }
    

    // getData = data => {
    //     const nodeData = this.props.selected?.data.props.nodeData ?? [];
    //     if(nodeData instanceof Array){
    //         const item = nodeData.filter(i =>{
    //             if(i.type === data) return i;
    //         });
    //         return item[0];
    //     }
    // }

    // Запись значений inputs в store
    onSendMail = (e, type) => {
        let value = e.target.value;
        const node = this.props.selected;

        // node.data.props.nodeData.map( item => {
        //     if(item.type === "send_mail") item.data[type] = value;
        //     return item;
        // });

        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений inputs в store
    onSendNotice = (e, type) => {
        let value = e.target.value;
        const node = this.props.selected;


        // node.data.props.nodeData.map( item => {
        //     if(item.type === "send_notification") item.data[type] = value;
        //     return item;
        // });

        // store.dispatch(setUpdatedNode(node));
    }

      // Изменение положения переключателя
    toggle() {
        const node = this.props.selected;

        if(node.data.props.nodeData.data.entities === 'all') node.data.props.nodeData.data.entities = '';
        else node.data.props.nodeData.data.entities = 'all';

        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений select в store
    changeSelect(e, type) {
        const node = this.props.selected;
        if(!_.isObject(node.data.props.nodeData.data.entities)) node.data.props.nodeData.data.entities = {};
        node.data.props.nodeData.data.entities[type] = e ? e.map(item => item.value) : [];
        store.dispatch(setUpdatedNode(node));
    }


    render(){
        const { usersOptions, rolesOptions } = this.state;
        const users = this.props.selected?.data?.props?.nodeData?.data?.entities?.users ?? [];
        const roles = this.props.selected?.data?.props?.nodeData?.data?.entities?.roles ?? [];
        const typeAction =  this.props.selected?.data?.props?.nodeData?.type ?? '';
        let value = (this.props.selected?.data?.props?.nodeData?.data?.entities === "all") ?? false;
        let switcherClasses = `control-switcher control-switcher_${value ? 'on' : 'off'}`;

        return <div>
            {(typeAction === "send_mail" || typeAction === "send_notification") && <div>
                <div className="robot_switcher">
                    <div className="robot_switcher__label">
                        All
                    </div>
                    <div className={switcherClasses} onClick={this.toggle}>
                        <div className="control-switcher__on-text">ON</div>
                        <div className="control-switcher__caret" />
                        <div className="control-switcher__off-text">OFF</div>
                    </div>
                </div>
                {!value && <div>
                    <div className="controller-container controller-container_textarea">
                        <div className="controller-container__label">Users</div>
                        <AltrpSelect id="send-users"
                            isMulti={true}
                            value={_.filter(usersOptions, u => users.indexOf(u.value) >= 0)}
                            onChange={e => {this.changeSelect(e, "users")}}
                            options={usersOptions}
                        />
                    </div>
                    <div className="controller-container controller-container_textarea">
                        <div className="controller-container__label">Roles</div>
                        <AltrpSelect id="send-roles"
                            isMulti={true}
                            value={_.filter(rolesOptions, r => roles.indexOf(r.value) >= 0)}
                            onChange={e => {this.changeSelect(e, "roles")}}
                            options={rolesOptions}
                        />
                    </div>
                </div>
                }
            </div>            
            }
            {/* {(typeAction === "send_mail") && <SendEmail onSendMail={this.onSendMail} emailData={this.getData("send_mail")}/>} */}
            {/* {(typeAction === "send_notification") && <SendNotice onSendNotice={this.onSendNotice} noticeData={this.getData("send_notification")}/>} */}
        </div>
    }
}

export default Send;