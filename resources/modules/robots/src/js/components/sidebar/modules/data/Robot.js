import React, {Component} from "react";
import store from "../../../../store/store";
import { setUpdatedNode } from "../../../../store/robot-settings/actions";
import Resource from "../../../../../../../editor/src/js/classes/Resource";

export default class Robot extends Component{
    constructor(props){
        super(props);
        this.state={
            robotOptions: []
        }
        this.robotOptionsResource = new Resource({ route: "/admin/ajax/robots_options" });
    }

    async componentDidMount() {
        const robotOptions = await this.robotOptionsResource.getAll();
        this.setState(s =>({...s, robotOptions}));    
    }


    // Запись значений select в store
    changeSelect(e) {
        let node = this.props.selectNode;
        node.data.props.nodeData.id = e.target.value;
        store.dispatch(setUpdatedNode(node));
    }

    render(){
        const robot = this.props.selectNode.data?.props?.nodeData?.id ?? '';
        const {robotOptions} = this.state;

        return <div>
            <div className="controller-container controller-container_select fl-column">
                <div className="controller-container__label control-select__label">Start condition</div>
                <div className="control-container_select-wrapper">
                <select className="control-select control-field"
                    value={robot || ''}
                    onChange={e => {this.changeSelect(e)}}
                >
                    <option disabled value="" />
                    {robotOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                </select>
                </div>
            </div>
        </div>
    }
}