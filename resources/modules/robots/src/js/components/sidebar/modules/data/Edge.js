import React, {Component} from "react";
import store from "../../../../store/store";
import { setUpdatedNode } from "../../../../store/robot-settings/actions";
import Resource from "../../../../../../../editor/src/js/classes/Resource";

export default class Edge extends Component{
    constructor(props){
        super(props);
        this.state={
            robotOptions: []
        }
        this.toggle = this.toggle.bind(this);

        this.robotOptionsResource = new Resource({ route: "/admin/ajax/robots_options" });
    }

    async componentDidMount() {
        const robotOptions = await this.robotOptionsResource.getAll();
        this.setState(s =>({...s, robotOptions}));    
    }

    toggle() {
        const node = this.props.selectEdge;
        console.log(node.animated);
        
        if(node.animated === undefined) node.animated = false;
        
        node.animated = !node.animated;
        console.log(node.animated);
    
        store.dispatch(setUpdatedNode(node));
    }

    changeInput(e){
        const value = e.target.value;
        const node = this.props.selectEdge;
        console.log(node.data);
        if(!node.data) node.data = {};
        node.data.text = value;
        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений select в store
    changeSelect(e) {
        let node = this.props.selectEdge;
        node.type = e.target.value;
        store.dispatch(setUpdatedNode(node));
    }

    render(){
        const edge = this.props.selectEdge?.type ?? '';
        const edgeTypeOptions = [
            {label:'default', value: 'default'},
            {label:'straight', value: 'straight'},
            {label:'step', value: 'step'},
            {label:'smoothstep', value: 'smoothstep'},
            {label:'custom', value: 'custom'}
        ];

        let value = (this.props.selectEdge?.animated === true) ?? false;
        let switcherClasses = `control-switcher control-switcher_${value ? 'on' : 'off'}`;
      
        return <div>
            <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label">Start condition</div>
                <div className="control-container_select-wrapper">
                <select className="control-select control-field"
                    value={edge || ''}
                    onChange={e => {this.changeSelect(e)}}
                >
                    <option disabled value="" />
                    {edgeTypeOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                </select>
                </div>
            </div>
            <div className="robot_switcher">
                <div className="robot_switcher__label">
                    Animated
                </div>
                <div className={switcherClasses} onClick={this.toggle}>
                    <div className="control-switcher__on-text">ON</div>
                    <div className="control-switcher__caret" />
                    <div className="control-switcher__off-text">OFF</div>
                </div>
            </div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label textcontroller-responsive">Text</div>
                <input
                    className="control-field"
                    type="text"
                    onChange={(e) => { this.changeInput(e) }}
                    value={ this.props.selectEdge?.data?.text ?? '' }
                ></input>
            </div>
        </div>
    }
}