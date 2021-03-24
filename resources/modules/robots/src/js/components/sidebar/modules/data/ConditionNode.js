import React, {Component} from "react";
import store from "../../../../store/store";
import { setUpdatedNode } from "../../../../store/robot-settings/actions";
import {CONDITIONS_OPTIONS} from "../../../../../../../front-app/src/js/helpers";
import {iconsManager} from "../../../../../../../editor/src/js/helpers";
import ModelField from "./condition/ModelField";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import Resource from "../../../../../../../editor/src/js/classes/Resource";


export default class ConditionNode extends Component{
    constructor(props){
        super(props);
        this.state={
            modelOptions: [],
        }
        this.changeInput = this.changeInput.bind(this);
        this.modelOptionsResource = new Resource({ route: '/admin/ajax/model_options' });
    }

    async componentDidMount() {
        const model = await this.modelOptionsResource.getAll();
        this.setState(s =>({...s, modelOptions: model.options }));
    }

    // Запись значений select в store
    changeSelect(e, id, type = false) {
        const value = e.target.value;
        const node = this.props.selectNode;
        console.log(type);
        if(type === "operator"){
            node.data.props.nodeData[type] = value;
        } else if(type === "model_id"){
            node.data.props.nodeData[type] = value;
            node.data.props.nodeData.body = [];
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
                  "model_id": "",
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
            if(item.id === id) {
                if(key === 'name') item.name = e.target.value;
                else item.operands[key] = e.target.value;
            }
            return item;
        });
        store.dispatch(setUpdatedNode(node));
    }

    getNewCompare(count){
        const countNew = count + 1;

        return {
            id: new Date().getTime(),
            name: `Compare ${countNew}`,
            "operator": "==",
            "operands":[]
        };
    }

    getCompares(){
        return this.props.selectNode?.data?.props?.nodeData?.body ?? [];
    }

    onCreate(){
        const node = this.props.selectNode;
        if(_.isArray(node.data.props.nodeData.body)) {
            const count = node.data.props.nodeData.body.length;
            node.data.props.nodeData.body.push(this.getNewCompare(count));
        }
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
        const {modelOptions} = this.state;
        const bitOptions = CONDITIONS_OPTIONS;
        const logicOptions = [
            {label:'AND', value: 'AND'},
            {label:'OR', value: 'OR'},
        ];
        const model = this.props.selectNode?.data?.props?.nodeData?.model_id ?? '';
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
        <div className={"settings-section "}>
            <div className="settings-section__title d-flex">
                <div className="settings-section__icon d-flex">
                    <Chevron />
                </div>
                <div className="settings-section__label">Settings Condition</div>
            </div>

            <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
                <div className="controller-container controller-container_select">
                    <div className="controller-container__label control-select__label controller-label">Model</div>
                    <div className="control-container_select-wrapper controller-field">
                        <select className="control-select control-field"
                            value={model || ''}
                            onChange={e => {this.changeSelect(e, false, "model_id")}}
                        >
                            <option disabled value="" />
                            {modelOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                        </select>
                    </div>
                </div>

                <div className="controller-container controller-container_select" >
                    <div className="controller-container__label control-select__label controller-label">Type</div>
                    <div className="control-container_select-wrapper controller-field">
                        <select className="control-select control-field"
                            value={typeData || ''}
                            onChange={e => {this.changeSelectType(e)}}
                        >
                            <option disabled value="" />
                            {conditionTypeOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                        </select>
                    </div>
                </div>

                <div className="controller-container controller-container_select">
                    <div className="controller-container__label control-select__label controller-label">Operator</div>
                    <div className="control-container_select-wrapper controller-field">
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
                                <input
                                        className="compare-control-field"
                                        type="text"
                                        id={`compare_${item.id}`}
                                        name="compare"
                                        style={{width: '100%'}}
                                        value={item?.name ?? ''}
                                        onChange={(e) => { this.changeInput(e, item.id, 'name') }}
                                        />
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
                                <div className="controller-container controller-container_select">
                                    <div className="controller-container__label control-select__label controller-label" >Operator</div>
                                    <div className="control-container_select-wrapper controller-field">
                                        <select className="control-select control-field"
                                            value={item.operator || ''}
                                            onChange={e => {this.changeSelect(e, item.id)}}
                                        >
                                            <option disabled value="" />
                                            {bitOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                                        </select>
                                    </div>
                                </div>

                                {(
                                    item.operator != "empty" &&
                                    item.operator != "not_empty" &&
                                    item.operator != "null" &&
                                    item.operator != "not_null"
                                ) && <div className="controller-container controller-container_textarea">
                                    <div className="controller-container__label control-select__label controller-label">
                                        Value
                                    </div>
                                    <div className="control-group controller-field">
                                        <textarea
                                        className="control-field"
                                        type="text"
                                        id={`operand-2_${item.id}`}
                                        name="operand"
                                        style={{width: '100%'}}
                                        value={item.operands[1] ?? ''}
                                        onChange={(e) => { this.changeInput(e, item.id, 1) }}
                                        />
                                    </div>
                                </div>}

                            </div>{/* ./repeater-item-content */}
                        </div>}
                        )}
                    </div>
                    <div className="d-flex justify-center repeater-bottom">
                        <button
                            className="btn font_montserrat font_500 btn_grey btn_active"
                            style={{background:'#87CA00', padding:'5px', fontSize: '10px', textTransform: 'uppercase'}}
                            onClick={() => this.onCreate()}
                        >
                            Add Compare
                        </button>
                    </div>
                </div>{/* ./controller-container controller-container_repeater repeater */}
            </div>{/* ./controllers-wrapper */}
        </div>{/* ./settings-section */}
    </div>
    }
}
