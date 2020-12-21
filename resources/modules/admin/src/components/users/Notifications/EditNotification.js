import React, {Component} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import ConditionsTab from "./ConditionsTab";
import DataTab from "./DataTab";
import SendToTab from "./SendToTab";
import {withRouter} from 'react-router-dom';
import './admin-notifications.scss';

class EditNotification extends Component{
    constructor(props){
        super(props);        
        this.state = {
            user_id: this.props.match.params.id ?? 1,
            activeTab: parseInt(window.location.hash[1]) || 0,
            value: {
                name: 'New Settings',
                dataSource: [
                    123,
                    321,
                ],
                noticed_id: 123,
                conditions:[
                    {
                        name: 'condition 1',
                        type: 'any',
                        enabled: true,
                        compares:[
                        {
                            enabled: true,
                            field_name: 'title',
                            operator: '<>',
                            value: 'TEST!'
                        }
                        ]
                    }
                ]
                },
            newValue: {}
        };
        this.switchTab = this.switchTab.bind(this);
        this.onSave = this.onSave.bind(this);
       
    }

    switchTab(activeTab){
        window.location.hash = activeTab + '';
        this.setState(s=>{return{ ...s, activeTab }})
    }

    onSave(e){
    }    

    render(){
        return <div>
                    <Tabs selectedIndex={this.state.activeTab} onSelect={this.switchTab} >
                        <TabList className="nav nav-pills admin-pills">
                            <Tab> Conditions </Tab>
                            <Tab> Data </Tab>
                            <Tab> Send to </Tab>
                        </TabList>
                        <TabPanel>
                            <ConditionsTab value={this.state.value.conditions || []} onSave={this.onSave}/>
                        </TabPanel>
                        <TabPanel>
                            <DataTab/>
                        </TabPanel>
                        <TabPanel>
                            <SendToTab/>
                        </TabPanel>
                    </Tabs>

        </div>
    }
}

export default withRouter(EditNotification);
