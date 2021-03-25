import React, {Component} from "react";
import Resource from "../../../../../../../../editor/src/js/classes/Resource";
import SendBroadcast from "./send/SendBroadcast";
import SendEmail from "./send/SendEmail";
import SendTelegram from "./send/SendTelegram";
import store from "../../../../../store/store";
import { setUpdatedNode } from "../../../../../store/robot-settings/actions";
import AltrpSelect from "../../../../../../../../admin/src/components/altrp-select/AltrpSelect";
import Chevron from "../../../../../../../../editor/src/svgs/chevron.svg";


export default class Send extends Component{
    constructor(props){
        super(props);
        this.state = {
            usersOptions: [],
            rolesOptions: [],
            dataSources: []
        };
        this.toggle = this.toggle.bind(this);
        this.onSend = this.onSend.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
        this.usersOptions = new Resource({ route: "/admin/ajax/users_options" });
        this.rolesOptions = new Resource({ route: "/admin/ajax/role_options" });
        this.dataSources = new Resource({ route: "/admin/ajax/data_source_options" });

    }

    async componentDidMount() {
        const usersOptions = await this.usersOptions.getAll();
        const rolesOptions = await this.rolesOptions.getAll();
        const dataSources = await this.dataSources.getAll();
        this.setState(s =>({...s, usersOptions, rolesOptions, dataSources: dataSources?.options ?? []}));
    }

    // Запись значений inputs в store
    onSend = (e, key) => {
        const node = this.props.selectNode;
        node.data.props.nodeData.data.content[key] = e.target.value;
        store.dispatch(setUpdatedNode(node));
    }

      // Изменение положения переключателя
    toggle() {
        const node = this.props.selectNode;
        if(node.data.props.nodeData.data.entities === 'all') node.data.props.nodeData.data.entities = '';
        else node.data.props.nodeData.data.entities = 'all';
        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений select в store
    changeSelect(e, type) {
        const node = this.props.selectNode;
        if(type === "sources") {
          node.data.props.nodeData.data[type] = e ? e.map(item => item.value) : [];
        } else if (type === "channel"){
          node.data.props.nodeData.data[type] = e.target.value;
          switch (e.target.value){
            case 'broadcast':
              node.data.props.nodeData.data.content = {
                "message": ""
              };
              break;
            case 'telegram':
              node.data.props.nodeData.data.content = {
                "message": ""
              };
              break;
            case 'mail':
              node.data.props.nodeData.data.content = {
                "from": "",
                "subject": "",
                "template": ""
              };
              break;
          }
        } else {
            if(!_.isObject(node.data.props.nodeData.data.entities)) node.data.props.nodeData.data.entities = {};
            node.data.props.nodeData.data.entities[type] = e ? e.map(item => item.value) : [];
        }
        store.dispatch(setUpdatedNode(node));
    }

    render(){
        const { usersOptions, rolesOptions, dataSources } = this.state;
        const channelOptions = [
            {label:'push', value: 'broadcast'},
            {label:'telegram', value: 'telegram'},
            {label:'mail', value: 'mail'}
        ];
        const channel = this.props.selectNode?.data?.props?.nodeData?.data?.channel ?? [];
        const users = this.props.selectNode?.data?.props?.nodeData?.data?.entities?.users ?? [];
        const roles = this.props.selectNode?.data?.props?.nodeData?.data?.entities?.roles ?? [];
        const sources = this.props.selectNode?.data?.props?.nodeData?.data?.sources ?? [];
        const content = this.props.selectNode?.data?.props?.nodeData?.data?.content ?? {};

        let value = (this.props.selectNode?.data?.props?.nodeData?.data?.entities === "all") ?? false;
        let switcherClasses = `control-switcher control-switcher_${value ? 'on' : 'off'}`;

        return <div>
            <div>
            <div className={"settings-section "}>
            <div className="settings-section__title d-flex">
                <div className="settings-section__icon d-flex">
                  <Chevron />
                </div>
                <div className="settings-section__label">Settings Send Notification</div>
            </div>
            <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
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
                    <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                        <div className="controller-container__label control-select__label controller-label">Users</div>
                        <AltrpSelect className="control-container_select2-wrapper controller-field"
                            id="send-users"
                            isMulti={true}
                            value={_.filter(usersOptions, u => users.indexOf(u.value) >= 0)}
                            onChange={e => {this.changeSelect(e, "users")}}
                            options={usersOptions}
                        />
                    </div>
                    <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                        <div className="controller-container__label control-select__label controller-label">Roles</div>
                        <AltrpSelect id="send-roles"
                            className="controller-field"
                            isMulti={true}
                            value={_.filter(rolesOptions, r => roles.indexOf(r.value) >= 0)}
                            onChange={e => {this.changeSelect(e, "roles")}}
                            options={rolesOptions}
                        />
                    </div>
                </div>}
                <div className="controller-container controller-container_select2" style={{fontSize: '13px'}}>
                  <div className="controller-container__label control-select__label controller-label">Sources</div>
                  <AltrpSelect id="send-sources"
                               className="controller-field"
                               isMulti={true}
                               value={_.filter(dataSources, s => sources.indexOf(s.value) >= 0)}
                               onChange={e => {this.changeSelect(e, "sources")}}
                               options={dataSources}
                  />
                </div>

                <div className="controller-container controller-container_select">
                  <div className="controller-container__label control-select__label controller-label">Type</div>
                  <div className="control-container_select-wrapper controller-field">
                    <select className="control-select control-field"
                            id={`type-message`}
                            value={channel ?? ''}
                            onChange={e => {this.changeSelect(e, 'channel')}}
                    >
                      <option disabled value="" />
                      {channelOptions.map(option => {
                        return  <option value={option.value} key={option.value || 'null'} >
                          {option.label}
                        </option> })}
                    </select>
                  </div>
                </div>
            </div>
          </div>

            </div>

            {(channel === "broadcast") && <SendBroadcast activeSection={this.props.activeSection} toggleChevron={this.props.toggleChevron} onSend={this.onSend} content={content}/>}
            {(channel === "telegram") && <SendTelegram activeSection={this.props.activeSection} toggleChevron={this.props.toggleChevron} onSend={this.onSend} content={content}/>}
            {(channel === "mail") && <SendEmail activeSection={this.props.activeSection} toggleChevron={this.props.toggleChevron} onSend={this.onSend} content={content}/>}
        </div>
    }
}
