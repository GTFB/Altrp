import React, {Component} from "react";
import store from "../../../store/store";
import { setUpdatedNode } from "../../../store/robot-settings/actions";
import AltrpSelect from "../../../../../../admin/src/components/altrp-select/AltrpSelect";
import {CONDITIONS_OPTIONS} from "../../../../../../front-app/src/js/helpers"

class Condition extends Component{
    constructor(props){
        super(props);
        this.changeInput = this.changeInput.bind(this);

    }

    // Запись значений select в store
    changeSelect(e, type) {
        const value = e.value;
        const node = this.props.selectNode;
        console.log(type);
        if(type === "operator"){
            node.data.props.nodeData.operator = value;
        } else {
            node.data.props.nodeData.body.map(item => {
                if(item.id === type)  item.operator = value;
                return item;
            })
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
        const compares = this.getCompares();

        return <div>
            <div className="controller-container controller-container_textarea">
                <div className="controller-container__label">Operator</div>
                <AltrpSelect id="logic-operator"
                    value={_.filter(logicOptions, item => logic == item.value)}
                    onChange={e => {this.changeSelect(e, "operator")}}
                    options={logicOptions}
                />
            </div>
            <button className="btn btn_save" onClick={() => this.onCreate()}>
              +
            </button>
            {compares.map( (item, index) =>{ 
                return <div key={index}>
                    <input type="text" id={`operand-1_${item.id}`} name="operand" value={item.operands[0] ?? ''} onChange={(e) => { this.changeInput(e, item.id, 0) }} className="form-control" />
                    <button className="btn btn_save" onClick={() => this.onDelete(item)}>
                        x
                    </button>
                    <AltrpSelect id="bit-operator"
                        value={_.filter(bitOptions, i => item.operator == i.value)}
                        onChange={e => {this.changeSelect(e, item.id)}}
                        options={bitOptions}
                    />
                    <input type="text" id={`operand-2_${item.id}`} name="operand" value={item.operands[1] ?? ''} onChange={(e) => { this.changeInput(e, item.id, 1) }} className="form-control" />
                </div>}
            )}

        </div>
    }
}

export default Condition;