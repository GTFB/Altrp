import React, {Component} from "react";
import Resource from "../../../../../../../../../editor/src/js/classes/Resource";
import SendBroadcast from "./send/SendBroadcast";
import SendEmail from "./send/SendEmail";
import SendTelegram from "./send/SendTelegram";
import store from "../../../../../../store/store";
import { setUpdatedNode } from "../../../../../../store/customizer-settings/actions";
import AltrpSelect from "../../../../../../../../../admin/src/components/altrp-select/AltrpSelect";
import Chevron from "../../../../../../../../../editor/src/svgs/chevron.svg";


export default class Send extends Component{
    constructor(props){
        super(props);
        this.state = {
            usersOptions: [],
            rolesOptions: [],
            customizerOptions: []
        };
        this.onSend = this.onSend.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.usersOptions = new Resource({ route: "/admin/ajax/users_options" });
        this.customizerOptionsResource = new Resource({ route: "/admin/ajax/customizers_options" });
        this.rolesOptions = new Resource({ route: "/admin/ajax/role_options" });
    }

    async componentDidMount() {
        const usersOptions = await this.usersOptions.getAll();
        const rolesOptions = await this.rolesOptions.getAll();
        const customizerOptions = await this.customizerOptionsResource.getAll();
        this.setState(s =>({...s, usersOptions, rolesOptions, customizerOptions}));


    }

    // Запись значений inputs в store
    onSend = (e, key) => {
        const node = this.props.selectNode;
        node.data.props.nodeData.data.content[key] = e.target.value;
        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений select в store
    changeSelect(e, type) {
        const node = this.props.selectNode;
        if (type === "channel"){
          node.data.props.nodeData.data[type] = e.target.value;
          switch (e.target.value){
            case 'broadcast':
              node.data.props.nodeData.data.content = {
                "message": ""
              };
              break;
            case 'telegram':
              node.data.props.nodeData.data.content = [];
              break;
            case 'mail':
              node.data.props.nodeData.data.content = {
                "from": "",
                "subject": "",
                "template": ""
              };
              break;
          }
        } else if (type === "entities") {
            node.data.props.nodeData.data.entities = e.target.value;
            switch (e.target.value){
              case 'all':
                node.data.props.nodeData.data.entitiesData.roles = [];
                node.data.props.nodeData.data.entitiesData.users = [];
                node.data.props.nodeData.data.entitiesData.dynamicValue = '';
                break;
              case 'dynamic':
                node.data.props.nodeData.data.entitiesData.roles = [];
                node.data.props.nodeData.data.entitiesData.users = [];
                break;
              case 'specific':
                node.data.props.nodeData.data.entitiesData.dynamicValue = '';
                break;
            }

        } else {
          node.data.props.nodeData.data.entitiesData[type] = e ? e.map(item => item.value) : [];
        }
        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений input в store
    changeInput(e) {
      const node = this.props.selectNode;
      node.data.props.nodeData.data.entitiesData.dynamicValue = e.target.value;
      store.dispatch(setUpdatedNode(node));
    }

    render(){
        const { usersOptions, rolesOptions } = this.state;
        const entitiesOptions = [
            {label:'all', value: 'all'},
            {label:'dynamic user', value: 'dynamic'},
            {label:'specific users', value: 'specific'}
        ];
        const channelOptions = [
          {label:'push', value: 'broadcast'},
          {label:'telegram', value: 'telegram'},
          {label:'mail', value: 'mail'}
        ];

        const entities = this.props.selectNode?.data?.props?.nodeData?.data?.entities ?? '';
        const channel = this.props.selectNode?.data?.props?.nodeData?.data?.channel ?? '';
        const dynamicValue = this.props.selectNode?.data?.props?.nodeData?.data?.entitiesData?.dynamicValue ?? '';
        const users = this.props.selectNode?.data?.props?.nodeData?.data?.entitiesData?.users ?? [];
        const roles = this.props.selectNode?.data?.props?.nodeData?.data?.entitiesData?.roles ?? [];
        const content = this.props.selectNode?.data?.props?.nodeData?.data?.content ?? {};
        return <div>
          <div>
            <div className={"settings-section "}>
            <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("send")}>
                <div className="settings-section__icon d-flex">
                  <Chevron />
                </div>
                <div className="settings-section__label">Settings Send Notification</div>
            </div>
            <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
                <div className="controller-container controller-container_select">
                  <div className="controller-container__label control-select__label controller-label">To</div>
                  <div className="control-container_select-wrapper controller-field">
                    <select className="control-select control-field"
                            id={`type-message`}
                            value={entities ?? ''}
                            onChange={e => {this.changeSelect(e, "entities")}}
                    >
                      <option disabled value="" />
                      {entitiesOptions.map(option => {
                        return  <option value={option.value} key={option.value || 'null'} >
                          {option.label}
                        </option> })}
                    </select>
                  </div>
                </div>

                {(entities === 'dynamic') && <div className="settings-section-box">
                    <div className="controller-container controller-container_textarea">
                      <div className="controller-container__label textcontroller-responsive controller-label">Dynamic value</div>
                      <div className='controller-field'>
                        <input
                          className="control-field"
                          type="text"
                          id="send-dynamic"
                          name="dynamic-user"
                          style={{width: '100%'}}
                          value={dynamicValue ?? ''}
                          onChange={(e) => { this.changeInput(e) }}
                        />
                      </div>
                    </div>
                </div>}
                {(entities === 'specific') && <div className="settings-section-box">
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

            {(channel === "broadcast") && <SendBroadcast
              activeSection={this.props.activeSection}
              toggleChevron={this.props.toggleChevron}
              onSend={this.onSend}
              content={content}
            />}
            {(channel === "telegram") && <SendTelegram
              activeSection={this.props.activeSection}
              toggleChevron={this.props.toggleChevron}
              selectNode={this.props.selectNode || []}
              customizerOptions={this.state.customizerOptions}
              content={content}
            />}
            {(channel === "mail") && <SendEmail
              activeSection={this.props.activeSection}
              toggleChevron={this.props.toggleChevron}
              onSend={this.onSend}
              content={content}
            />}
        </div>
    }
}
