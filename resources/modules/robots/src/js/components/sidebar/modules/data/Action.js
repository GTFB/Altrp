import React, {Component} from "react";
import store from "../../../../store/store";
import Send from "./action/Send"
import Crud from "./action/Crud"
import { setUpdatedNode } from "../../../../store/robot-settings/actions";

export default class Action extends Component{
    constructor(props){
        super(props);
    }

    // Запись значений select в store
    changeSelect(e) {
        const node = this.props.selectNode;
        node.data.props.nodeData.type = e.target.value;
        store.dispatch(setUpdatedNode(node));
    }

    changeSelect = (e) => {
        let node = this.props.selectNode;
        switch(e.target.value){
            case "crud":
              node.data.props.nodeData = {
                "type": "crud",
                "data": {
                    "method": "",
                    "body": {},
                    "record_id": null,
                    "model_id": ""
                }
              };
              break;
            case "send_notification":
              node.data.props.nodeData = {
                "type": "send_notification",
                "data": {
                    "entities": "",
                    "channels": [
                        "broadcast",
                        "telegram",
                        "mail"
                    ],
                    "content": {
                      "broadcast": {
                        "message": ""
                      },
                      "telegram": {
                        "message": ""
                      },
                      "mail": {
                        "subject": "",
                        "message": ""
                      }
                  }
    
                }
              };
              break;
        }
        
        store.dispatch(setUpdatedNode(node));
      }
    

    render(){
        const actionTypeOptions = [
            {label:'Send Notification', value: 'send_notification'},
            {label:'CRUD', value: 'crud'}
        ];      
        const typeData = this.props.selectNode.data?.props?.nodeData?.type ?? '';

        return <div>
            <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label">Type</div>
                <div className="control-container_select-wrapper">
                    <select className="control-select control-field"
                        value={typeData || ''}
                        onChange={e => {this.changeSelect(e)}}
                    >
                        <option disabled value="" />
                        {actionTypeOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                    </select>
                </div>
            </div>

            {(typeData === "send_notification") && <Send
                                                      activeSection={this.props.activeSection}
                                                      toggleChevron={this.props.toggleChevron}
                                                      selectNode={this.props.selectNode || []}
                                                    />}
            {(typeData === "crud") && <Crud
                                         activeSection={this.props.activeSection}
                                         toggleChevron={this.props.toggleChevron}
                                         selectNode={this.props.selectNode || []}
                                      />}

        </div>
    }
}