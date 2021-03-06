import React, {Component} from "react";
import Resource from "../../../../../../editor/src/js/classes/Resource";
import SendBroadcast from "./send/SendBroadcast";
import SendEmail from "./send/SendEmail";
import SendTelegram from "./send/SendTelegram";
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
        this.onSend = this.onSend.bind(this);
        this.changeSelect = this.changeSelect.bind(this);

        this.usersOptions = new Resource({ route: "/admin/ajax/users_options" });
        this.rolesOptions = new Resource({ route: "/admin/ajax/role_options" });

    }

    async componentDidMount() {
        const usersOptions = await this.usersOptions.getAll();
        const rolesOptions = await this.rolesOptions.getAll();
        this.setState(s =>({...s, usersOptions, rolesOptions}));
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

    getTypeSend = data => {
        const channels = this.props.selected?.data.props.nodeData?.data?.channels ?? [];
        let result = false;
        if(channels instanceof Array){
            channels.map(item =>{
                if(item === data) result = true;
            });
        }
        return result;
    }

    // Запись значений inputs в store
    onSend = (e, type, key) => {
        let value = e.target.value;
        const node = this.props.selected;
        node.data.props.nodeData.data.content[type][key] = value;
        store.dispatch(setUpdatedNode(node));
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
        if(type === "channels"){
            node.data.props.nodeData.data[type] = e ? e.map(item => item.value) : [];
        } else {
            if(!_.isObject(node.data.props.nodeData.data.entities)) node.data.props.nodeData.data.entities = {};
            node.data.props.nodeData.data.entities[type] = e ? e.map(item => item.value) : [];
        }
        store.dispatch(setUpdatedNode(node));
    }


    render(){
        const { usersOptions, rolesOptions } = this.state;
        const channelsOptions = [
            {label:'broadcast', value: 'broadcast'},
            {label:'telegram', value: 'telegram'},
            {label:'mail', value: 'mail'}
        ];
        const channels = this.props.selected?.data?.props?.nodeData?.data?.channels ?? [];
        const users = this.props.selected?.data?.props?.nodeData?.data?.entities?.users ?? [];
        const roles = this.props.selected?.data?.props?.nodeData?.data?.entities?.roles ?? [];
        let value = (this.props.selected?.data?.props?.nodeData?.data?.entities === "all") ?? false;
        let switcherClasses = `control-switcher control-switcher_${value ? 'on' : 'off'}`;

        return <div>
            <div>
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
                {!value && <div className="settings-section-box">
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
                </div>}
                <div className="controller-container controller-container_textarea">
                    <div className="controller-container__label">Channels</div>
                    <AltrpSelect id="send-channels"
                        isMulti={true}
                        value={_.filter(channelsOptions, c => channels.indexOf(c.value) >= 0)}
                        onChange={e => {this.changeSelect(e, "channels")}}
                        options={channelsOptions}
                    />
                </div>
            </div>            
            
            {this.getTypeSend("broadcast") && <SendBroadcast activeSection={this.props.activeSection} toggleChevron={this.props.toggleChevron} onSend={this.onSend} content={this.props.selected?.data?.props?.nodeData?.data?.content?.broadcast ?? ''}/>}
            {this.getTypeSend("mail") && <SendEmail activeSection={this.props.activeSection} toggleChevron={this.props.toggleChevron} onSend={this.onSend} content={this.props.selected?.data?.props?.nodeData?.data?.content?.mail ?? ''}/>}
            {this.getTypeSend("telegram") && <SendTelegram activeSection={this.props.activeSection} toggleChevron={this.props.toggleChevron} onSend={this.onSend} content={this.props.selected?.data?.props?.nodeData?.data?.content?.telegram ?? ''}/>}
        </div>
    }
}

export default Send;