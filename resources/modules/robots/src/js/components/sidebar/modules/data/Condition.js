import React, {Component} from "react";
import store from "../../../../store/store";
import { setUpdatedNode } from "../../../../store/robot-settings/actions";
import {CONDITIONS_OPTIONS} from "../../../../../../../front-app/src/js/helpers";
import {iconsManager} from "../../../../../../../editor/src/js/helpers";
import ModelField from "./condition/ModelField";

export default class Condition extends Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.changeInput = this.changeInput.bind(this);
    }


    // Запись значений select в store
    changeSelect(e, id, type = false) {
        const value = e.target.value;
        const node = this.props.selectNode;
        console.log(type);
        if(type === "operator"){
            node.data.props.nodeData.operator = value;
        } else {
            node.data.props.nodeData.body.map(item => {
                if(item.id === id) {
                    if (type === "model_field") item.operands[0] = e.target.label;
                    else item.operator = value;
                }  
                return item;
            })
        }
        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений select в store
    changeSelectType(e) {
        const node = this.props.selectNode;
        console.log(e.target.value);
        switch (e.target.value){
            case "model_field":
                node.data.props.nodeData = {
                  "type": "model_field",
                  "body": [],
                };
                break;
        }
        store.dispatch(setUpdatedNode(node));
    }

    // Запись значений select в store
    changeInput(e, id, key) {
        const node = this.props.selectNode;

        node.data.props.nodeData.body.map(item =>{
            if(item.id === id) item.operands[key] = e.target.value;
            return item;
        });
        store.dispatch(setUpdatedNode(node));
    }

    getNewCompare(){
        return {
            id: new Date().getTime(),
            "operator": "==",
            "operands":[]
        };
    }

    getCompares(){
        return this.props.selectNode?.data?.props?.nodeData?.body ?? [];
    }

    onCreate(){
        const node = this.props.selectNode;
        if(_.isArray(node.data.props.nodeData.body)) node.data.props.nodeData.body.push(this.getNewCompare());
        store.dispatch(setUpdatedNode(node));
    }

    onDelete(item){
        const compares = this.getCompares();
        const newCompares = compares.filter(i => i.id !== item.id);
        const node = this.props.selectNode;
        node.data.props.nodeData.body = newCompares;
        store.dispatch(setUpdatedNode(node));
    }

    render(){
        const bitOptions = CONDITIONS_OPTIONS;
        const logicOptions = [
            {label:'AND', value: 'AND'},
            {label:'OR', value: 'OR'},
        ];
        const logic = this.props.selectNode?.data?.props?.nodeData?.operator ?? '';
        const typeCondition = this.props.selectNode?.data?.props?.nodeData?.type ?? '';
        console.log(typeCondition);
        console.log(this.state.fieldOptions);
        const compares = this.getCompares();
        const conditionTypeOptions = [
            {label:'Model Field', value: 'model_field'},
        ];
        const typeData = this.props.selectNode.data?.props?.nodeData?.type ?? '';
        console.log(typeData);      

        return <div>
            <div className="controller-container controller-container_select fl-column" >
                <div className="controller-container__label control-select__label">Type</div>
                <div className="control-container_select-wrapper">
                    <select className="control-select control-field"
                        value={typeData || ''}
                        onChange={e => {this.changeSelectType(e)}}
                    >
                        <option disabled value="" />
                        {conditionTypeOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                    </select>
                </div>
            </div>
            <div className="controller-container controller-container_select fl-column">
                <div className="controller-container__label control-select__label">Operator</div>
                <div className="control-container_select-wrapper">
                    <select className="control-select control-field"
                        value={logic || ''}
                        onChange={e => {this.changeSelect(e, false, "operator")}}
                    >
                        <option disabled value="" />
                        {logicOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                    </select>
                </div>
            </div>
            <div className="controller-container controller-container_repeater repeater">                
                <div className="control-header">                    
                    <div className="controller-container__label mt-10">
                        Compares
                    </div>
                </div>
                <div className="repeater-fields">
                    {compares.map( (item, index) =>{ 
                        return <div className="repeater-item repeater-item_open" key={index}>
                            <div className="repeater-item-tools">
                                <div className="repeater-item__caption">
                                    Compare #1
                                </div>
                                <button className="repeater-item__icon" onClick={() => this.onDelete(item)}>
                                    {iconsManager().renderIcon('times')}
                                </button>
                            </div>
                            <div className="repeater-item-content">
                                {typeCondition === "model_field" && <ModelField
                                                                    item={item}
                                                                    robot={this.props.robot}
                                                                    selectNode={this.props.selectNode}
                                                                />
                                }
                                <div className="controller-container controller-container_select ">
                                    <div className="controller-container__label control-select__label compares-fields" >Operator</div>
                                    <div className="control-container_select-wrapper compares-fields">
                                        <select className="control-select control-field"
                                            value={item.operator || ''}
                                            onChange={e => {this.changeSelect(e, item.id)}}
                                        >
                                            <option disabled value="" />
                                            {bitOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                                        </select>
                                    </div>
                                </div>
                                <div className="controller-container controller-container_textarea">
                                    <div className="controller-container__label control-select__label compares-fields">
                                        Value
                                    </div>
                                    <div className="control-group compares-fields" style={{width: '50%', minWidth: 'unset'}}>
                                        <input  className="control-field" type="text" id={`operand-2_${item.id}`} name="operand" value={item.operands[1] ?? ''} onChange={(e) => { this.changeInput(e, item.id, 1) }}/>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        )}
                </div>
                <div className="d-flex justify-center repeater-bottom">                    
                    <button className="altrp-btn altrp-btn_gray d-flex align-items-center" onClick={() => this.onCreate()}>
                        {iconsManager().renderIcon('plus', {
                            className: 'altrp-btn__icon',
                        })}
                        Add Compare
                    </button>
                </div>
            </div>
        </div>
    }
}